import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { Attachment } from 'nodemailer/lib/mailer';

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[]
}

export class EmailService {
    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor() {}

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, subject, htmlBody, attachments = [] } = options;
        try {
            const sentInformation = await this.transporter.sendMail({
                    to: to,
                    subject: subject,
                    html: htmlBody,
                    attachments
                }
            );

            return true;
        } catch (error) {
            return false;
        }
    }

    sendEmailWithFileSystemLogs(to: string | string[]) {
        const subject = 'Logs del servidor';
        const htmlBody = `
            <h3>Logs del sistema 🚀</h3>
            <p>Estos son los archivos de log del sistema de los niveles low, medium y high</p>
            <a>Ver logs adjuntos</p>
        `;

        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
        ];

        return this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments
        })
    }


}