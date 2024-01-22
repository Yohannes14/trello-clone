
import { InputFormProps } from '@/type';
import { useState } from 'react';


const InputForm: React.FC<InputFormProps> = ({ onAddTask, setAddButton }) => {
    const [taskContent, setTaskContent] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskContent.trim()) {
            onAddTask(taskContent);
            setTaskContent('');
        }
        setAddButton(false)
    };

    return (
        <form onSubmit={handleSubmit} className="mt-2">
            <div className="flex items-center">
                <input
                    type="text"
                    value={taskContent}
                    onChange={(e) => setTaskContent(e.target.value)}
                    placeholder="Enter task content"
                    className="mr-2 p-2 border rounded text-gray-500"
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Add Task
                </button>
            </div>
        </form>
    );
};

export default InputForm;
