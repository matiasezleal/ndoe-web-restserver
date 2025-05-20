export class UpdateTodoDto {
    constructor(
        public readonly id: number,
        public readonly title?: string,
        public readonly completed?: boolean,
    ){}

    get values(){
        const returnObj: {[key: string]: any} = {};

        if(this.id !== undefined) returnObj.id = this.id;
        if(this.title !== undefined) returnObj.title = this.title;
        if(this.completed !== undefined) returnObj.completed = this.completed;

        return returnObj;
    }

    static create(props: {[key: string]: any}): [string?,UpdateTodoDto?]{
        const {title, completed} = props;

        // it should come one property
        if (!title && completed === undefined) {
            return ['At least one property (title or completed) must be provided'];
        }

        // title validation
        if (title !== undefined) {
            if (typeof title !== 'string') return ['Title must be a string'];
            if (title.length <= 3) return ['Title must be at least 3 characters long'];
        }

        // completed validation
        if (completed !== undefined && typeof completed !== 'boolean') {
            return ['Completed must be a boolean'];
        }

        return [undefined, new UpdateTodoDto(title, completed)];
    }
}