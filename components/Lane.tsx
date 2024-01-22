 //// COLUMNS
import { useState } from 'react';
import { Droppable, Draggable } from "@hello-pangea/dnd";
import InputForm from './InputFrom';
import { LaneProps } from '@/type';


const Lane: React.FC<LaneProps> = ({
    title,
    droppableId,
    tasks,
    showAddButton,
    onAddTask,
}) => {
    const [addButton, setAddButton] = useState(false);

    const handleOnClick = () => {
        setAddButton(true);
    }
    return (
        <Droppable droppableId={droppableId}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="w-full bg-gray-200 p-4 rounded"
                >
                    <h2 className="font-bold mb-1 text-gray-700">{title}</h2>
                    {tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="bg-white rounded-lg p-2 mb-2 hover:border border-2"
                                >
                                    <div className='flex justify-start items-center space-x-3'>
                                        <h1 className='text-4xl text-gray-600'>😒</h1>
                                        <div>
                                            <div className='text-sm font-semibold text-gray-500 mb-3'>
                                                {task.content}
                                            </div>
                                            <div className='flex justify-between items-center space-x-4'>
                                                <h1 className='text-sm text-gray-600 bg-gray-200'>Joo</h1>
                                                <h1 className='text-sm text-gray-600'>Id:{index + 1}</h1>

                                            </div>

                                        </div>

                                    </div>

                                </div>
                            )}
                        </Draggable>
                    ))}
                    {addButton && (
                        <InputForm onAddTask={onAddTask} setAddButton={setAddButton} />
                    )}
                    {showAddButton && !addButton && (
                        <button
                            onClick={handleOnClick}
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Add Task
                        </button>
                    )}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default Lane;
