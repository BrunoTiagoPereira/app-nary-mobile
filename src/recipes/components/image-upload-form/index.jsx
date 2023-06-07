import { FontAwesome } from "@expo/vector-icons";
import { FormControl, HStack, Icon, IconButton, Image, Pressable, Text, WarningOutlineIcon } from "native-base";

const ImageUploadForm = ({ image, error, onPress, onImageClear, isDisabled }) => {

    const renderImage = () => {
        return (
            <Image borderColor='black' borderWidth='1' source={{ uri: image.uri, cache: 'reload'}} alt='recipe-image' height='150px' width='100%' resizeMode='stretch' />
        )
    }
    return (

        <FormControl space={1} isInvalid={error != undefined} mb='15px'>
            <HStack justifyContent='space-between' alignItems='center'>
                <FormControl.Label _text={{
                    fontSize: '16',
                    color: error ? "error.400" : 'black',
                }} >
                    Imagem
                </FormControl.Label>
                {image && !isDisabled && <IconButton _pressed={{
                    bgColor: 'white'
                }} onPress={onImageClear} icon={<Icon as={FontAwesome} textAlign='right' name='close' size={6} color='danger.400'></Icon>}/>}
                
            </HStack>
            <Pressable
                onPress={() => {
                    if(!isDisabled){
                        onPress()
                    }
                }}
                alignItems='center'
                justifyContent='center'
                _pressed={{
                    bgColor: (image && image.uri) ? 'white': 'gray.600'
                }} height='150px' bgColor={(image && image.uri) ? 'white': 'gray.400'}>
                {(image && image.uri) ? renderImage() : <Icon as={FontAwesome} name='upload' size={12} color='yellow.400'></Icon>}

            </Pressable>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon color="red.400" size="xs" />}>
                {error && error.fileSize && <Text color='red.400' fontSize={13}>{error.fileSize}</Text>}
                {error && error.uri && <Text color='red.400' fontSize={13}>{error.uri}</Text>}
            </FormControl.ErrorMessage>
        </FormControl>
    );
}

export default ImageUploadForm;