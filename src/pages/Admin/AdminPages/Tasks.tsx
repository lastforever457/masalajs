import {useEffect, useState} from "react";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
// import IconButton from "@mui/material/IconButton";
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
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

interface IComment {
    id: number;
    taskId: number;
    text: string;
    solved: boolean;
}

function Tasks() {
    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [comments, setComments] = useState<IComment[]>([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const resDepartments = await axios.get("https://f7f2aac439c74f02.mokky.dev/departments");
                const resTasks = await axios.get("https://f7f2aac439c74f02.mokky.dev/tasks");
                const resComments = await axios.get("https://f7f2aac439c74f02.mokky.dev/comments");
                setDepartments(resDepartments.data);
                setTasks(resTasks.data);
                setComments(resComments.data);
                console.log(comments)
            } catch (error) {
                console.error(error)
            }
        }

        fetchDepartments()
    }, []);

    const addTask = async () => {
        try {
            const text: HTMLInputElement | null = document.querySelector("#add-department-input");
            if (text) {
                const res = await axios.post("https://f7f2aac439c74f02.mokky.dev/tasks", {
                    title: text.value
                });
                setDepartments([...departments, res.data]);
            }
        } catch (error) {
            console.error(error)
        }
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 150},
        {field: 'name', headerName: 'Ismi', width: 150, type: 'string'},
        {field: 'department', headerName: 'Moduli', width: 150, type: 'string'},
        {field: 'comments', headerName: 'Izohlar', width: 150, type: 'number'},
    ];

    const transformedTasks = tasks.map(task => ({
        id: task.id,
        name: task.fun_name, // Example: Take the first word of the 'text' field as 'name'
        department: `${departments.find(d => d.id === task.departmentId)?.title || ''}`, // Example: Create a department name based on 'departmentId'
        comments: task.answers.length // Example: Use the number of answers as the number of comments
    }));

    return (
        <div className="px-5 py-3">
            <div className="departments-header d-flex justify-content-between align-items-center">
                <h2>Tasks</h2>
                <button onClick={handleOpen} className="btn">
                    <AddIcon/>
                </button>
            </div>
            <hr/>
            <div className="departments-body" style={{height: 600, color: "#fff"}}>
                <DataGrid
                    sx={{
                        backgroundColor: '#303041',
                        color: '#fff',
                        width: '100%',
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: 'black', // Change this to your desired header background color
                            color: '#fff', // Change this to your desired header text color
                        },
                    }}
                    rows={transformedTasks}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {page: 0, pageSize: 10},
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" className="mb-4" component="h2">
                        Yangi vazifa qo'shish
                    </Typography>
                    <div className="my-2 d-flex flex-column justify-content-center align-items-start gap-1">
                        <label htmlFor="add-task-name-input">Vazifa nomini parametri bilan kiriting</label>
                        <input
                            name="taskName"
                            id="add-task-name-input"
                            placeholder="someFunction(a, b)"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="my-2 d-flex flex-column justify-content-center align-items-start gap-1">
                        <label htmlFor="add-task-description-input">Vazifaga izoh kiriting</label>
                        <input
                            name="taskDescription"
                            id="add-task-description-input"
                            placeholder="Ikkita parametrni yig'indisini chiqaruvchi funksiya tuzing."
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="my-2 d-flex flex-column justify-content-center align-items-start gap-1">
                        <label htmlFor="add-task-example-input">Vazifa namunasini kiriting</label>
                        <input
                            name="taskExample"
                            id="add-task-example-input"
                            placeholder="someFunction(1, 2) => 3"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="my-2 d-flex flex-column justify-content-center align-items-start gap-1">
                        <label htmlFor="add-task-check-input">Tekshirish uchun variant kiriting</label>
                        <div className="input-group">
                            <input
                                name="taskCheck"
                                id="add-task-check-input"
                                placeholder="3, 6"
                                type="text"
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="my-2 d-flex flex-column justify-content-center align-items-start gap-1">
                        <label htmlFor="add-task-result-input">Variant javobini kiriting</label>
                        <input
                            name="taskResult"
                            id="add-task-result-input"
                            placeholder="9"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="my-2 d-flex flex-column justify-content-center align-items-start gap-1">
                        <label htmlFor="add-task-department-select">Vazifa qaysi modulga tegishli</label>
                        <select
                            name="taskDepartment"
                            id="add-task-department-select"
                            className="form-control"
                        ></select>
                    </div>

                    <div className="add-department-btn-wrapper d-flex justify-content-end">
                        <Button onClick={addTask} variant="contained" className="mt-4">Qo'shish</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default Tasks;
