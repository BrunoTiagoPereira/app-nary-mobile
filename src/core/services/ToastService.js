import { Toast } from "native-base";

const ShowToast = (title, bg, color, placement) => {
    Toast.show({
        title: title,
        bg: bg ?? '#3366FF',
        color: color ?? 'white',
        placement: placement ?? 'bottom'
    })
}

export default ShowToast;