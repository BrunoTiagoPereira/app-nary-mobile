import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Box, Heading, HStack, Icon, IconButton, Image, Pressable, Text, VStack } from "native-base";

export default function RecipeItem({ recipe, canModify, canDelete, showLikes, onAddLikePressed, onRemoveLikePressed, onRemovePressed, onEditPressed, onViewPressed }) {

    const getNormalizedString = (str) => {
        if (str.length > 40) {
            return str.substring(0, 40) + "...";
        }

        return str;
    }

    const renderTrash = () => {
        return (
            <IconButton _pressed={{
                bgColor: 'white',
                _icon: {
                    color: 'danger.800'
                }
            }} onPress={() => onRemovePressed(recipe.id)}
                icon={<Icon as={FontAwesome}
                    name='trash'
                    size={8}
                    color='danger.400'
                    textAlign='center' />} />
        )
    }

    const renderContent = () => {
        return (
            <HStack height='120px' space={showLikes ? 4 : 6 } alignItems='center' >
                <Image borderWidth='0' source={{ uri: recipe.imageUrl, cache: 'reload' }} alt='recipe-image' height='80px' width='30%' resizeMode='stretch'></Image>
                <VStack space={2} alignItems='flex-start' justifyItems='flex-start' width='40%'>
                    <Heading fontSize='16'>{getNormalizedString(recipe.name)}</Heading>
                    <Text fontSize='12'>{getNormalizedString(recipe.description)}</Text>
                </VStack>
                <HStack>
                    {canDelete && renderTrash()}
                    {showLikes && renderLikes()}
                </HStack>
            </HStack>
        )
    }

    const renderLikes = () => {

        const iconColor = recipe.userHasLiked ? 'danger.400' : "black";
        const iconName = recipe.userHasLiked ? 'heart' : "hearto";
        
        return (
            <HStack alignItems='center'>
                <IconButton _pressed={{
                    bgColor: recipe.userHasLiked ? 'danger.200' : 'danger.400',
                    
                    _icon: {
                        color: iconColor,
                    }
                }} onPress={() => {
                    if(recipe.userHasLiked){
                        onRemoveLikePressed(recipe.id);
                    }else{
                        onAddLikePressed(recipe.id)
                    }
                }}
                    icon={<Icon as={AntDesign}
                        
                        name={iconName}
                        size={6}
                        color={iconColor}
                        textAlign='center' />} />
                <Text>{recipe.likesCount}</Text>
            </HStack>
        )
    }


    return (
        <Pressable width='100%' onPress={() => {
            if (canModify) {
                onEditPressed(recipe.id)
            }
            else {
                onViewPressed(recipe.id)
            }
        }} _pressed={{
            opacity: 0.5
        }}>
            {renderContent()}
        </Pressable>
    )
}
