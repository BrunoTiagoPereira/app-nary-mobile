import React from "react";
import { Formik } from 'formik';
import { FormButton, FormInput, PasswordInput } from '../../components/form'
import { useNavigate } from 'react-router-native'
import { LoginSchema } from "../schemas";
import { Auth } from "../api";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../core/contexts";
import BrandHeader from "../../components/brand-header/Brandheader";
import { SaveToken } from "../../core/services";
import { Box, Button, Center, HStack, KeyboardAvoidingView, Link, Stack, Text, ScrollView } from "native-base";
import { useMutation } from "react-query";
import ErrorModal from "../../components/error-modal/ErrorModal";

const Login = () => {
    const navigate = useNavigate();

    const [responseErrors, setResponseErrors] = useState([]);

    const { setUser } = useContext(UserContext);

    const loginMutation = useMutation(data => handleAuth(data));

    const handleAuth = async (data) => {
        setResponseErrors({});
        const response = await Auth(data);
        if (response.isSuccess) {
            await SaveToken(response.data);
            setUser({ username: data.username, token: response.data })
            navigate('/')
            return;
        }
        setResponseErrors(response.errorMessages);
    }

    return (
        <ScrollView bg="white" h="100%">
            <KeyboardAvoidingView behavior='position'  >
                <Box w="100%" mt='12' safeArea>
                    <BrandHeader />
                    <ErrorModal errorMessages={responseErrors} clearMessages={() => setResponseErrors([])} />
                    <Formik
                        initialValues={{
                            username: '',
                            password: ''
                        }}
                        validationSchema={LoginSchema}
                        onSubmit={(data) => loginMutation.mutate(data)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <Stack space={2} w='100%'>
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
                                <FormButton onPress={handleSubmit} title='Entrar' />
                                <Center>
                                    <HStack space={2} >
                                        <Text color='black'>
                                            Não tem uma conta?
                                        </Text>
                                        <Link onPress={() => navigate('/signup')} _text={{ fontWeight: 'bold', color: 'yellow.400' }} >Cadastre-se</Link>
                                    </HStack>
                                </Center>
                            </Stack>
                        )}
                    </Formik>
                </Box>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default Login;