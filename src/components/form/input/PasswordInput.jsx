import { Icon } from "native-base";
import { useState } from "react";
import FormInput from "./FormInput";
import { FontAwesome } from '@expo/vector-icons'

const PasswordInput = ({error, touched, name, ...props}) => {

    const [show, setShow] = useState(false);
    const hasInputError = () => {
        if (error && touched && touched[name]) {
            return true;
        }
        return false;
    }

    const hasError = hasInputError();

    return <FormInput mb='15px'
                error={error} 
                touched={touched}
                name={name} {...props}
                inputType={show ? 'text' : 'password'}
                inputRightElement={<Icon as={FontAwesome} name={show ? "eye" : "eye-slash"} size={6} mr={4} color={hasError ?  'error.400': 'yellow.400'}  onPress={() => setShow(!show)}  />} 
                {...props}
                iconName='lock'
                iconColor='yellow.400'
            />;
}
 
export default PasswordInput;