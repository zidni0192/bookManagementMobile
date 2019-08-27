import React, { Component } from 'react'
import { View, ActivityIndicator, AsyncStorage } from 'react-native'
// import { getToken } from '../publics/redux/action/user';
import { getToken } from '../publics/redux/action/user'
import { connect } from 'react-redux'
class GetToken extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ''
        }
        this._bootstrapAsync();
    }
    _bootstrapAsync = async () => {
        await this.props.dispatch(getToken('', ''))
        await AsyncStorage.getItem('token').then((result) => {
            this.setState({ token: result })
        });
        console.warn("gyujgjgjhg", this.state.token);

        this.props.navigation.navigate(this.state.token ? "Home" : "Login", { token: this.state.token });
    };
    render() {
        return (
            <View style={{flex:1,flexDirection:'row',justifyContent:"center"}}>
                <ActivityIndicator size="large" color="#7eeddf" />
            </View>
        )
    }
}
export default connect()(GetToken)