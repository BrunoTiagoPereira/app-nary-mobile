import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'O usuário deve conter ao menos 2 caracteres')
        .required('Obrigatório'),
    password: Yup.string()
        .required('Obrigatório'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'),null], 'As senhas devem ser iguais')
        .required('Obrigatório'),
});


export const LoginSchema = Yup.object().shape({
    username: Yup.string()
    .min(2, 'O usuário deve conter ao menos 2 caracteres')
        .required('Obrigatório'),
    password: Yup.string()
        .required('Obrigatório'),
});
