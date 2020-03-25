import React from "react";
import { View, FlatList } from "react-native";
import { Card, Button, Text } from "react-native-elements";
// import { onSignOut } from '../../backend/routes/notes';
import { createNote } from '../../backend/routes/notes'

export default ({ navigation }) => (
    <View style={{ paddingVertical : 40 }}>
        <Card>
            <View
                style={{
                    backgroundColor: "#bcbec1",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 80,
                    height: 80,
                    borderRadius: 40,
                    alignSelf: "center",
                    marginBottom: 20
                }}>

            <FlatList
                data={notes}
                renderItem={({note}) => 
                    <Text>{note.text}</Text>
                }>
            </FlatList>

            </View>

            <Button
                backgroundColor="#03A9F4"
                title="Add Note"
                onPress = {() => { onSignOut().then( () => navigation.navigate("AddNotes")) }}>
            </Button>
        </Card>
    </View>
);