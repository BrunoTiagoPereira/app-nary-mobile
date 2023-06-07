import { FormControl, Icon, Input, Stack, Text, TextArea, WarningOutlineIcon } from "native-base";
import React from "react";
import { FontAwesome } from '@expo/vector-icons'

const FormInput = ({
    iconName,
    iconColor,
    keyboardType,
    inputType,
    name,
    placeholder,
    value,
    labelDisplayName,
    inputRightElement,
    error,
    touched,
    labelColor,
    containerProps,
    isTextArea,
    ...rest }) => {

    const hasInputError = () => {
        if (error && touched && touched[name]) {
            return true;
        }
        return false;
    }

    const renderIcon = (hasError) => {
        if (iconName) {
            return <Icon as={FontAwesome} size={6} ml='4' color={hasError ? "error.400" : (iconColor ?? "yellow.400")} name={iconName} />;
        }

        return null;

    }

    const renderInput = () => {
        if (isTextArea) {
            return <TextArea
                borderRadius={32}
                height='50px'
                mb='15px'
                name={name}
                variant='filled'
                _focus={{ backgroundColor: 'white', borderColor: hasError ? "error.400" : 'yellow.400' }}
                placeholderTextColor='light.500'
                fontSize={16}
                bg="white"
                color='black'
                keyboardType={keyboardType}
                value={value}
                InputLeftElement={renderIcon(hasError)}
                type={inputType}
                placeholder={placeholder}
                borderColor={hasError ? "error.400" : 'yellow.400'}
                InputRightElement={inputRightElement}
                selectionColor='yellow.400'
                minHeight='150'
                {...rest}
            />
        }

        return <Input
            borderRadius={32}
            height='50px'
            name={name}
            variant='filled'
            _focus={{ backgroundColor: 'white', borderColor: hasError ? "error.400" : 'yellow.400' }}
            placeholderTextColor='light.500'
            fontSize={16}
            bg="white"
            color='black'
            keyboardType={keyboardType}
            value={value}
            InputLeftElement={renderIcon(hasError)}
            type={inputType}
            placeholder={placeholder}
            borderColor={hasError ? "error.400" : 'yellow.400'}
            InputRightElement={inputRightElement}
            selectionColor='yellow.400'
            {...rest}
        />
    }
    const hasError = hasInputError();



    return (
        <FormControl isInvalid={hasError} w='100%' mb='15px'>
            <Stack {...containerProps} >
                <FormControl.Label _text={{
                    fontSize: '16',
                    color: hasError ? "error.400" : labelColor ?? 'black',
                }} >{labelDisplayName}</FormControl.Label>
                {renderInput()}
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon color="red.400" size="xs" />}>
                    <Text color='red.400' fontSize={13}>{error}</Text>
                </FormControl.ErrorMessage>
            </Stack>
        </FormControl>
    )
}

export default FormInput;