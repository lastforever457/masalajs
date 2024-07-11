import axios from 'axios';
import {useState, useEffect} from 'react';

const useDepartments = () => {
    const [departments, setDepartments] = useState([]);

    const getDepartments = async () => {
        try {
            const res = await axios.get(`https://f7f2aac439c74f02.mokky.dev/departments`);
            setDepartments(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDepartments();
    }, []);

    return {departments, getDepartments};
};

export default useDepartments;
