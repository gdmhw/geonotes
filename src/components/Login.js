import React from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import { onSignIn } from '../../backend/routes/notes';

export default ({ navigation }) => (
    <View style={{ paddingVertical : 20 }}>
        <Card>
            <FormLabel>Email</FormLabel>
            <FormInput placeholder="Email address"></FormInput>

            <FormLabel>Password</FormLabel>
            <FormInput secureTextEntry placeholder="Password"></FormInput>

            <Button
                buttonStyle={{ marginTop: 20 }}
                backgroundColor="#03A9F4"
                title="Sign In"
                onPress = {() => {
                    onSignIn()
                        .then(() => navigation.navigate("SignedIn"));
                }}>
            </Button>
        </Card>
    </View>
);