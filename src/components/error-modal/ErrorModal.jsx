import { AlertDialog, Button, Text } from 'native-base';

const ErrorModal = ({errorMessages, clearMessages}) => {

    
    const isOpen = errorMessages && errorMessages.length > 0;


    const renderModal = () => {
        return (
            <AlertDialog
                isOpen={isOpen}
            >
                <AlertDialog.Content>
                    <AlertDialog.Header>
                        Ooops!
                    </AlertDialog.Header>
                    <AlertDialog.Body>
                        {errorMessages && errorMessages.map((err, i) => {
                            return (
                                <Text key={i}>- {err}</Text>
                            )
                        })}
                    </AlertDialog.Body>
                    <Button mb={2} mx={2} colorScheme='danger' onPress={clearMessages}>Fechar</Button>
                </AlertDialog.Content>
            </AlertDialog>
        );
    }

    return (
        <>
            {isOpen ? renderModal() : null}
        </>
    )
   
    
}
 
export default ErrorModal;