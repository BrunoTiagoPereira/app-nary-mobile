import React, { useState } from 'react'
import SafeView from '../../components/safe-view'
import { useNavigate, useParams } from 'react-router-native'
import Navbar from '../../components/navbar'
import { Box, KeyboardAvoidingView, ScrollView } from 'native-base';
import ErrorModal from '../../components/error-modal/ErrorModal';
import { Formik } from 'formik';
import { UpdateRecipeSchema } from '../schemas';
import * as DocumentPicker from 'expo-document-picker';
import ImageUploadForm from '../components/image-upload-form';
import { FormButton } from '../../components/form';
import IngredientsForm from '../../components/form/ingredients';
import { SimplifiedFormInput } from '../../components/form/input';
import { useMutation, useQuery } from 'react-query';
import { GetRecipeAsync, UpdateRecipeAsync, UploadImageAsync } from '../api';

export default function UpdateRecipe() {

  const navigate = useNavigate();
  const { id } = useParams();
  const [responseErrors, setResponseErrors] = useState([]);
  const [ingredients, setIngredients] = useState([]);


  const getRecipeQueryResult = useQuery(['getRecipe'], async () => {
    const recipe = await GetRecipeAsync(id);
    setIngredients(recipe.ingredients);
    return recipe;
  }, {
    initialData: {
      id: id,
      name: '',
      description: '',
      image: {
        fileSize: 0,
        uri: ''
      },
      ingredients: [],
    },
  });

  const recipe = getRecipeQueryResult.data;

  const updateRecipeMutation = useMutation(data => handleUpdateRecipe(data));

  const uploadRecipeImage = async (setFieldValue) => {
    const selectedImageResult = await DocumentPicker.getDocumentAsync({
      type: 'image/png',
      multiple: false,
      copyToCacheDirectory: true,
    });

    if (selectedImageResult.type == 'success') {
      setFieldValue('image', { fileSize: selectedImageResult.size, uri: selectedImageResult.uri, name: selectedImageResult.name, type: selectedImageResult.mimeType }, true)
    }
  };

  const clearImage = (setFieldValue) => {
    setFieldValue('image', { fileSize: 0, uri: '' }, false);
  }

  const handleUpdateRecipe = async (data) => {
    updateRecipe(data);
  }

  const updateRecipe = async (data) => {
    setResponseErrors({});

    const request = {
      recipeId: id,
      name: data.name,
      description: data.description,
      ingredients: data.ingredients.map((i) => {
        return {
          ingredientId: i.id
        }
      })
    }

    const response = await UpdateRecipeAsync(request);

    if (response.isSuccess) {
      await uploadImage(id, data.image)
      navigate('/my-recipes')
      return;
    }

    setResponseErrors(response.errorMessages);
  }

  const uploadImage = async (recipeId, image) => {
    setResponseErrors({});

    const data = new FormData();

    data.append('RecipeId', recipeId);
    data.append('Image', {
      uri: image.uri,
      name: image.name,
      type: image.type
    });

    const response = await UploadImageAsync(data);

    if (response.isSuccess) {
      navigate('/')
      return;
    }
    setResponseErrors(response.errorMessages);
  }

  return (
    <SafeView>
      <KeyboardAvoidingView behavior='padding'>
        <Navbar title='Atualizar Receita' />
        <ScrollView mt='20px' padding='8px'>
          <ErrorModal errorMessages={responseErrors} clearMessages={() => setResponseErrors([])} />
          <Formik initialValues={{
            id: recipe.id,
            name: recipe.name,
            description: recipe.description,
            ingredients: recipe.ingredients,
            image: recipe.image
          }}

            validationSchema={UpdateRecipeSchema}
            onSubmit={(data) => updateRecipeMutation.mutate(data)}
            enableReinitialize
          >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched, values, errors, touched }) => {

              return (
                <Box paddingBottom='80px'>
                  <SimplifiedFormInput
                    name="name"
                    value={values.name}
                    error={errors.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    labelDisplayName='Nome'
                    placeholder="Digite o nome da receita"
                    iconName='book'
                    touched={touched}
                  />
                  <ImageUploadForm onImageClear={() => clearImage(setFieldValue)} image={values.image} error={errors.image} onPress={() => uploadRecipeImage(setFieldValue)} />
                  <SimplifiedFormInput
                    isTextArea
                    name="description"
                    value={values.description}
                    error={errors.description}
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    labelDisplayName='Passo a passo'
                    iconName='book'
                    placeholder="Digite o passo a passo da receita"
                    touched={touched}
                  />
                  <IngredientsForm
                    name='ingredients'
                    error={errors.ingredients}
                    onBlur={handleBlur('ingredients')}
                    onChange={() => {
                      setFieldTouched('ingredients', true);
                      handleChange('ingredients')
                    }}
                    ingredients={ingredients}
                    onIngredientAdded={(ingredient) => {
                      const newIngredients = [...ingredients, ingredient];
                      setIngredients(newIngredients)
                      setFieldValue('ingredients', newIngredients)
                    }}

                    onIngredientRemoved={(ingredientId) => {
                      const newIngredients = ingredients.filter(i => i.id !== ingredientId);
                      setFieldValue('ingredients', newIngredients)
                      setIngredients(newIngredients);
                    }}
                  />
                  <FormButton onPress={handleSubmit} title='Atualizar' />
                </Box>

              )
            }}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>

    </SafeView>

  )
}