import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgreLogDatasource } from "../infrastructure/datasources/postgre-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron.service";
import { EmailService } from "./email/email.service";

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
);

const postgreLogRepository = new LogRepositoryImpl(
    new PostgreLogDatasource()
);

export class Server {
    public static async start() {
        console.log('Server started...');

        const emailService = new EmailService();
        /**
         * * 1.1 Without attachments
         */
        // emailService.sendEmail({
        //     to: 'andres.iretar@gmail.com',
        //     subject: 'Logs de sistema',
        //     htmlBody: `
        //         <h3> LOGS DE SISTEMA </h3>
        //         <p>Lorem ipsum test</p>
        //     `
        // });
        /**
         * * 1.2 With attachments
         */
        //emailService.sendEmailWithFileSystemLogs(['andres.iretar@gmail.com', 'aireta@outlook.com']);
        /**¨
         * * Using the Use Case
         */
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(['andres.iretar@gmail.com', 'aireta@outlook.com']);
        
        // const logs = await logRepository.getLogs(LogSeverityLevel.low);
        // console.log(logs);
        
        /**
         * * Cron job single use case
         */
        // CronService.createJob('*/5 * * * * *', () => {
        //     //const url = 'https://google.com';
        //     const url = 'http://localhost:3000/posts'
        //     new CheckService(
        //         logRepository,
        //         () => console.log( `${ url } is Ok` ),
        //         (error) => console.log( error )
        //     ).execute( url )
        // });
        /**
         * * Cron job Multiple use case
         */
        CronService.createJob('*/5 * * * * *', () => {
            //const url = 'https://google.com';
            const url = 'http://localhost:3000/posts'
            new CheckServiceMultiple(
                [fsLogRepository, mongoLogRepository, postgreLogRepository],
                () => console.log( `${ url } is Ok` ),
                (error) => console.log( error )
            ).execute( url )
        });
    }
}