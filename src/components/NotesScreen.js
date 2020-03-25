import React from "react";
import { View, FlatList } from "react-native";
import { Card, Button, Text } from "react-native-elements";
import { getUserNotes} from '../../backend/routes/notes'

export default class NotesScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            getUserNotes();
        }
    };

    componentDidMount(){
        this.setState({getUserNotes});
    }

    render(){
        return(
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
                        data={this.data.getUserNotes}
                        renderItem={({item}) => <Text>{item.note_text}</Text>}
                        keyExtractor={item => item.note_id}>
                    </FlatList>
        
                    </View>
        
                    <Button
                        backgroundColor="#03A9F4"
                        title="Add Note"
                        onPress = {() => { addNoteNav().then( () => navigation.navigate("AddNotes")) }}>
                    </Button>
                </Card>
            </View>
        );
    }
};