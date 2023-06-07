import * as Yup from "yup";

export const CreateRecipeSchema = Yup.object().shape({
    name: Yup.string()
        .max(128, 'O nome deve ter no máximo 128 caracteres')
        .required('Obrigatório'),
    description: Yup.string()
        .max(4096, 'O passo a passo deve ter no máximo 4096 caracteres')
        .required('Obrigatório'),
    ingredients: Yup
        .array()
        .min(1, 'A receita deve ter pelo menos um ingrediente'),

    image: Yup.object().shape({
        fileSize: Yup.number().max(2048000, 'A imagem deve ter no máximo 2000kb'),
        uri: Yup.mixed().test('valid extension', 'O arquivo deve ter uma extensão png',
            (x) => {
                return new RegExp('\\..{1,}$').test(x);
            }),

    }).required('A imagem é obrigatória'),
});

export const UpdateRecipeSchema = Yup.object().shape({
    name: Yup.string()
        .max(128, 'O nome deve ter no máximo 128 caracteres')
        .required('Obrigatório'),
    description: Yup.string()
        .max(4096, 'O passo a passo deve ter no máximo 4096 caracteres')
        .required('Obrigatório'),
    ingredients: Yup
        .array()
        .min(1, 'A receita deve ter pelo menos um ingrediente'),

    image: Yup.object().shape({
        fileSize: Yup.number().max(2048000, 'A imagem deve ter no máximo 2000kb'),
        uri: Yup.mixed().test('valid extension', 'O arquivo deve ter uma extensão png',
            (x) => {
                return new RegExp('\\..{1,}$').test(x);
            }),

    }).required('A imagem é obrigatória'),
});
