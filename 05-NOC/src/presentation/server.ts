import { CheckService } from "../domain/use-cases/checks/check.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { EmailService } from "./email/email.service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

export class Server {
    public static start() {
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
        /**
         * * Cron job
         */
        // CronService.createJob('*/5 * * * * *', () => {
        //     //const url = 'https://google.com';
        //     const url = 'http://localhost:3000/posts'
        //     new CheckService(
        //         fileSystemLogRepository,
        //         () => console.log( `${ url } is Ok` ),
        //         (error) => console.log( error )
        //     ).execute( url )
        // });
    }
}