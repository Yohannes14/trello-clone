export type InputFormProps = {
    onAddTask: (content: string) => void;
    setAddButton: (value: boolean) => void;
};


export type Task = {
    id: string;
    content: string;
    status: 'TODO' | 'IN-PROGRESS' | 'DONE';
};

export type LaneProps = {
    title: string;
    droppableId: string;
    tasks: Task[];
    showAddButton: boolean;
    onAddTask: (data: any) => void;
};