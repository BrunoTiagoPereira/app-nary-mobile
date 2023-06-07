import { Divider, FormControl, HStack, Icon, Input, Stack, Text, TextArea, VStack, WarningOutlineIcon } from "native-base";
import React from "react";
import { FontAwesome } from '@expo/vector-icons'

const SimplifiedFormInput = ({
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
    isDisabled,
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
    const hasError = hasInputError();

    const renderInput = () => {

        const props = {
            borderColor: 'white',
            height: '50px',
            name: name,
            _focus: {
                backgroundColor: 'white',
                borderColor: 'white'
            },
            placeholderTextColor: hasError ? 'danger.400' : 'light.500',
            fontSize: 16,
            bg: "white",
            color: 'black',
            keyboardType: keyboardType,
            value: value,
            type: inputType,
            placeholder: placeholder,
            InputRightElement: inputRightElement,
            selectionColor: 'yellow.400',
            variant: 'underlined',
            _input: {
                borderColor: hasError ? 'danger.400' : 'light.200',
                borderBottomWidth: '1',
                borderRightWidth: '0',
                borderTopWidth: '0',
                borderLeftWidth: '0',
            },
            pointerEvents: isDisabled ? 'none': 'auto',
            ...rest
        }
        if (isTextArea) {
            return <TextArea
                 minHeight='130px'
                {...props}
            />
        }

        return <Input
            {...props}
        />
    }

    return (
        <VStack space={1} mb='15px'>
            <FormControl w='100%'>
                {renderInput()}
            </FormControl>
        </VStack>
    )
}

export default SimplifiedFormInput;