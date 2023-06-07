import { VStack } from 'native-base'
import React from 'react'
import { useNavigate } from 'react-router-native'
import RecipeItem from '../recipe-item'

export default function RecipesContainer({ recipes, onAddLikePressed, onRemoveLikePressed, onRemovePressed, canModify = false, canDelete = false, showLikes = false }) {

    const navigate = useNavigate();
    return (
        <VStack alignItems='flex-start' space={2} overflow='visible'>
            {recipes.map((r, i) => {
                return (
                    <RecipeItem showLikes={showLikes} recipe={r} key={i} 
                    onAddLikePressed={onAddLikePressed}
                    onRemoveLikePressed={onRemoveLikePressed}
                    onViewPressed={() => navigate(`/recipes/view/${r.id}`)}
                    onEditPressed={() => navigate(`/recipes/update/${r.id}`)} onRemovePressed={onRemovePressed} canModify={canModify} canDelete={canDelete}/>
                )
            })}
        </VStack>
    )
}