import { validationResult } from 'express-validator';
import mongodb from '../data/database.js';
import { ObjectId } from 'mongodb';

export default {
  getAll: async (req, res) => {
    try {
      const db = mongodb.getDb().db();
      const workouts = await db.collection('workouts').find().toArray();
      res.status(200).json(workouts);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  getSingle: async (req, res) => {
    try {
      const id = req.params.id;
      const db = mongodb.getDb().db();
      const workout = await db.collection('workouts').findOne({ _id: new ObjectId(id) });

      if (!workout) return res.status(404).json({ message: 'Workout not found' });

      res.status(200).json(workout);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  createWorkout: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const db = mongodb.getDb().db();
      const result = await db.collection('workouts').insertOne(req.body);

      res.status(201).json({ id: result.insertedId });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  updateWorkout: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const id = req.params.id;
      const db = mongodb.getDb().db();

      const result = await db.collection('workouts').updateOne(
        { _id: new ObjectId(id) },
        { $set: req.body }
      );

      if (result.matchedCount === 0) return res.status(404).json({ message: 'Workout not found' });

      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  },

  deleteWorkout: async (req, res) => {
    try {
      const id = req.params.id;
      const db = mongodb.getDb().db();

      const result = await db.collection('workouts').deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) return res.status(404).json({ message: 'Workout not found' });

      res.sendStatus(200);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
};