import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
    execute ( url: string ): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

    constructor(
        private readonly logRepository: LogRepository[],
        private readonly succesCallback?: SuccessCallback,
        private readonly errorCallback?: ErrorCallback
    ) {}

    private callLogRepositories(log: LogEntity) {
        this.logRepository.forEach(repository => {
            repository.saveLog(log);
        })
    }
    
    public async execute ( url: string ): Promise<boolean> {
        const origin = 'check-service.ts';
        try {
            const req = await fetch( url );
            if ( !req.ok ) {
                throw new Error( `Error on check service ${ url }` )
            }
            const newEntity = new LogEntity({
                message: `Service ${ url } working`, 
                level: LogSeverityLevel.low, 
                origin
            });
            this.succesCallback && this.succesCallback();
            this.callLogRepositories( newEntity );
            return true;
        } catch (error) {
            const errorMsg = `${ error }`;
            this.errorCallback && this.errorCallback(errorMsg);
            const log = new LogEntity({
                message: errorMsg,
                level: LogSeverityLevel.high,
                origin
            });
            this.callLogRepositories( log );
            return false;
        }
    }

}