import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

let _db;

export const initDb = (callback) => {
    if (_db) {
        console.log('Db is already initialized!');
        return callback(null, _db);
    }
    // Note: process.env.MongoDB_URI must match your .env key exactly
    MongoClient.connect(process.env.MONGODB_URI) 
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

export const getDb = () => {
    if (!_db) {
        throw Error('Db not initialized');
    }
    return _db;
};

// Default export to make it easy to import as 'mongodb' elsewhere
export default {
    initDb,
    getDb,
};
