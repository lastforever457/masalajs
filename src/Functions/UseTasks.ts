import axios from 'axios';
import {useState, useEffect} from 'react';

const useTasks = () => {
    const [tasks, setTasks] = useState([]);

    const getTasks = async () => {
        let depId = localStorage.getItem("departmentId");
        if (!depId) return
        else depId = JSON.parse(depId);
        try {
            const res = await axios.get(`https://f7f2aac439c74f02.mokky.dev/tasks?departmentId=${depId}`);
            setTasks(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    return {tasks, getTasks};
};

export default useTasks;
