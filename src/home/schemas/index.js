import * as Yup from "yup";

export const SearchByNameSchema = Yup.object().shape({
    query: Yup.string()
        .min(2, 'O nome deve ter no mínimo 2 caracteres')
        .max(1024, 'O nome deve ter no máximo 128 caracteres')
        .required('Obrigatório')
});

export const SearchByIngredients = Yup.object().shape({
    ingredients: Yup
        .array()
        .min(1, 'Obrigatório')
});
