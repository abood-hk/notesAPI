import path from "path";
import fs from "fs/promises";
import url from "url";
import { validationResult } from "express-validator";
import Note from "../dataBase/models/notes.js";
import mongoose from "mongoose";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mainDirname = path.dirname(__dirname);

export const getDefault = async (req, res) => {
  let error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(error.array().map((err) => err.msg));
  }
  const note = await Note.find();
  res.status(200).render("notes", { notes: note });
};

export const getStatus = async (req, res) => {
  const status = JSON.parse(
    await fs.readFile(path.join(mainDirname, "api", "status.json"), "utf-8")
  );
  res.status(200).json(status);
};

export const getNotes = async (req, res) => {
  let error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(error.array().map((err) => err.msg));
  }
  const note = await Note.find();
  const limit = parseInt(req.query.limit);
  if (req.query.limit) {
    if (!isNaN(limit) && limit > 0) {
      const limitedNotes = await Note.find().limit(limit);
      return res.status(200).render("notes", { notes: limitedNotes });
    } else {
      let err = new Error("The limit must be a positive number");
      err.status = 400;
      throw err;
    }
  }
  res.status(200).render("notes", { notes: note });
};

export const getNote = async (req, res) => {
  let error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(error.array().map((err) => err.msg));
  }
  let id = req.params.id;
  if (typeof id === "string" && id.length === 24) {
    id = new mongoose.Types.ObjectId(id);
    const requestedNote = await Note.findById(id);
    if (!requestedNote) {
      let err = new Error("an element must have the id");
      err.status = 400;
      throw err;
    }
    res.status(200).render("notes", { notes: requestedNote });
  } else {
    let err = new Error("an element must have the id");
    err.status = 400;
    throw err;
  }
};

export const addNote = async (req, res) => {
  let error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(error.array().map((err) => err.msg));
  }
  let title = req.body.title;
  let content = req.body.content;
  let note = {
    title,
    content,
  };
  if (
    typeof title === "string" &&
    title.length > 0 &&
    typeof content === "string" &&
    content.length > 0
  ) {
    await Note.create(note);
  } else {
    let err = new Error(
      "You have to include both content and a title (both as strings)"
    );
    err.status = 500;
    throw err;
  }
  res.status(201).render("notes", { notes: await Note.find() });
};

export const removeNote = async (req, res) => {
  let error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(error.array().map((err) => err.msg));
  }
  let id = req.params.id;
  if (typeof id === "string" && id.length === 24) {
    id = new mongoose.Types.ObjectId(id);
    const exist = await Note.exists({ _id: id });
    if (!exist) {
      let err = new Error("an element must have the id");
      throw err;
    }
    await Note.deleteOne({ _id: id });
    res.status(200).render("notes", { notes: await Note.find() });
    return;
  }
  let err = new Error("an element must have the id");
  throw err;
};

export const updateNote = async (req, res) => {
  let error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json(error.array().map((err) => err.msg));
  }

  let id = req.params.id;
  if (typeof id === "string" && id.length === 24) {
    id = new mongoose.Types.ObjectId(id);
    const { title, content } = req.body;
    if (
      typeof title === "string" &&
      title.length > 0 &&
      typeof content === "string" &&
      content.length > 0
    ) {
      const exist = await Note.exists({ _id: id });
      if (!exist) {
        throw new Error("no note with this id");
      }
      await Note.updateOne(
        { _id: id },
        { title: title, content: content },
        { runValidators: true }
      );
      res.status(200).render("notes", { notes: await Note.find() });
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
