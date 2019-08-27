import React, { Component } from 'react'
import {
    View,
    Image,
    Text,
    ScrollView,
    ActivityIndicator
} from 'react-native'
import { getBook } from '../publics/redux/action/book'
import { connect } from 'react-redux';
class bookDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            book: []
        }
    }
    convert = (date) => {
        let data = Date.parse(date)
        let newDate = new Date(data)
        let day = newDate.getDate()
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        let month = months[newDate.getMonth()]
        var year = newDate.getFullYear();
        return `${day} ${month} ${year}`
    }
    componentDidMount = async () => {
        await this.props.dispatch(getBook(this.props.navigation.getParam('bookid')))
        this.setState({
            book: this.props.book
        })
    }
    render() {
        const book = this.state.book.bookEdit

        return !this.state.book.isFulfilled ?
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: "center" }}>
                <ActivityIndicator size="large" color="#7eeddf" />
            </View>
            :
            <View>
                <ScrollView>
                    <View style={{ width: "100%", justifyContent: "center", }}>
                        <View style={{ backgroundColor: "white", padding: 1, width: "100%", height: 200, alignSelf: "center" }}>
                            <Image source={{ uri: book ? book.result.image_url : "" }} style={{ width: "100%", height: 200, opacity: 0.2, position: "absolute" }} resizeMode={"cover"} />
                            <Image source={{ uri: book ? book.result.image_url : "" }} style={{ width: 130, height: 170, marginVertical: 10, borderRadius: 10, alignSelf: "center" }} resizeMode={"cover"} />
                        </View>
                    </View>
                    <View style={{ padding: "5%" }}>
                        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                            {book ? book.result.title : ""}
                        </Text>
                        <Text>
                            By : {book ? book.result.writer : ""}
                        </Text>
                        <Text style={{ paddingVertical: 10, fontSize: 15, textAlign: "justify" }}>
                            {book ? book.result.description : ""}
                        </Text>
                    </View>
                </ScrollView>
            </View>

    }
}

const mapStateToProp = (state) => {
    return {
        book: state.book
    }
}
export default connect(mapStateToProp)(bookDetail)