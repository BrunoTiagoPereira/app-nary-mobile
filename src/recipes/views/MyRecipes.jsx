import { Box, ScrollView } from "native-base";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Navbar from "../../components/navbar";
import Pagination from "../../components/pagination";
import RecipesContainer from "../../components/recipes-container";
import SafeView from '../../components/safe-view'
import { DeleteRecipeAsync, GetMyRecipesAsync } from "../api";

const MyRecipes = () => {


    const pageSize = 8;
    const [pageIndex, setPageIndex] = useState(1);

    const getMyRecipesQueryResult = useQuery(['myRecipes'],
        async () => GetMyRecipesAsync(pageIndex, pageSize), {
        initialData: {
            totalResults: 0,
            items: []
        }
    })

    const removeRecipeMutation = useMutation(async (id) => handleDeleteRecipe(id));


    const handleDeleteRecipe = async (id) => {
        await DeleteRecipeAsync(id);
        getMyRecipesQueryResult.refetch();
    }
    useEffect(() => {
        getMyRecipesQueryResult.refetch();
    }, [pageIndex])



    const totalResults = getMyRecipesQueryResult.data.totalResults;
    const recipes = getMyRecipesQueryResult.data.items;

    return (
        <SafeView>
            <Navbar title='Minhas Receitas' to='/user' />
            <ScrollView mt='20px' padding='8px' height='100%' >
                <RecipesContainer recipes={recipes} onRemovePressed={(id) => removeRecipeMutation.mutate(id)} canDelete canModify />
                <Box alignItems='center'>
                    <Pagination 
                        pageSize={pageSize}
                        totalResults={totalResults}
                        pageIndex={pageIndex}
                        onPrevButtonPressed={() => {
                            setPageIndex(pageIndex - 1)
                        }}
                        onNextButtonPressed={() => {
                            setPageIndex(pageIndex + 1)
                        }} />
                </Box>
            </ScrollView>
        </SafeView>
    )
}

export default MyRecipes;