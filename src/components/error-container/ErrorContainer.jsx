import { HStack, View, VStack, Alert, Text, Center } from 'native-base';
import React from 'react';

export const ErrorContainer = ({error}) => {
  const renderErrorMessages = () => {
    const { ErrorMessages, StackTrace } = error;
    if (ErrorMessages.length > 0){
      return (
        <Center safeArea mt="15">
          <VStack space={5} w="100%">
            <Center>
              <Alert status="error" width='90%'>
                <VStack space={1} w="100%" alignItems="center">
                  <HStack></HStack>
                  <Alert.Icon size="lg" />
                  <Text fontSize="md" fontWeight="medium">
                    Oops!
                  </Text>
                  {ErrorMessages.map((e, i) => (
                    <Text key={i} category='s1'>{'- '}{e}</Text>
                  ))}
                  {StackTrace ? <Text category='s1'>{StackTrace}</Text> : null}
                </VStack>
              </Alert>
            </Center>

          </VStack>
        </Center>

         
      )
    }
    return null;
  }
  return (
    <View >
      {error && error.ErrorMessages && renderErrorMessages()}
    </View>
  );
}
