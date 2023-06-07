import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { Box, Fab, Heading, HStack, Icon, IconButton, Text, VStack } from "native-base";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate, useSearchParams } from "react-router-native";
import Avatar from "../../components/avatar";
import Pagination from "../../components/pagination";
import RecipesContainer from "../../components/recipes-container";
import { UserContext } from "../../core/contexts";
import { AddLikeAsync, GetRecipesAsync, GetRecipesByIngredientsAsync, RemoveLikeAsync } from "../api";

const Recipes = () => {

    const pageSize = 8;
    const [pageIndex, setPageIndex] = useState(1);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();

    const queryParam = searchParams.get('query');
    const ingredientsParam = searchParams.get('ingredients');

    const getRecipesQueryResult = useQuery(['recipes'],
        async () => {
            if (ingredientsParam) {
                return GetRecipesByIngredientsAsync(pageIndex, pageSize, searchParams.get('ingredients'));
            }

            return GetRecipesAsync(pageIndex, pageSize, searchParams.get('query'));
        }, {
        initialData: {
            totalResults: 0,
            items: []
        }
    })

    const onAddLikeMutation = useMutation(['add-like'], async (id) => {
        await AddLikeAsync(id);
        getRecipesQueryResult.refetch();
    });
    const onRemoveLikeMutation = useMutation(['remove-like'], async (id) => {
        await RemoveLikeAsync(id);
        getRecipesQueryResult.refetch();
    });

    useEffect(() => {
        getRecipesQueryResult.refetch();
    }, [pageIndex])

    useEffect(() => {
        getRecipesQueryResult.refetch();
    }, [searchParams])


    const hasAnyFilter = queryParam || ingredientsParam;

    const totalResults = getRecipesQueryResult.data.totalResults;
    const recipes = getRecipesQueryResult.data.items;

    const renderFilterContainer = () => {
        return (
            <HStack space={3} alignItems='center' justifyContent='center'>
                <Icon as={Feather} name='menu' color='black' size={8}></Icon>
                <Text>Remover Filtros</Text>
                <IconButton
                    onPress={() => {
                        searchParams.delete('query');
                        searchParams.delete('ingredients');
                        setSearchParams(searchParams);
                    }}
                    _pressed={{
                        bgColor: 'danger.200',
                        _icon: {
                            color: 'danger.800'
                        }
                    }}
                    icon={<Icon as={AntDesign} name='close' color='danger.400' size={8}></Icon>}
                />
            </HStack>
        )
    }

    return (
        <VStack direction='column' space={3}>
            <HStack space={2} ml='15px' mt='10px' alignItems='center'>
                <Avatar size={12} />
                <Heading color='yellow.400'>Olá {user.username}</Heading>
            </HStack>
            {hasAnyFilter && renderFilterContainer()}
            <RecipesContainer
                onAddLikePressed={(id) => {
                    onAddLikeMutation.mutate(id);
                }}
                onRemoveLikePressed={(id) => {
                    onRemoveLikeMutation.mutate(id);
                }}
                canDelete={false} canModify={false} recipes={recipes} showLikes />
            <Box alignItems='center'>
                <Pagination
                    totalResults={totalResults}
                    pageSize={pageSize}
                    pageIndex={pageIndex}
                    onPrevButtonPressed={() => {
                        setPageIndex(pageIndex - 1)
                    }}
                    onNextButtonPressed={() => {
                        setPageIndex(pageIndex + 1)
                    }} />
            </Box>

            <Fab bgColor='yellow.400' _pressed={{
                bgColor: 'yellow.800'
            }} renderInPortal={true} shadow={4} right={25} bottom={120} size="sm" icon={<Icon color="white" as={AntDesign} name="plus" size="8" />}
                onPress={() => navigate('/recipes/create')}
            />
        </VStack>
    )
}

export default Recipes;