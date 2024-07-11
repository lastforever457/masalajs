import axios from 'axios';
import {useState, useEffect} from 'react';

const useComments = (taskId: number) => {
    const [comments, setComments] = useState([]);

    const getComments = async (taskId: number) => {
        if (!taskId) return;
        try {
            const res = await axios.get(`https://f7f2aac439c74f02.mokky.dev/comments?taskId=${taskId}`);
            setComments(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getComments(taskId);
    }, [taskId]);

    return {comments, getComments};
};

export default useComments;
