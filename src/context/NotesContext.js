import React, { useEffect, createContext, useState } from "react";
import { database } from "../components/db";

// Crear el contexto de las notas
export const NotesContext = createContext({});

export const NotesContextProvider = (props) => {
  // Obtener los valores iniciales para el contexto
  // se obtienen desde los props
  const { notes: initialNotes, children } = props;

  // Almacenar los valores en el estado
  const [notes, setNotes] = useState(initialNotes);

  // Cargar u obtener las notas
  useEffect(() => {
    refreshNotes();
  }, []);

  const refreshNotes = () => {
    return database.getNotes(setNotes);
  };

  const addNewNote = (notes) => {
    return database.insertNotes(notes, refreshNotes);
  };

  // Crear el objeto de contexto
  const notesContext = {
    notes,
    addNewNote,
  };

  // Pasar los valores al proveedor y retornarlo
  return (
    <NotesContext.Provider value={notesContext}>
      {children}
    </NotesContext.Provider>
  );
};
