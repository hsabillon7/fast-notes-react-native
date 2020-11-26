import React from "react";
import * as SQLite from "expo-sqlite";

// https://docs.expo.io/versions/latest/sdk/sqlite/
// Crea y abre la base de datos
const db = SQLite.openDatabase("fastnotes.db");

// Funcionalidades de la base de datos

// Obtener las notas del usuario
const getNotes = (setNotesFunc) => {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from notes",
      [],
      (_, { rows: { _array } }) => {
        setNotesFunc(_array);
      },
      (_t, error) => {
        console.log("Error al momento de obtener las notas");
        console.log(error);
      },
      (_t, _success) => {
        console.log("Notas obtenidas");
      }
    );
  });
};

// Insertar notas
const insertNotes = (note, successFunc) => {
  db.transaction(
    (tx) => {
      tx.executeSql("insert into notes (note) values (?)", [note]);
    },
    (_t, error) => {
      console.log("Error al insertar la nota");
      console.log(error);
    },
    (_t, _success) => {
      successFunc;
    }
  );
};

// Borrar la base de datos
const dropDatabaseTableAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql("drop table notes");
      },
      (_, result) => {
        resolve(result);
      },
      (_, error) => {
        console.log("Error al eliminar la tabla de notas");
        reject(error);
      }
    );
  });
};

// Creación de la tabla de notas
const setupDatabaseTableAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists notes (id integer primary key not null, note text)"
        );
      },
      (_t, error) => {
        console.log("Error al momento de crear la table");
        console.log(error);
        reject(error);
      },
      (_t, success) => {
        resolve(success);
      }
    );
  });
};

export const db = {
  getNotes,
  insertNotes,
  dropDatabaseTableAsync,
  setupDatabaseTableAsync,
};
