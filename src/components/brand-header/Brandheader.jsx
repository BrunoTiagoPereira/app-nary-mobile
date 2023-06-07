import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Center, Icon, Image, Text} from 'native-base';
// import LogoIcon from "../../../assets/icons/logo-icon.png";
import React from "react";

const BrandHeader = () => {

    return (
        <Center safeArea>
            <MaterialCommunityIcons name="bowl-mix" size={48} color='#facc15' />
        </Center>
    )
}

export default BrandHeader;