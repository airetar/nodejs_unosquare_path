import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prismaClient = new PrismaClient();

export const SeverityLevelH = {
    [LogSeverityLevel.high]: SeverityLevel.HIGH,
    [LogSeverityLevel.medium]: SeverityLevel.MEDIUM,
    [LogSeverityLevel.low]: SeverityLevel.LOW,
}

export class PostgreLogDatasource implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
        const { message, level, createdAt, origin } = log;
        const newLog = await prismaClient.logModel.create({
            data: {
                level: SeverityLevelH[level],
                message,
                origin,
                createdAt
            }
        });
        console.log(`Postgre log created`, newLog);
    }
    async getLogs(severitylevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await prismaClient.logModel.findMany({
            where: {
                level: SeverityLevelH[severitylevel]
            }
        });

        return logs.map(LogEntity.fromObject);
    }
    
}