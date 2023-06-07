import { Text } from 'react-native'
import React from 'react'
import { Box, Button, HStack, VStack } from 'native-base'

export default function Pagination({ pageSize, pageIndex, totalResults, onPrevButtonPressed, onNextButtonPressed }) {

    const isPreviousButtonDisabled = pageIndex == 1;
    const isNextButtonDisabled = (pageIndex * pageSize) > totalResults;
    return (
        <VStack space={3} alignItems='center'>
            <HStack space={8} alignItems='center'>
                <Button opacity={isPreviousButtonDisabled ? 0.5 : 1} disabled={pageIndex == 1} height='40px' width='80px' bgColor='yellow.400' _pressed={{
                    bgColor: 'yellow.800'
                }} onPress={onPrevButtonPressed}>
                    <Text>Voltar</Text>
                </Button>
                <Box height='40px' w='40px' rouded alignItems='center' borderRadius={8} justifyContent='center' bgColor='yellow.400'>
                    <Text>{pageIndex}</Text>
                </Box>
                <Button opacity={isNextButtonDisabled ? 0.5 : 1} disabled={isNextButtonDisabled} height='40px' width='80px' bgColor='yellow.400' _pressed={{
                    bgColor: 'yellow.800'
                }} onPress={onNextButtonPressed}>
                    <Text>Próximo</Text>
                </Button>
            </HStack>
            <Text>Total de {totalResults} {`registro${totalResults > 1 ? 's': ''}`}</Text>
        </VStack>

    )
}