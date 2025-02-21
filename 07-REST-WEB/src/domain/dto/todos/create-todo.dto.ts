export class CreateTodoDto {
    private constructor(
        public readonly text: string,
        public readonly createdAt: Date = new Date()
    ) {}

    static create( props: { [key: string]: any } ): [string?, CreateTodoDto?] {
        const { text } = props;
        if (!text) return ['Text property is required'];

        return [undefined, new CreateTodoDto(text)];
    }
}