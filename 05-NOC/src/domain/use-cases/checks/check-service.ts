import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceUseCase {
    execute ( url: string ): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly logRepository: LogRepository,
        private readonly succesCallback?: SuccessCallback,
        private readonly errorCallback?: ErrorCallback
    ) {}
    
    public async execute ( url: string ): Promise<boolean> {
        try {
            const req = await fetch( url );
            if ( !req.ok ) {
                throw new Error( `Error on check service ${ url }` )
            }
            const newEntity = new LogEntity(`Service ${ url } working`, LogSeverityLevel.low);
            this.succesCallback && this.succesCallback();
            this.logRepository.saveLog( newEntity );
            return true;
        } catch (error) {
            const errorMsg = `${ error }`;
            this.errorCallback && this.errorCallback(errorMsg);
            const log = new LogEntity(errorMsg, LogSeverityLevel.high);
            this.logRepository.saveLog(log);
            return false;
        }
    }

}