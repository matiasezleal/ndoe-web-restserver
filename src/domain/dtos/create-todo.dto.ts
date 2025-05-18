
export class CreateTodoDto {
    
    constructor(
        public readonly title: string,
    ){}

    static create(props: {[key: string]: any}): [string?,CreateTodoDto?]{

        const {title} = props;

        if(!title) return ['Title is required', undefined];

        if(typeof title !== 'string') return ['Title must be a string', undefined];

        if(title.length <= 3) return ['Title must be at least 3 characters long', undefined];

        return [undefined, new CreateTodoDto(props.title)];
    }
}

