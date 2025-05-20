
export class TodoEntity{
    constructor(
        public readonly id: number,
        public readonly title: string,
        public readonly completed: boolean,
        public readonly createdAt: Date
    ){}

    static fromObject(object: {[key: string]: any}): TodoEntity{
        const {id, title, completed, createdAt} = object;

        if(!id) throw new Error('Id is required');
        if(!title) throw new Error('Title is required');
        if(!completed) throw new Error('Completed is required');
        if(!createdAt) throw new Error('CreatedAt is required');

        return new TodoEntity(id, title, completed, createdAt);
    }

    get isCompleted(): boolean{
        return this.completed;
    }

}