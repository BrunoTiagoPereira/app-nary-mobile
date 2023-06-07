import { Feather } from "@expo/vector-icons";
import { Box, Heading, HStack, Icon, Pressable, Text, VStack } from "native-base";
import { useContext } from "react";
import { useNavigate } from "react-router-native";
import Avatar from "../../components/avatar";
import { UserContext } from "../../core/contexts";
import { clearToken } from "../../core/services";

const User = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const signOut = async () => {
        await clearToken();
        setUser({ username: '', token: '' })
    }
    return (
        <VStack height='100%' space={24} mt='10'>
            <VStack space={4} alignItems='center'>
                <Avatar size={16} />
                <Heading>Olá {user.username}</Heading>
                <Text fontWeight='bold' color='danger.600' onPress={signOut}>Sair</Text>
            </VStack>
            <Pressable onPress={() => navigate('/my-recipes')}
                _pressed={{
                    bgColor: 'yellow.600'
                }} height='55px' bgColor='yellow.400'>

                <HStack padding='4' alignItems='center' justifyContent='space-between' height='100%'>
                    <HStack alignItems='center' space={2}>
                        <Icon as={Feather} name='book' textAlign='center' justifyContent='center' size={8} color='yellow.900'></Icon>
                        <Text fontWeight='400' fontSize='16px'>Minhas Receitas</Text>
                    </HStack>
                    <Icon as={Feather} name='arrow-right' textAlign='center' justifyContent='center' size={8} color='yellow.900'></Icon>
                </HStack>
            </Pressable>
        </VStack>

    )
}

export default User;