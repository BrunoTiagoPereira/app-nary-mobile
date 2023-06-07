import { deleteAsync, getAsync, postAsync, putAsync } from "../../core/services";

const CreateRecipeAsync = async (data) => {
    return await postAsync(`recipes`, data);
}

const UpdateRecipeAsync = async (data) => {
    return await putAsync(`recipes`, data);
}

const GetRecipeAsync = async (id) => {
    var response = await getAsync(`recipes/${id}`);
    const recipe = response.data.recipe;
    return {
        id: recipe.id,
        name: recipe.name,
        description: recipe.description,
        image:{
            fileSize: 0,
            uri: recipe.imageUrl,
        },
        ingredients: recipe.ingredients
    };
}

const GetMyRecipesAsync = async (pageIndex, pageSize) => {
    var response = await getAsync(`recipes/recipes-by-rating?pageIndex=${pageIndex}&pageSize=${pageSize}&onlyMine=true`);
    return response.data.result;
}


const DeleteRecipeAsync = async (id) => {
    return await deleteAsync(`recipes/${id}`);
}

const UploadImageAsync = async (data) => {
    return await postAsync(`recipes/upload-image`, data, true);
}


export {GetRecipeAsync, CreateRecipeAsync, DeleteRecipeAsync, UploadImageAsync, UpdateRecipeAsync, GetMyRecipesAsync};