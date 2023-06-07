import _ from "lodash"
import { Box, HStack, Text } from "native-base"
import { useEffect, useState } from "react";
import { Pressable } from "native-base";
import { SvgCss } from "react-native-svg";

const Suggest = ({ query, fetch, onItemSelected, onLoading, onLoadingEnded, ...rest }) => {

    const debouncedFetch = _.debounce(async () => {
        onLoading();
        const response = await fetch();
        const responseItems = response.data.result.items;
        setItems(responseItems);

        if(responseItems.length > 0){
            setIsOpen(true);
        }
        else{
            setIsOpen(false);
        }
        onLoadingEnded();
    }, 500);

    const [items, setItems] = useState([]);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        async function onFetch() {
            debouncedFetch()
        }

        if (query && query.length > 1) {
            onFetch();
        }
        else{
            setIsOpen(false);
        }
    }, [query]);

    const onItemPressed = (e) => {
        setIsOpen(false);
        onItemSelected(e);
    }

    const renderMenus = () => {

        if(!isOpen) return null;
        return (
            <Box>
                {items.map((item, i) => (
                    <Pressable  shadow={8} height='60px' bgColor='white' onPress={() => onItemPressed(item)} justifyContent='center' key={i}>
                        <HStack padding={4} space={4} alignItems='center' >
                            <SvgCss xml={item.svgIcon} height='30px' width='30px' />
                            <Text>{item.name}</Text>
                            <Text>({item.unitOfMeasure})</Text>
                        </HStack>
                    </Pressable>
                ))}
            </Box>
        )
    }

    return (
        <Box>
            {renderMenus()}
        </Box>
    )
}

export default Suggest;