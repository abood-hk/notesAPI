import path from "path";
import fs from "fs/promises";
import url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mainDirname = path.dirname(__dirname);

export const getDefault = (req, res) => {
  const filename = `status.json`;
  res.status(200).sendFile(path.join(mainDirname, "api", filename));
};

export const getNotes = async (req, res) => {
  const filename = `${req.params.filename}.json`;
  let notes = JSON.parse(
    await fs.readFile(path.join(mainDirname, "api", filename), "utf-8")
  );
  const limit = parseInt(req.query.limit);
  if (req.query.limit) {
    if (!isNaN(limit) && limit > 0) {
      if (limit > notes.length) {
        res.status(200).json(notes);
      } else {
        let filteredNotes = notes.filter((note) => note.id <= limit);
        res.status(200).json(filteredNotes);
      }
    } else {
      let err = new Error("The limit must be a positive number");
      err.status = 400;
      throw err;
    }
  }
  res.status(200).json({ count: notes.length, notes });
};

export const getNote = async (req, res) => {
  const filename = `${req.params.filename}.json`;
  let notes = JSON.parse(
    await fs.readFile(path.join(mainDirname, "/api", filename), "utf-8")
  );
  let id = parseInt(req.params.id);
  if (!isNaN(id) && id > 0 && id <= notes.length) {
    let note = notes.find((note) => note.id === id);
    res.status(200).send(note);
  } else if (!isNaN(id) && id > 0 && id > notes.length) {
    let err = new Error("There is no note with this id");
    err.status = 400;
    throw err;
  } else {
    let err = new Error("The id must be a positive number");
    err.status = 400;
    throw err;
  }
};

export const addNote = async (req, res) => {
  let notes = JSON.parse(
    await fs.readFile(path.join(mainDirname, "/api", "notes.json"), "utf-8")
  );
  let title = req.body.title;
  let content = req.body.content;
  let id = notes.length + 1;
  let note = {
    id,
    title,
    content,
  };
  if (
    typeof title === "string" &&
    title.length > 0 &&
    typeof content === "string" &&
    content.length > 0
  ) {
    notes.push(note);
  } else {
    let err = new Error(
      "You have to include both content and a title (both as strings)"
    );
    err.status = 500;
    throw err;
  }
  res.status(202).json(notes);
};

export const removeNote = async (req, res) => {
  let notes = JSON.parse(
    await fs.readFile(path.join(mainDirname, "/api", "notes.json"), "utf-8")
  );
  let id = parseInt(req.params.id);
  if (!isNaN(id) && id > 0 && id <= notes.length) {
    let filterdNotes = notes.filter((note) => note.id !== id);
    res.status(200).json(filterdNotes);
    return;
  }
  let err = new Error(
    "The id needs to be a positive number and a note must have the id"
  );
  throw err;
};

export const updateNote = async (req, res) => {
  let notes = JSON.parse(
    await fs.readFile(path.join(mainDirname, "/api", "notes.json"), "utf-8")
  );
  let id = parseInt(req.params.id);
  if (!isNaN(id) && id > 0 && id <= notes.length) {
    const index = notes.findIndex((note) => note.id === id);
    const { title, content } = req.body;
    if (
      typeof title === "string" &&
      title.length > 0 &&
      typeof content === "string" &&
      content.length > 0
    ) {
      const note = { id, title, content };
      notes[index] = note;
      res.status(200).send(notes);
      return;
    } else {
      let err = new Error(
        "You have to include both content and a title (both as strings)"
      );
      throw err;
    }
  } else {
    let err = new Error(
      "The id needs to be a positive number and a note must have the id"
    );
    throw err;
  }
};
