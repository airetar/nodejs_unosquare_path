import mongoose from "mongoose";

/**
 level: LogSeverityLevel;
     message: string;
     origin: string;
     createdAt?: Date;
 */

     const LogSchema = new mongoose.Schema({
        level: String,
message: String,
origin: String,
createdAt: String,
     })