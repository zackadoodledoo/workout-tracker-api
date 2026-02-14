import mongodb from '../data/database.js'; // Added .js extension
import { ObjectId } from 'mongodb';       // Destructured import

// GET all workouts
export const getAll = async (req, res) => {
    const result = await mongodb.getDb().db().collection('workouts').find();
    const workouts = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(workouts);
};

// GET single workout
export const getSingle = async (req, res) => {
    try {
        const workoutId = new ObjectId(req.params.id);
        const result = await mongodb 
            .getDb()
            .db()
            .collection('workouts')
            .find({ _id: workoutId });
        const workout = await result.toArray();
        res.status(200).json(workout[0]);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

// POST create workout
export const createWorkout = async (req, res) => {
    try {
        const workout = {
            name: req.body.name,
            duration: req.body.duration,
            date: req.body.date,
            type: req.body.type
        };

        
        const response = await mongodb
            .getDb()
            .db()
            .collection('workouts')
            .insertOne(workout);

        if (response.acknowledged) {
            // Return the new ID so you can use it in PUT/DELETE
            res.status(201).json(response);
        } else {
            res.status(500).json({ message: 'Error occurred while creating the workout.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// PUT update workout
export const updateWorkout = async (req, res) => {
  try {
    const workoutId = new ObjectId(req.params.id);
    const workout = {
      name: req.body.name,
      duration: req.body.duration,
      caloriesBurned: req.body.caloriesBurned,
      date: req.body.date,
      intensity: req.body.intensity,
      type: req.body.type,
      notes: req.body.notes,
      userId: req.body.userId
    };

    const response = await mongodb
      .getDb()
      .db()
      .collection('workouts')
      .replaceOne({ _id: workoutId }, workout);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE workout
export const deleteWorkout = async (req, res) => {
  try {
    const workoutId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('workouts')
      .deleteOne({ _id: workoutId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'Workout deleted' });
    } else {
      res.status(404).json({ message: 'Workout not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
    getAll,
    getSingle,
    createWorkout,
    updateWorkout,
    deleteWorkout 
};