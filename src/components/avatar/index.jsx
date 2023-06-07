import { FontAwesome } from "@expo/vector-icons";
import { Icon } from "native-base";


const Avatar = ({size}) => {
    return (
        <Icon as={FontAwesome} size={size} color='yellow.400' name='user-circle'></Icon>
    )
};

export default Avatar;