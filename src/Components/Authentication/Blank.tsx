import { Text, View } from "react-native"
import Menu from "../Screens/Menu"
import { Provider } from "react-redux"
import { store } from "../Screens/Store"
export default function Blank() {
    return (
<Provider store={store}>
        <Menu></Menu>

    </Provider>
    )
}
