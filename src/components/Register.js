import React from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from '../../backend/routes/notes';

export default ({ navigation }) => (
    <View style = {{ paddingVertical: 20 }}>
        <Card title="Sign Up">
            <FormLabel>Email</FormLabel>
            <FormInput placeholder="Email address"></FormInput>

            <FormLabel>Password</FormLabel>
            <FormInput secureTextEntry placeholder="Password"></FormInput>

            <FormLabel>Confirm Password</FormLabel>
            <FormInput secureTextEntry placeholder="Re-enter password"></FormInput>

            
            <Button
                buttonStyle={{ marginTop: 20 }}
                backgroundColor="#03A9F4"
                title="Register"
                onPress = {() => 
                    onSignIn().then(() => navigation.navigate("SignedIn"))}>
            </Button>

            <Button
                buttonStyle={{ marginTop: 20 }}
                backgroundColor="transparent"
                title="Log in"
                onPress = {() => 
                    onSignIn().then(() => navigation.navigate("SignIn"))}>
            </Button>
        </Card>
    </View>
);