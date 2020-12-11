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
  Body,
  Right,
} from "native-base";

// Utilizar el contexto de notas
import { NotesContext } from "../context/NotesContext";

const NotesListScreen = ({ navigation }) => {
  const { notes } = useContext(NotesContext);

  return (
    <Container>
      <Content>
        <List>
          {notes
            ? notes.map((note) => (
                <ListItem
                  key={note.id.toString()}
                  onPress={() => {
                    navigation.navigate("noteModify", { id: note.id });
                  }}
                >
                  <Body>
                    <Text numberOfLines={2}>{note.note}</Text>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              ))
            : null}
        </List>
      </Content>
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
    </Container>
  );
};

const styles = StyleSheet.create({});

export default NotesListScreen;
