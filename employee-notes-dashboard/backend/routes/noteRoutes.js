const express = require("express");
const router = express.Router();

const Note = require("../models/Note");

router.post("/", async (req, res) => {

  try {

    const { title, description } = req.body;

    const newNote = new Note({
      title,
      description
    });

    await newNote.save();

    res.status(201).json({
      message: "Note created successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});


router.get("/", async (req, res) => {

  try {

    const notes = await Note.find().sort({ createdAt: -1 });

    res.status(200).json(notes);

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});


router.put("/:id", async (req, res) => {

  try {

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Note updated successfully",
      updatedNote
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});


router.delete("/:id", async (req, res) => {

  try {

    await Note.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Note deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});

module.exports = router;