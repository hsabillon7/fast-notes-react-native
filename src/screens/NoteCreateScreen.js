import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Container,
  Content,
  H1,
  Text,
  Textarea,
  Spinner,
  View,
} from "native-base";
import * as Font from "expo-font";

// Importar el contexto de las notas
import { NotesContext } from "../context/NotesContext";

const NoteCreateScreen = ({ navigation }) => {
  const [note, setNote] = useState("");
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const notesContext = useContext(NotesContext);
  const { addNewNote, refreshNotes } = notesContext;

  // Cargar la fuente de manera asíncrona
  useEffect(() => {
    const loadFontsAsync = async () => {
      await Font.loadAsync({
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      }).then(() => {
        setFontsLoaded(true);
      });
    };

    loadFontsAsync();
  }, []);

  const handlerNewNote = () => {
    addNewNote(note, refreshNotes);

    // Regresar a la pantalla anterior
    navigation.goBack();
  };

  if (!fontsLoaded)
    return (
      <Content contentContainerStyle={styles.content}>
        <Spinner color="blue" />
      </Content>
    );

  return (
    <Content>
      <Container>
        <H1>Ingresa tu nota</H1>
        <Textarea
          rowSpan={5}
          bordered
          placeholder="Escribe algo..."
          value={note}
          onChangeText={setNote}
        />
        <Button style={styles.button} onPress={handlerNewNote}>
          <Text>Guardar</Text>
        </Button>
      </Container>
    </Content>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
  },
  button: {
    fontFamily: "Roboto",
  },
});

export default NoteCreateScreen;
