import { FontAwesome, Entypo } from "@expo/vector-icons";
import { Box, HStack, ScrollView, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-native";
import SafeView from "../../components/safe-view";
import MenuButton from "../components/menu-button";

const Home = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();

    const routes = {
        '/': 0,
        '/search': 1,
        '/user': 2
    }
    useEffect(() => {
        setTabIndex(routes[location.pathname])
    }, [location])

    const changeTab = (tabIndex, route) => {
        setTabIndex(tabIndex);
        navigate(route)
    }
    return (
        <SafeView>
            <VStack direction='column' >
                <ScrollView height='93%'>
                    <Outlet />
                </ScrollView>
                <Box height='7%'>
                    <HStack space='16' justifyContent='center'>
                        <MenuButton as={Entypo} name='home' onPress={() => changeTab(0, '/')} isSelected={tabIndex == 0} />
                        <MenuButton as={FontAwesome} name='search' onPress={() => changeTab(1, 'search')} isSelected={tabIndex == 1} />
                        <MenuButton as={FontAwesome} name='user' onPress={() => changeTab(2, 'user')} isSelected={tabIndex == 2} />
                    </HStack>
                </Box>
            </VStack>
        </SafeView>

    )
}

export default Home;