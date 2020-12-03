import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Container,
  Content,
  H1,
  Text,
  Textarea,
  Spinner,
} from "native-base";
import { useFonts, Roboto_500Medium } from "@expo-google-fonts/roboto";

// Importar el contexto de las notas
import { NotesContext } from "../context/NotesContext";

const NoteCreateScreen = ({ navigation }) => {
  const [note, setNote] = useState("");
  const notesContext = useContext(NotesContext);
  const { addNewNote, refreshNotes } = notesContext;

  // Cargar la fuente de manera asíncrona
  const [fontsLoaded] = useFonts({
    Roboto_500Medium,
  });

  const handlerNewNote = () => {
    addNewNote(note, refreshNotes);

    // Regresar a la pantalla anterior
    navigation.goBack();
  };

  if (!fontsLoaded) return <Spinner color="blue" />;

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
  button: {
    fontFamily: "Roboto",
  },
});

export default NoteCreateScreen;
