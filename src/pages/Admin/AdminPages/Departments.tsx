import {useEffect, useState} from "react";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#303041',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface IDepartment {
    id: number;
    title: string;
}

interface ITask {
    id: number;
    departmentId: number;
    text: string;
    examples: string[];
    fun_name: string;
    solved: boolean;
    check: string[];
    answers: number[];
}

function Departments() {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await axios.get("https://f7f2aac439c74f02.mokky.dev/departments");
                const resTasks = await axios.get("https://f7f2aac439c74f02.mokky.dev/tasks");
                setDepartments(res.data);
                setTasks(resTasks.data);
            } catch (error) {
                console.error(error)
            }
        }

        fetchDepartments()
    }, []);

    const addDepartment = async () => {
        try {
            const text: HTMLInputElement | null = document.querySelector("#add-department-input");
            if (text) {
                const res = await axios.post("https://f7f2aac439c74f02.mokky.dev/departments", {
                    title: text.value
                });
                setDepartments([...departments, res.data]);
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="px-5 py-3">
            <div className="departments-header d-flex justify-content-between align-items-center">
                <h2>Modullar</h2>
                <button onClick={handleOpen} className="btn">
                    <AddIcon/>
                </button>
            </div>
            <hr/>
            <div className="departments-body">
                <table className="table text-center">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Tasks</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {departments.map((department: IDepartment) => {
                        const tasksInDepartment = tasks ? tasks.filter(t => t.departmentId === department.id) : [];
                        return (
                            <tr key={department.id}>
                                <td>{department.id}</td>
                                <td>{department.title}</td>
                                <td>{tasksInDepartment.length}</td>
                                <td className="d-flex justify-content-center align-items-center gap-2">
                                    <IconButton className="p-0" color="info">
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton className="p-0" color="error">
                                        <DeleteIcon/>
                                    </IconButton>
                                </td>
                            </tr>
                        );
                    })}

                    </tbody>
                </table>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" className="mb-4" component="h2">
                        Modul qo'shish
                    </Typography>
                    <input id="add-department-input" placeholder="Department nomini kiriting" type="text"
                           className="form-control"/>
                    <div className="add-department-btn-wrapper d-flex justify-content-end">
                        <Button onClick={addDepartment} variant="contained" className="mt-4">Qo'shish</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default Departments;