import { StackNavigator, TabNavigator, SwitchNavigator } from "react-navigation";
import { Platform, StatusBar } from "react-native";
import { FontAwesome } from "react-native-vector-icons";

import Register from './Register';
import Login from './Login';
import Home from "./Home";
import Profile from './Profile';

const headerStyle = {
    marginTop: Platform.OS === "ios" ? StatusBar.currentHeight : 0
};



export const SignedOut = StackNavigator({
    Register: {
        screen: Register,
        navigationOptions: {
            title: "Register",
            headerStyle
        }
    },

    Login: {
        screen: SignIn,
        navigationOptions: {
            title: "Sign in",
            headerStyle
        }
    }
});

export const SignedIn = TabNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarLabel: "Home",
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome 
                name="home" size={30} color={tintColor}>
                </FontAwesome>
            )
        }
    },

    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarLabel: "Profile",
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome 
                name="user" size={30} color={tintColor}>
                </FontAwesome>
            )
        }
    },

    Notes: {
        screen: Notes,
        navigationOptions: {
            tabBarLabel: "Notes",
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome 
                name="user" size={30} color={tintColor}>
                </FontAwesome>
            )
        }
    }
},
{
    tabBarOptions: {
        style: {
            paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight : 0
        }
    }
}
);

export const createRootNavigator = (signedIn = false) => {
    return SwitchNavigator(
        {
            SignedIn: {
                screen: SignedIn
            },
            SignedOut: {
                screen: SignedOut
            }
        },
        {
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    );
};
