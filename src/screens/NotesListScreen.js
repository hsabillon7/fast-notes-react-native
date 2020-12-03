import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Content,
  Fab,
  Icon,
  List,
  ListItem,
  Text,
} from "native-base";

// Utilizar el contexto de notas
import { NotesContext } from "../context/NotesContext";

const NotesListScreen = ({ navigation }) => {
  const { notes } = useContext(NotesContext);

  console.log(notes);

  return (
    <Container>
      <Content>
        <List>
          {notes
            ? notes.map((note) => (
                <ListItem key={note.id.toString()}>
                  <Text>{note.note}</Text>
                </ListItem>
              ))
            : null}
        </List>
        <Fab
          active={true}
          position="bottomRight"
          style={{ backgroundColor: "#ff0023" }}
          direction="up"
          onPress={() => {
            navigation.navigate("noteCreate");
          }}
        >
          <Icon name="plus" type="FontAwesome" />
        </Fab>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({});

export default NotesListScreen;
