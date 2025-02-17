import { envs } from "./envs.plugin"

describe('envs.plugin tests', () => {
    test('Should return options', () => {
        expect(envs).toEqual({
            PORT: 3000,
            MAILER_SERVICE: 'gmail',
            MAILER_EMAIL: 'andres_ireta@icloud.com',
            MAILER_SECRET_KEY: '123456',
            PROD: false,
            MONGO_URL: 'mongodb://airtest:1234abcd@localhost:27017/',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'airtest',
            MONGO_PASS: '1234abcd'
        })
    });

    test('Should return an error if not found env',async () => {
        jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            await import('./envs.plugin');
            expect(true).toBe(false);
        } catch (error) {
            expect(`${error}`).toBe('EnvVarError: env-var: \"PORT\" should be a valid integer');
        }
    })
})