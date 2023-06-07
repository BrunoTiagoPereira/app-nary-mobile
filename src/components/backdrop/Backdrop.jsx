import {  Spinner, HStack, Heading, Modal, Center } from "native-base";
import React from "react";
const Backdrop = ({isVisible}) => {

    return (
        <Center>
            <Modal isOpen={isVisible} _backdrop={{
                bg: "yellow.400",
                opacity: 0.9,
                padding: 0
            }}>
                <Center>
                    <HStack space={2} alignItems='center'>
                        <Spinner accessibilityLabel="Loading posts" size="lg" color='white'/>
                        <Heading color="white" fontSize="lg">
                            Loading...
                        </Heading>
                    </HStack>
                </Center>
                
            </Modal>
        </Center>
        
    )
}

export default Backdrop;