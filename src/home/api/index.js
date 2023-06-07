import {  getAsync, postAsync } from "../../core/services";
import { deleteAsync } from "../../core/services/Api";
import _ from 'lodash'

const GetRecipesAsync = async (pageIndex, pageSize, query = null) => {
    const queryValue = query ? `&query=${query}` : "";
    var response = await getAsync(`recipes/recipes-by-rating?pageIndex=${pageIndex}&pageSize=${pageSize}${queryValue}&onlyMine=false`);
    return response.data.result;
}
const GetRecipesByIngredientsAsync = async (pageIndex, pageSize, ingredientsIds) => {

    const ingredientsArray = ingredientsIds.split(',');
    let ingredientsIdsValue = '';

    _.forEach(ingredientsArray, (id) => {
        ingredientsIdsValue +=`&ingredientsIds=${id}`
    })

    var response = await getAsync(`recipes/recipes-by-ingredients?pageIndex=${pageIndex}&pageSize=${pageSize}${ingredientsIdsValue}`);

    return response.data.result;
}

const AddLikeAsync = async (id) => {
    return await postAsync(`recipes/like`, {recipeId: id});
}

const RemoveLikeAsync = async (id) => {
    return await deleteAsync(`recipes/remove-like/${id}`);
}

export {GetRecipesAsync, AddLikeAsync, RemoveLikeAsync, GetRecipesByIngredientsAsync}