import React, { Component } from 'react'
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native'
import {connect} from 'react-redux'
import ImagePicker from 'react-native-image-picker'
import { postDonasi } from '../publics/redux/action/book';
class donate extends Component {
    state = {
        image: null,
        nama:'',
        judul:''
    }
    selectImage = () => {
        const options = {
            noData: true
        }

        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ image: response })
            }
        })
    }
    add = async() => {
        let formData = new FormData()

        formData.append('image', {
          name: this.state.image.fileName,
          type: this.state.image.type || null,
          uri: this.state.image.uri
        })
        formData.append('nama_pendonasi', this.state.nama)
        formData.append('judul', this.state.judul)
        await this.props.dispatch(postDonasi(formData)).then(() => {
            this.props.navigation.goBack()
          }).catch((err)=>{
              console.log(err);
              
          })
    }
    render() {
        return (
            <View>
                <View style={style.wrapTitle}>
                    <Text>Nama Pendonasi</Text>
                    <TextInput style={{ padding: 10, borderColor: '#ddd', borderWidth: 1 }} value={this.state.nama} onChange={nama=> this.setState({nama})} />
                </View>
                <View style={style.wrapTitle}>
                    <Text>Image</Text>
                    <TouchableOpacity style={{ paddingHorizontal: 10, paddingVertical: 20, borderColor: '#ddd', borderWidth: 1 }} onPress={this.selectImage}>
                        <Text>Upload Files</Text>
                    </TouchableOpacity>
                    <View>
                        {this.state.image && <Image source={{ uri: this.state.image.uri }} style={{ width: 200, height: 150,marginLeft:'13%' }} />}
                    </View>
                </View>
                <View style={style.wrapTitle}>
                    <Text>Judul</Text>
                    <TextInput style={{ padding: 10, borderColor: '#ddd', borderWidth: 1 }}  value={this.state.judul} onChange={judul=> this.setState({judul})}/>
                </View>
                <View style={style.wrapTitle}>
                    <TouchableOpacity style={{ paddingHorizontal: 10, paddingVertical: 20, borderColor: '#ddd', borderWidth: 1, backgroundColor: "#ddd" }} onPress={this.add}>
                        <Text style={{ textAlign: 'center' }}>Donasikan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop:30}} onPress={()=>this.props.navigation.push('Home')}>
                        <Text style={{ textAlign: 'center' }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        book: state.book,
    }
}
export default connect(mapStateToProps)(donate)
const style = {
    wrapTitle: {
        paddingHorizontal: 40,
        paddingVertical: 20,
    },
    Text: {
        fontSize: 30,

    }
}
