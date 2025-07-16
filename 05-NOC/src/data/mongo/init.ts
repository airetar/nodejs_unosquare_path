import mongoose from "mongoose";

export interface ConnectionOptions {
    mongoUrl: string;
    dbName: string;
}


export class MongoDatabase {
    static async connect(options: ConnectionOptions) {
        const { mongoUrl, dbName } = options;

        try {
            await mongoose.connect(mongoUrl, {
                dbName
            });
            console.log(`Mongo Connected...`)
        } catch (error) {
            console.log(`Mongo connection error`);
            throw error;
        }
    }
}