import { Formik } from "formik";
import { Box, KeyboardAvoidingView, Radio, ScrollView, Stack, Text } from "native-base";
import { useState } from "react";
import { useNavigate } from "react-router-native";
import { FormButton } from "../../components/form";
import IngredientsForm from "../../components/form/ingredients";
import { SimplifiedFormInput } from "../../components/form/input";
import Navbar from "../../components/navbar";
import SafeView from '../../components/safe-view'
import { SearchByIngredients, SearchByNameSchema } from "../schemas";
import _ from 'lodash'

const Search = () => {

    const [isByName, setIsByName] = useState(0);
    const [ingredients, setIngredients] = useState([]);

    const navigate = useNavigate();

    const renderSearchByNameForm = () => {
        return (
            <Box mt='20px'>
                <Formik
                    initialValues={{ query: '' }}
                    validationSchema={SearchByNameSchema}
                    onSubmit={(data) => navigate(`/?query=${data.query}`)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {

                        return (
                            <Box paddingBottom='80px'>
                                <SimplifiedFormInput
                                    name="query"
                                    value={values.query}
                                    error={errors.query}
                                    onChangeText={handleChange('query')}
                                    onBlur={handleBlur('query')}
                                    labelDisplayName='Nome'
                                    placeholder="Digite o nome da receita"
                                    iconName='book'
                                    touched={touched}
                                />
                                <FormButton onPress={handleSubmit} title='Pesquisar' />
                            </Box>

                        )
                    }}
                </Formik>
            </Box>

        )
    }


    const renderSearchByIngredientsForm = () => {
        return (
            <Box mt='20px'>
                <Formik
                    initialValues={{ ingredients: [] }}
                    validationSchema={SearchByIngredients}
                    onSubmit={(data) => navigate(`/recipes?ingredients=${_.join(data.ingredients.map(x => x.id), ',')}`,)}
                >
                    {({ handleChange, handleBlur, handleSubmit, errors, setFieldTouched, setFieldValue }) => {

                        return (
                            <Box paddingBottom='80px'>
                                <IngredientsForm
                                    marginTop={false}
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
                                <FormButton onPress={handleSubmit} title='Pesquisar' />
                            </Box>

                        )
                    }}
                </Formik>
            </Box>

        )
    }
    return (
        <SafeView>
            <KeyboardAvoidingView behavior="padding">
                <Navbar title='Pesquisar' renderButton={false} center />
                <ScrollView padding='8px' height='100%' >
                    <Radio.Group defaultValue={0} name='isByName' onChange={(value) => setIsByName(value)}>
                        <Stack width='100%' direction='row' justifyContent='center' space={4}>
                            <Radio value={0} colorScheme='yellow' on>Por Nome</Radio>
                            <Radio value={1} colorScheme='yellow'>Por Ingredientes</Radio>
                        </Stack>
                    </Radio.Group>
                    {isByName == 0 ? renderSearchByNameForm() : renderSearchByIngredientsForm()}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeView>
    )
}

export default Search;