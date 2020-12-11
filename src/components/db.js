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

// Obtener la nota por el id
const getNoteById = (id, setNoteFunc) => {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from notes where id = ?",
      [id],
      (_, { rows: { _array } }) => {
        setNoteFunc(_array);
      },
      (_t, error) => {
        console.log("Error al momento de obtener las notas");
        console.log(error);
      },
      (_t, _success) => {
        console.log("Nota obtenidas");
      }
    );
  });
};

// Insertar notas
const insertNotes = async (note, successFunc) => {
  db.transaction(
    (tx) => {
      tx.executeSql("insert into notes (note, status) values (?,?)", [
        note,
        "NUEVA",
      ]);
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
      (_t, error) => {
        console.log("Error al eliminar la tabla de notas");
        reject(error);
      },
      (_t, result) => {
        resolve(result);
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
          "create table if not exists notes (id integer primary key autoincrement, note text not null, status text not null);"
        );
      },
      (_t, error) => {
        console.log("Error al momento de crear la tabla");
        console.log(error);
        reject(error);
      },
      (_t, success) => {
        console.log("Tabla creada!");
        resolve(success);
      }
    );
  });
};

// Agrega una nota por defecto
const setupNotesAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into notes (note, status) values (?,?)", [
          "Bienvenido a Fastnotes",
          "NUEVA",
        ]);
      },
      (_t, error) => {
        console.log("Error al momento de insertar los valores por defecto");
        console.log(error);
        reject(error);
      },
      (_t, success) => {
        resolve(success);
      }
    );
  });
};

export const database = {
  getNotes,
  insertNotes,
  dropDatabaseTableAsync,
  setupDatabaseTableAsync,
  setupNotesAsync,
  getNoteById,
};
