import React, { useState } from 'react'
import SafeView from '../../components/safe-view'
import { useNavigate } from 'react-router-native'
import Navbar from '../../components/navbar'
import { Box, KeyboardAvoidingView, ScrollView } from 'native-base';
import ErrorModal from '../../components/error-modal/ErrorModal';
import { Formik } from 'formik';
import { CreateRecipeSchema } from '../schemas';
import * as DocumentPicker from 'expo-document-picker';
import ImageUploadForm from '../components/image-upload-form';
import { FormButton } from '../../components/form';
import IngredientsForm from '../../components/form/ingredients';
import { SimplifiedFormInput } from '../../components/form/input';
import { useMutation } from 'react-query';
import { CreateRecipeAsync, DeleteRecipeAsync, UploadImageAsync } from '../api';

export default function CreateRecipe() {

  const navigate = useNavigate();
  const [responseErrors, setResponseErrors] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const createRecipeMutation = useMutation(data => handleCreateRecipe(data));

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

  const handleCreateRecipe = async (data) => {
    createRecipe(data);
  }

  const createRecipe = async (data) => {
    setResponseErrors({});

    const request = {
      name: data.name,
      description: data.description,
      ingredients: data.ingredients.map((i) => {
        return {
          ingredientId: i.id
        }
      })
    }
    const response = await CreateRecipeAsync(request);
    if (response.isSuccess) {
      await uploadImage(response.data.recipeId, data.image)
      return;
    } else {
      await DeleteRecipeAsync(response.data.recipeId);
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
      navigate('/my-recipes')
      return;
    }
    setResponseErrors(response.errorMessages);
  }

  return (
    <SafeView>
      <KeyboardAvoidingView behavior='padding'>
        <Navbar title='Criar Receita' />
        <ScrollView mt='20px' padding='8px'>
          <ErrorModal errorMessages={responseErrors} clearMessages={() => setResponseErrors([])} />
          <Formik initialValues={{
            name: '',
            description: '',
            ingredients: [],
            image: {
              fileSize: 0,
              uri: ''
            }
          }}
            validationSchema={CreateRecipeSchema}
            onSubmit={(data) => createRecipeMutation.mutate(data)}
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
                  <FormButton onPress={handleSubmit} title='Criar' />
                </Box>

              )
            }}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>

    </SafeView>
  )
}