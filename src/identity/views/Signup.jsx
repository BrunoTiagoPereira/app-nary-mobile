import React from "react";
import { Formik } from 'formik';
import { FormButton, FormInput, PasswordInput } from '../../components/form'
import { useNavigate } from 'react-router-native'
import { SignupSchema } from "../schemas";
import { NewAccount } from "../api";
import { useState } from "react";
import { ShowToast } from "../../core/services";
import BrandHeader from "../../components/brand-header/Brandheader";
import { Box, HStack, KeyboardAvoidingView, Link, ScrollView, Center, Text } from "native-base";
import { useMutation } from "react-query";
import ErrorModal from "../../components/error-modal/ErrorModal";


const Signup = () => {

    const navigate = useNavigate();

    const [responseErrors, setResponseErrors] = useState([]);

    const signinMutation = useMutation(data => handleNewAccount(data));


    const handleNewAccount = async (data) => {
        setResponseErrors([]);

        const response = await NewAccount(data);

        if (response.isSuccess) {
            navigate('/login')
            ShowToast(`Usuário ${data.username} criado`, 'success.500')
            return;
        }

        setResponseErrors(response.errorMessages);
    }
    return (
        <ScrollView bg="white" h="100%">
            <KeyboardAvoidingView behavior='position'>
                <Box w="100%" mt='12' safeArea>
                    <BrandHeader />
                    <ErrorModal errorMessages={responseErrors} clearMessages={() => setResponseErrors([])} />
                    <Formik
                        initialValues={{
                            username: '',
                            password: '',
                            passwordConfirmation: ''
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={(data) => signinMutation.mutate(data)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <React.Fragment>
                                <FormInput
                                    containerProps={{
                                        mx: '4'
                                    }}
                                    name="username"
                                    value={values.username}
                                    error={errors.username}
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    labelDisplayName='Usuário'
                                    placeholder="Digite seu usuário"
                                    iconName='user'
                                    touched={touched}
                                />
                                <PasswordInput
                                    containerProps={{
                                        mx: '4'
                                    }}
                                    name="password"
                                    value={values.password}
                                    error={errors.password}
                                    labelDisplayName='Senha'
                                    placeholder="Digite sua senha"
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    touched={touched}
                                />

                                <PasswordInput
                                    containerProps={{
                                        mx: '4'
                                    }}
                                    name="passwordConfirmation"
                                    value={values.passwordConfirmation}
                                    error={errors.passwordConfirmation}
                                    labelDisplayName='Confirmação da senha'
                                    placeholder="Digite sua confirmação da senha"
                                    onChangeText={handleChange('passwordConfirmation')}
                                    onBlur={handleBlur('passwordConfirmation')}
                                    touched={touched}
                                />
                                <FormButton mb='10px' onPress={handleSubmit} title='Cadastrar' />
                                <Center>
                                    <HStack space={2} >
                                        <Text color='black'>
                                            Já tem uma conta?
                                        </Text>
                                        <Link onPress={() => navigate('/login')} _text={{ fontWeight: 'bold', color: 'yellow.400' }} >Login</Link>
                                    </HStack>
                                </Center>
                            </React.Fragment>

                        )}
                    </Formik>
                </Box>
            </KeyboardAvoidingView>
        </ScrollView>

    )
}

export default Signup;