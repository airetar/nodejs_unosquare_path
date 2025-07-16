/* import { MongoLogDatasource } from './mongo-log.datasource';
import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity"; */

export class MongoLogDatasource {
    
}

/* export class MongoLogDatasource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        console.log(`Mongo Log created ${newLog.id}`);
    }
    
    async getLogs(severitylevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({
            level: severitylevel
        });

        return logs.map(LogEntity.fromObject);
    }
    
} */