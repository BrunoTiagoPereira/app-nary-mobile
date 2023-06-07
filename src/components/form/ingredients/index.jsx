import { Box, FormControl, HStack, Icon, IconButton, Input, Spinner, Stack, Text, WarningOutlineIcon } from "native-base"
import Suggest from "../../suggest"
import { getAsync } from "../../../core/services";
import { useState } from "react";
import { SimplifiedFormInput } from "../input";
import { SvgCss } from "react-native-svg";
import { FontAwesome } from "@expo/vector-icons";

const IngredientsForm = ({ name, error, touched = { [name]: true }, onBlur, onChange, ingredients, onIngredientAdded, onIngredientRemoved, isDisabled, marginTop = true, ...rest }) => {

    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const addIngredient = (ingredient) => {
        const hasIngredient = ingredients.filter(i => i.id == ingredient.id).length > 0;
        if (!hasIngredient) {
            onIngredientAdded(ingredient);
        }

    }

    const renderSuggest = () => {
        return (
            <Box mb='10px'>
                <SimplifiedFormInput
                    name={name}
                    error={error}
                    touched={touched}
                    onBlur={onBlur}
                    shadow={16}
                    height='50px'
                    placeholderTextColor='light.500'
                    fontSize={16}
                    bg="white"
                    color='black'
                    value={query}
                    onChangeText={(q) => {
                        setQuery(q);
                        onChange();
                    }}
                    type='text'
                    placeholder='Pesquise o nome do ingrediente'
                    {...rest}
                />
                <Suggest onLoading={() => setIsLoading(true)} onLoadingEnded={() => setIsLoading(false)} query={query} fetch={async () => getAsync(`recipes/ingredients?query=${query}&pageSize=5&PageIndex=1`)} onItemSelected={(ingredient) => addIngredient(ingredient)} />
            </Box>
        )
    }

    const renderIngredients = () => {
        return (
            ingredients.map((item, i) => {
                return (
                    <HStack width='100%' space={4} key={i} mb='10px'>
                        <Box shadow={4} bgColor='white' width={isDisabled ? '100%' : '80%'}>
                            <HStack padding={4} space={4} alignItems='center'>
                                <SvgCss xml={item.svgIcon} height='30px' width='30px' />
                                <Text>{item.name}</Text>
                                <Text>({item.unitOfMeasure})</Text>
                            </HStack>
                        </Box>
                        {!isDisabled && <IconButton _pressed={{
                            bgColor: 'white',
                            _icon: {
                                color: 'danger.800'
                            }
                        }} onPress={() => onIngredientRemoved(item.id)} icon={<Icon as={FontAwesome} name='trash' size={8} color='danger.400' textAlign='center' />} />}

                    </HStack>

                )
            })
        )
    }

    const hasInputError = () => {
        if (error && touched && touched[name]) {
            return true;
        }
        return false;
    }

    const hasError = hasInputError();

    return (
        <FormControl isInvalid={hasError} w='100%' mt={marginTop ? '50px' : '0px'} mb='15px'>
            <Stack>
                <HStack space={2}>
                    <FormControl.Label _text={{
                        fontSize: '16',
                        color: hasError ? "error.400" : 'black',
                    }} >Ingredientes</FormControl.Label>
                    {isLoading && <Spinner color='yellow.400' />}
                </HStack>
                {!isDisabled && renderSuggest()}
                {renderIngredients()}
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon color="red.400" size="xs" />}>
                    <Text color='red.400' fontSize={13}>{error}</Text>
                </FormControl.ErrorMessage>
            </Stack>
        </FormControl>
    )
}

export default IngredientsForm;