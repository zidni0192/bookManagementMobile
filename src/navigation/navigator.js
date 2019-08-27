import { createStackNavigator, createAppContainer } from 'react-navigation'
import React from 'react'
import { TouchableOpacity, Text, Image, Alert, AsyncStorage } from 'react-native'
import Login from '../screens/login'
import Register from '../screens/register'
import Home from '../screens/home'
import BookDetail from '../screens/bookDetail'
import History from '../screens/history'
import GetToken from '../screens/getToken'
import { postPinjam } from '../publics/redux/action/pinjam'
import Donasi from '../screens/donate'
const AppNavigator = createStackNavigator({
    getToken: {
        screen: GetToken,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header: null
        }
    },
    Home: {
        screen: Home,
    },
    BookDetail: {
        screen: BookDetail,
        navigationOptions: ({ navigation }) => {
            console.warn(navigation.state.params.token);

            const title = navigation.getParam('title').split(' ')
            return ({
                headerStyle: {
                    backgroundColor: "#7eeddf",
                },
                headerTintColor: "white",
                headerTitle: <Text style={{ fontSize: 20, fontWeight: "bold", paddingHorizontal: 10, color: "white" }}>{title[0]}</Text>,
                headerRight: navigation.state.params.token ? <TouchableOpacity onPress={() => pinjam(navigation)}><Text style={{ fontSize: 20, fontWeight: "bold", paddingHorizontal: 10, color: "white" }}>Pinjam</Text></TouchableOpacity> : null
            })
        }
    },
    History: {
        screen: History,
        navigationOptions: ({ navigation }) => {
            return ({
                headerStyle: {
                    backgroundColor: "#7eeddf",
                },
                headerTintColor: "white",
                headerTitle: <Text style={{ fontSize: 20, fontWeight: "bold", paddingHorizontal: 10, color: "white" }}>History</Text>,
            })
        }
    },
    Donasi :{
        screen:Donasi,
        navigationOptions:{
            header:null
        }
    }
})

const pinjam = async (navigation) => {
    await navigation.state.params.props.dispatch(postPinjam({
        id_user: "",
        id_book: navigation.state.params.bookid,
    }))
    await Alert.alert(
        'Informasi',
        'Buku Berhasil Di Pinjam',
        [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
    )
}

const token = async (a) => {
    await AsyncStorage.getItem('token').then((result) => {
        a = result
    })
    return a
}
export default createAppContainer(AppNavigator)