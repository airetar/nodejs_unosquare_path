import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import fs from 'fs';

export class FileSystemDatasource implements LogDatasource {

    private logPath = 'logs/';
    private allLogsPath = 'logs/logs-all.log';
    private mediumLogsPath = 'logs/logs-medium.log';
    private highLogsPath = 'logs/logs-high.log';

    constructor() {
        this.createLogsfiles();
    }

    private createLogsfiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }

        [   
            this.logPath,
            this.allLogsPath,
            this.mediumLogsPath,
            this.highLogsPath
        ].forEach(path => {
            if (fs.existsSync(( path ))) return;
            fs.writeFileSync(path, '');
        })
    }

    async saveLog(newLog: LogEntity): Promise<void> {
        const logAsJson = `${ JSON.stringify(newLog) }\n`;
        fs.appendFileSync( this.allLogsPath, logAsJson );
        if (newLog.level === LogSeverityLevel.low) return;
        switch( newLog.level ) {
            case LogSeverityLevel.medium:
                fs.appendFileSync( this.mediumLogsPath, logAsJson );
                break;
            case LogSeverityLevel.high:
                fs.appendFileSync( this.highLogsPath, logAsJson );
                break;
        }
    }

    private getLogsFromFile = ( path: string ): LogEntity[] => {
        const content = fs.readFileSync(path, { encoding: 'utf-8' });
        if (content === '') return [];
        const logs = content.split('\n').map(LogEntity.fromJSON); // map(log => LogEntity.fromJSON(log))

        return logs;
    }

    async getLogs(severitylevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch(severitylevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogsPath);
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);

            default:
                throw new Error('Not implemented');
            
        }
    }

}