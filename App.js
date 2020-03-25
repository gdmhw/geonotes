import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import { SignedOut, SignedIn, createRootNavigator } from './src/components/router';
import { createRootNavigator } from './src/components/router';
import { isSignedIn } from './backend/routes/notes';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false,
      locationResult: null
    };
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if(status != "granted"){
      this.setState({ locationResult: "Application requires location permission in order to function properly" });
    }

    //let location = await Location.getCurrentPositionAsync({});
    //this.setState({ location });
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location) });

  }

  componentDidMount(){
    this._getLocationAsync();

    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }

  render(){
    const { checkedSignIn, signedIn, location } = this.state;

    let text = "getting location..";
    <Text>
          Location: {this.state.locationResult}
    </Text>

    if(!checkedSignIn){
      return null;
    }

    const Layout = createRootNavigator(signedIn);
    return <Layout></Layout>

    /*if(signedIn){
      return <SignedIn></SignedIn>
    }
    else {
      <SignedOut></SignedOut>
    }
    */
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
