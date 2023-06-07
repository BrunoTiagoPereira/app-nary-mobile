import { AntDesign } from "@expo/vector-icons";
import { Heading, HStack, Icon, IconButton } from "native-base";
import React from "react";
import { useNavigate } from "react-router-native";

const Navbar = ({ to, title, renderButton = true, center=false }) => {

    const navigate = useNavigate();

    return (
        <HStack height='40px' alignItems='center' justifyContent={center ? 'center' : 'flex-start'} space={2}>
            {renderButton &&
                <IconButton
                    onPress={() => navigate(to ?? -1)}
                    _pressed={{
                        bgColor: 'white',
                        _icon: {
                            color: 'yellow.800'
                        }
                    }}
                    icon={<Icon as={AntDesign} name='arrowleft' color='yellow.400' size={10}></Icon>}
                />
            }
            <Heading ml={renderButton ? '0px' : '8px'} color='yellow.400'>{title}</Heading>
        </HStack>
    )
}

export default Navbar;