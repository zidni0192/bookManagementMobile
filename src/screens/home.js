import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    TextInput,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    AsyncStorage,
    ActivityIndicator,
    Alert
} from 'react-native'
import { getBooks } from '../publics/redux/action/book'
import { withNavigation } from 'react-navigation'
import {getToken} from '../publics/redux/action/user';

const logout = (navigation) => {

    Alert.alert(
        'Informasi',
        'Logout Berhasil',
        [
            { text: 'OK', onPress: () => navigation.navigate('Login') },
        ],
    )
}

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            book: [],
            id: '',
            token: '',
            fullname: ''
        }
    }
    text = (text) => {
        if (text.length > 10) {
            let textSplit = text.substr(0, 10)
            return `${textSplit} ...`
        } else {
            let textSplit = text
            return `${textSplit}`
        }
    }

    static navigationOptions= ({ navigation }) => {
        const userToken = navigation.state.params ? navigation.state.params.token : null
        console.warn("INI TOKEN LHo", userToken);
        return {
            headerTitle: <Text style={{ fontSize: 20, fontWeight: "bold", paddingHorizontal: 10, color: "white" }}>BOOKS</Text>,
            headerStyle: {
                backgroundColor: "#7eeddf"
            },
            headerLeft: (
                <TouchableOpacity>
                    <Image source={{ uri: "https://img.icons8.com/ultraviolet/240/000000/menu.png" }} style={{ width: 25, height: 25, marginHorizontal: 15, marginTop: 2 }} />
                </TouchableOpacity>
            ),
            headerRight: !userToken ?
                <TouchableOpacity onPress={() => navigation.push('Login')}><Text style={{ fontSize: 20, fontWeight: "bold", paddingHorizontal: 10, color: "white" }}>Login</Text></TouchableOpacity> : <>
                    <TouchableOpacity onPress={() => navigation.push('History')}><Text style={{ fontSize: 20, fontWeight: "bold", paddingHorizontal: 10, color: "white" }}>History</Text></TouchableOpacity>
                    <TouchableOpacity onPress={async () => await AsyncStorage.clear().then(() => logout(navigation))}><Text style={{ fontSize: 20, fontWeight: "bold", paddingHorizontal: 10, color: "white" }}>Logout</Text></TouchableOpacity></>

        }
    }

    componentDidMount = async () => {
        await this.props.dispatch(getBooks(''))
        this.setState({ book: this.props.book })
        await AsyncStorage.getItem('id').then((result) => {
            this.setState({ id: result })
            console.warn("Ini ID DOnggg",result)
        })
        await AsyncStorage.getItem('fullname').then((result) => {
            this.setState({ fullname: result })
        })
        await AsyncStorage.getItem('token').then((result) => {
            this.setState({ token: result })
        })
        await AsyncStorage.getAllKeys((err,res)=>{
            all = res
        })
        console.warn('TOoooooKEn',all);        
        this.props.navigation.setParams({token:this.state.token})
    }
    componentDidUpdate = async (prevProps) => {
        if (prevProps.isFocused !== this.props.isFocused) {
            await this.props.dispatch(getToken('',''))
            await AsyncStorage.getItem('token').then((result) => {
                this.setState({ token: result })
            })
            await AsyncStorage.getAllKeys((err,res)=>{
                all = res
            })
            console.warn('TOoooooKEn',all);
            
            this.props.navigation.setParams({token:this.state.token})
        }
    }
    render() {
        const book = this.state.book
        console.warn("asndasondo ", book)
        return !book.isFulfilled ?
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: "center" }}>
                <ActivityIndicator size="large" color="#7eeddf" />
            </View>
            :
            <View>
                <View style={{ marginVertical: 20 }}>
                    <TextInput style={{ borderColor: "#7eeddf", borderWidth: 1, paddingLeft: 20, marginHorizontal: "15%", borderRadius: 50 }} selectionColor={'#7eeddf'} placeholder={'Search'} />
                </View>
                <ScrollView>
                    <View style={{ flex: 2, flexDirection: "row", flexWrap: "wrap", flexBasis: "100%", marginBottom: 100, padding: 5 }}>
                        {!book.bookList ? null : !book.bookList.result.length > 0 ? null : book.bookList.result.map(
                            (item) => {
                                return (
                                    <TouchableOpacity onPress={!item.status ? () => this.props.navigation.navigate("BookDetail", { props: this.props, bookid: item.bookid, title: item.title, token: this.state.token }) : null} style={{ width: "44%", height: 220, margin: 10, borderRadius: 10, elevation: 1 }}>
                                        <View>
                                            <View style={{ padding: 0, height: 170, borderRadius: 10, backgroundColor: 'black' }}>
                                                <Image source={{ uri: item.image_url }} style={{ width: "100%", height: 170, borderRadius: 10 }} resizeMode={"cover"} />
                                                {!item.status ? <Text style={{ position: "absolute", bottom: 0, right: 0, borderBottomRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: "#7eeddf", paddingVertical: 5, paddingHorizontal: 10, color: "white" }}>Tersedia</Text> :
                                                    <Text style={{ position: "absolute", bottom: 0, right: 0, borderBottomRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: "#ed1405", paddingVertical: 5, paddingHorizontal: 10, color: "white" }}>Tidak Tersedia</Text>}
                                            </View>
                                            <View style={{ padding: 10 }}>
                                                <Text style={{ fontSize: 18 }}>{this.text(item.title)}</Text>
                                                <Text style={{ fontSize: 10 }}>By : {item.writer}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>)
                            })}
                    </View>
                </ScrollView>
                <TouchableOpacity style={{position:"absolute",right:20,bottom:110}} onPress={()=>this.props.navigation.push('Donasi')}>
                    <Text style={{color:'white',fontWeight:"bold",fontSize:30,paddingHorizontal:20,paddingVertical:10,borderRadius:50,backgroundColor:'#7eeddf'}}>+</Text>
                </TouchableOpacity>
            </View>
    }
}

const mapStateToProps = (state) => {
    return {
        book: state.book
    }
}
export default connect(mapStateToProps)(withNavigation(Home))