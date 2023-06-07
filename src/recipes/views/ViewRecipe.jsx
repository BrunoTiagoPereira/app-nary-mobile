import React, { useState } from 'react'
import SafeView from '../../components/safe-view'
import { useNavigate, useParams } from 'react-router-native'
import Navbar from '../../components/navbar'
import { Box, KeyboardAvoidingView, ScrollView } from 'native-base';
import { Formik } from 'formik';
import ImageUploadForm from '../components/image-upload-form';
import IngredientsForm from '../../components/form/ingredients';
import { SimplifiedFormInput } from '../../components/form/input';
import { useQuery } from 'react-query';
import { GetRecipeAsync} from '../api';

export default function ViewRecipe() {

  const navigate = useNavigate();
  const { id } = useParams();
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

  return (
    <SafeView>
      <KeyboardAvoidingView behavior='padding'>
        <Navbar title='Visualizar Receita' />
        <ScrollView mt='20px' padding='8px'>
          <Formik initialValues={{
            id: recipe.id,
            name: recipe.name,
            description: recipe.description,
            ingredients: recipe.ingredients,
            image: recipe.image
          }}

            enableReinitialize
          >
            {({ values }) => {

              return (
                <Box paddingBottom='80px'>
                  <SimplifiedFormInput
                    isDisabled
                    name="name"
                    labelDisplayName='Nome'
                    iconName='book'
                    value={values.name}
                  />
                  <ImageUploadForm isDisabled image={values.image}/>
                  <SimplifiedFormInput
                    isDisabled
                    isTextArea
                    name="description"
                    value={values.description}
                    labelDisplayName='Passo a passo'
                    iconName='book'
                  />
                  <IngredientsForm
                    isDisabled
                    name='ingredients'
                    ingredients={ingredients}
                  />
                </Box>
              )
            }}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>

    </SafeView>

  )
}