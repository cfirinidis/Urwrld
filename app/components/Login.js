import React from 'react';
import{
	StyleSheet,
	Text,
	View,
	TextInput,
	KeyboardAvoidingView,
	TouchableOpacity,
	AsyncStorage,
	Image,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
//import Home from './Home';



export default class Login extends React.Component {

	constructor(props){
		super(props);
		this.state =  {
			username: '',
			password: '',
		}
	}

	componentDidMount(){ //checks is user is logged in
		this._loadInitialState().done();
	}
	_loadInitialState = async ()=> {

		var value = await AsyncStorage.getItem('user');
		// if(value !== null){
		// 	this.props.navigation.navigate('Home'); //***note: Might have to replace Profile with Home
		// }
	}

	render() {
		return(
			<KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
				<Image
 					 style={{
    				alignSelf: 'center',
    				marginTop: 30,
    				height: 140,
    				width: 140,
    				borderWidth: 1,
						borderRadius: 375,
						backgroundColor: '#dc6900'
					
  				}}
					source={require('../../img/urwrld_logo.jpg')} 
 				 	resizeMode="cover"
/>

			<View style={styles.container}>

				<Text style={styles.header}>UrWrld</Text>

				<TextInput
					style={styles.textInput} placeholder='Username'
					onChangeText={ (username)=> this.setState({username}) }
					underlineColorAndroid= 'transparent'
					/>

				<TextInput
					style={styles.textInput} placeholder='Password'
					onChangeText={ (password)=> this.setState({password}) }
					secureTextEntry = { true } underlineColorAndroid= 'transparent'
					/>

				<TouchableOpacity
					style={styles.btn}
					onPress={this.login}>
					<Text>LOGIN </Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.SignUp}
					onPress={this.SignUp}>
					<Text> "Don't have an Account? SignUp!" </Text>
				</TouchableOpacity>
					
				</View>

			</KeyboardAvoidingView>
		);
	}

	SignUp = () => {
		this.props.navigation.navigate('SignUp');
	}
			
	login = () => {

		fetch('http://192.168.0.8:3000/Login', { // sync IP address to expo application
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: this.state.username,
				password: this.state.password,
			})
		})

		.then((response)=> response.json())
		.then ((res) => {

			if(res.success === true){
				AsyncStorage.setItem('user', res.user);
				this.props.navigation.navigate('Home'); //This is where we navigate to the welcome page
				// replace profile with Welcome

			}
			else{
				alert(res.message);
			}
		})
		.done();
	}
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: '#dc6900',
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#dc6900',
		paddingLeft: 40,
		paddingRight: 40,
	},
	header: {
		fontSize: 24,
		marginBottom: 60,
		color: '#fff',
		fontWeight: 'bold',
	},
	textInput: {
		alignSelf: 'stretch',
		padding: 16,
		marginBottom: 20,
		backgroundColor: '#fff',
	},
	btn: {
		alignSelf: 'stretch',
		backgroundColor: '#d4d8d4',
		padding:20,
		alignItems: 'center',
	},
	SignUp: {
		//fontSize: 18,
		marginTop: 60,
		//color: '#fff',
		//fontWeight: 'bold',
		},
});	

