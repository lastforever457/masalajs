import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface ITask {
    id: 1,
    departmentId: 1,
    text: string,
    examples: string[],
    fun_name: string,
    solved: boolean,
    check: string[],
    answers: number[]
}


function TaskPage() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const depId: number = parseInt(
        localStorage.getItem("departmentId") || "",
        10
    );

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await axios.get(`https://f7f2aac439c74f02.mokky.dev/tasks?departmentId=${depId}`);
            setTasks(res.data);
        }
        fetchTasks()
    }, [depId]);

    const breadcrumbs = [
        <Link className="fs-4 text-secondary text-decoration-none" key="1" color="inherit" to="/">
            Bosh sahifa
        </Link>,
        <Typography className="fs-5 text-light" key="2">
            Vazifalar
        </Typography>
    ];

    return (
        <section id="tasks" className="container py-3">
            <p id="main-title" className="p-0 m-0">
                masala.js
            </p>
            <p className="fs-5 text-secondary">
                JavaScript dasturlash tiliga oid turli qiyinlikdagi masalalar
            </p>
            <hr className="text-secondary"/>
            <div className="breadcrumb1">
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small"/>}
                    aria-label="breadcrumb"
                    className="my-3"
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </div>
            <div className="row">
                {tasks.map((item: ITask) => {
                    const title = item.fun_name.replace(/\(.*\)$/, "");
                    return (
                        <div
                            key={item.id}
                            className="col-sm-6 col-md-4 col-lg-3 my-2"
                        >
                            <Link
                                to={"/task"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    localStorage.setItem(
                                        "taskId",
                                        item.id.toString()
                                    );
                                    navigate("/tasks/task");
                                }}
                                className="row text-decoration-none tasks-card m-1 shadow-lg px-3 py-3"
                            >
                                <h2
                                    className="p-0 m-0"
                                >
                                    {title}
                                </h2>
                            </Link>
                        </div>
                    )
                        ;
                })}
            </div>
        </section>
    );
}

export default TaskPage;
