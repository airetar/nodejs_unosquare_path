export class UpdateTodoDto {
    private constructor(
        public readonly id: number,
        public readonly text: string,
        public readonly createdAt?: Date
    ) {}

    get values() {
        const returnObj: {[key: string]: any} = {};
        if (this.text) returnObj.text = this.text;
        if (this.createdAt) returnObj.createdAt = this.createdAt;

        return returnObj;
    }

    static create( props: { [key: string]: any } ): [string?, UpdateTodoDto?] {
        const { id, text, createdAt } = props;
        if (!id || isNaN(id)) return ['id must be a valid number'];
        if (!text) return ['Text property is required'];
        if ( createdAt ) {
            const newCreatedAt = new Date( createdAt );
            if ( newCreatedAt.toString() === 'Invalid Date' ) {
                return ['CreatedAt must be a valid Date']
            }
        }

        return [undefined, new UpdateTodoDto(id, text, createdAt)];
    }
}