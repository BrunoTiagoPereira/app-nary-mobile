import {  HStack, Skeleton } from "native-base";

const SkeletonList = () => {

       
    return (
        <>
         <SkeletonListItem/>
         <SkeletonListItem/>
         <SkeletonListItem/>
         <SkeletonListItem/>
         <SkeletonListItem/>
        </>
    )
}

const SkeletonListItem = () => {
    return  (
        <HStack w="100%" space={8} rounded="md" p="2" alignItems='center'>
            <Skeleton.Text  flex={8} />
        </HStack>
    )
}
 
export default SkeletonList;