import { EmailService, SendMailOptions } from "./email.service"
import nodemailer from 'nodemailer';

describe('Email service', () => {

    const mockSendMail = jest.fn();

    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail,
        
    });

    const emailService = new EmailService();

    test('Should send email',async () => {
        const options: SendMailOptions = {
            to: 'aireta@gmail.com',
            subject: 'Email service test',
            htmlBody: `<h1>Title email service test</h3>`
        }

        await emailService.sendEmail( options );

        expect(mockSendMail).toHaveBeenCalledWith({
            attachments: [], 
            html: `<h1>Title email service test</h3>`,
            subject: "Email service test",
            to: "aireta@gmail.com"
        })
    })

    test('Should send email with attachments',async () => {
        const email = 'aireta@gmail.com';
        await emailService.sendEmailWithFileSystemLogs('aireta@gmail.com');

        expect( mockSendMail ).toHaveBeenCalledWith({
            to: 'aireta@gmail.com',
            attachments: expect.arrayContaining([
                { filename: 'logs-all.log', path: './logs/logs-all.log' },
                { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
                { filename: 'logs-high.log', path: './logs/logs-high.log' },
            ]),
            html: expect.any(String), 
            subject: "Logs del servidor"
        })
    })
})