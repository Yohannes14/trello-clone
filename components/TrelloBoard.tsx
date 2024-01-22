"use client";
import { useState, useEffect } from 'react';
import { DragDropContext } from "@hello-pangea/dnd";
import Lane from './Lane';
import { Task } from '@/type';



const initialTasks: Task[] = [
    { id: 'task1', content: 'Clone trello using Next js', status: 'TODO' },
    { id: 'task2', content: 'User account verification', status: 'TODO' },
];

const TrelloBoard: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const storageKey = 'board-tasks';

    useEffect(() => {
        const storedTasks = localStorage.getItem(storageKey);

        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    const handleDragEnd = (result: any) => {
        const { destination, source } = result;

        if (!destination) return;

        const updatedTasks = [...tasks];
        const draggedTask = updatedTasks.find((task) => task.id === result.draggableId);

        if (!draggedTask) return;

        if (destination.droppableId === 'inProgress') {
            draggedTask.status = 'IN-PROGRESS';
        } else if (destination.droppableId === 'done') {
            draggedTask.status = 'DONE';
        } else {
            draggedTask.status = 'TODO';
        }

        setTasks(updatedTasks);
        localStorage.setItem(storageKey, JSON.stringify(updatedTasks));
    };

    const handleAddTask = (data: any) => {
        if (!data) return;

        const newTask: Task = {
            id: `task${tasks.length + 1}`,
            content: data,
            status: 'TODO',
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem(storageKey, JSON.stringify(updatedTasks));
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mx-2">
                {/* TODO lane */}
                <Lane
                    title="TODO"
                    droppableId="todo"
                    tasks={tasks.filter((task) => task.status === 'TODO')}
                    showAddButton={true}
                    onAddTask={handleAddTask}

                />

                {/* IN-PROGRESS lane */}
                <Lane
                    title="IN-PROGRESS"
                    droppableId="inProgress"
                    tasks={tasks.filter((task) => task.status === 'IN-PROGRESS')}
                    showAddButton={false}
                    onAddTask={handleAddTask}

                />

                {/* DONE lane */}
                <Lane
                    title="DONE"
                    droppableId="done"
                    tasks={tasks.filter((task) => task.status === 'DONE')}
                    showAddButton={false}
                    onAddTask={handleAddTask}

                />
            </div>
        </DragDropContext>
    );
};

export default TrelloBoard;

