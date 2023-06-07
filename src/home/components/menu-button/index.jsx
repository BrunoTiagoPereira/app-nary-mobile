import { Box, Icon, IconButton } from "native-base";

const MenuButton = ({ as, name, onPress, isSelected }) => {
    return (
        <Box lineHeight={0}>
            <IconButton
                onPress={onPress}
                icon={
                    <Icon
                        as={as}
                        name={name}
                        size={10}
                        color='yellow.400'
                        opacity={isSelected ? 1 : 0.3}
                        textAlign='center'

                    />
                }
                _pressed={
                    {
                        backgroundColor: 'white',
                    }
                }
            />
        </Box>
    )
}

export default MenuButton;