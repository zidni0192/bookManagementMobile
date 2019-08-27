import React, { Component } from 'react'
import {
    View,
    TouchableOpacity,
    Alert,
    Text
} from 'react-native'
class history extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pinjam: []
        }
    }
    componentDidMount = async () => {
        if (localStorage.role === "Librarian") {
            await this.props.dispatch(getPinjams())
        } else {
            await this.props.dispatch(getPinjams(localStorage.token, localStorage.id))
        }
        this.setState({
            pinjam: this.props.pinjam
        })
    }
    alert = () => {
        return (
            Alert.alert(
                '',
                'Kembalikan ?',
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: true },
            )
        )
    }
    render() {
        const pinjam = this.state.pinjam.pinjamList
        return (
            <View>
                {!pinjam ? null : pinjam.result.map(item => {
                    <TouchableOpacity onPress={this.alert}>
                        <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
                        <Text>asdnasijdn</Text>
                        </View>
                    </TouchableOpacity>
                })
                }
            </View>
        )
    }
}

export default history