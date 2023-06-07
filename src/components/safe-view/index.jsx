import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SafeView = (props) => {
    return ( 
        <SafeAreaView style={styles.container}>
            {props.children}
        </SafeAreaView> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%'
    }
})
 
export default SafeView;