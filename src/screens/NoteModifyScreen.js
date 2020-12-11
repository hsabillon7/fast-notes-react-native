import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Content,
  Text,
  Textarea,
  Spinner,
  Button,
} from "native-base";
import * as Font from "expo-font";

// Importar el contexto de las notas
import { NotesContext } from "../context/NotesContext";

const NoteModifyScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [theNote, setTheNote] = useState(null);
  const [status, setStatus] = useState(false);
  const [errorNote, setErrorNote] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const notesContext = useContext(NotesContext);
  const { note, getNoteById } = notesContext;

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

  useEffect(() => {
    const getNote = () => {
      getNoteById(id);
    };

    getNote();

    // Verificar si la nota tiene valor previo a extraer sus valores
    if (note.length) {
      setTheNote(note[0].note);
      setStatus(note[0].status);

      console.log(theNote);
    }
  }, [id, note]);

  const handlerSaveNote = async () => {
    // Validar que la nota tiene valor
    if (note) {
      await addNewNote(note, refreshNotes);

      // Regresar a la pantalla anterior
      navigation.goBack();
    } else {
      setErrorNote(true);
    }
  };

  if (!theNote) {
    return (
      <Content contentContainerStyle={styles.content}>
        <Spinner color="blue" />
      </Content>
    );
  }

  return (
    <Content>
      <Container style={styles.container}>
        <Text>Modificar nota</Text>
        <Textarea
          value={theNote}
          style={styles.note}
          bordered
          rowSpan={5}
          onChange={setTheNote}
        />
        {errorNote ? (
          <Text style={styles.error}>¡Debes ingresar una nota!</Text>
        ) : null}
        <Button style={styles.button} onPress={handlerSaveNote}>
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
  container: {
    padding: 10,
  },
  note: {
    borderColor: "black",
    marginBottom: 10,
  },
  error: {
    fontSize: 12,
    color: "red",
    marginBottom: 10,
  },
  inputError: {
    borderColor: "red",
  },
});

export default NoteModifyScreen;
