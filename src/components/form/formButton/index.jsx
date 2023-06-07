import { Button, Text } from "native-base";

const FormButton = ({title, onPress, width, children, ...props}) => {
    return (
        <Button {...props} onPress={onPress} rounded='2xl' alignSelf='center' shadow={1} size='lg' width={width ?? '60%'} bgColor='yellow.400' _pressed={{
            bgColor:'yellow.500',
        }}>
            <Text color='black'>{title}</Text>
        </Button>
    );
}

export default FormButton;