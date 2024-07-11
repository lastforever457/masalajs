import { GiSandsOfTime } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { ImExit } from "react-icons/im";
import useLogin from "../Functions/UseLogin";
import { useEffect } from "react";
import useDepartments from "../Functions/UseDepartments";
import useTasks from "../Functions/UseTasks";

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

function Home() {
    const navigate = useNavigate();
    const { checkLogin } = useLogin();
    const { departments, getDepartments } = useDepartments();
    const { tasks, getTasks } = useTasks();

    useEffect(() => {
        getDepartments();
        getTasks();
    }, []);

    const logout = async () => {
        localStorage.removeItem("token");
        await checkLogin();
    };

    return (
        <section id="home" className="container py-3">
            <div className="home-header d-flex justify-content-between align-items-center">
                <p id="main-title" className="p-0 m-0">masala.js</p>
                <button onClick={logout} className="btn text-light fs-5"><ImExit /></button>
            </div>
            <p className="fs-5 text-secondary">
                JavaScript dasturlash tiliga oid turli qiyinlikdagi masalalar
            </p>
            <hr className="text-secondary" />
            <div className="row">
                {departments.map((item: IDepartment) => {
                    const departmentTasks = tasks.filter((t: ITask) => t.departmentId === item.id);
                    const solvedTasks = departmentTasks.filter((t: ITask) => t.solved).length;
                    const progress = departmentTasks.length ? (solvedTasks * 100) / departmentTasks.length : 0;

                    return (
                        <div key={item.id} className="col-sm-6 col-md-4 col-lg-3 my-2">
                            <Link
                                to="/tasks"
                                onClick={(e) => {
                                    e.preventDefault();
                                    localStorage.setItem("departmentId", item.id.toString());
                                    navigate("/tasks");
                                }}
                                className="row department-card m-1 shadow-lg px-2 py-3 text-decoration-none"
                            >
                                <div className="col-sm-6 d-flex flex-column justify-content-around align-items-start">
                                    <h2>{item.title}</h2>
                                    <p className="fs-3 p-0 m-0">
                                        {departmentTasks.length}
                                        <GiSandsOfTime className="fs-4" />
                                    </p>
                                </div>
                                <div className="col-sm-6 department-progress-wrapper position-relative">
                                    <div className="department-progress">
                                        <h3>
                                            {progress.toFixed(2)}
                                            <span>%</span>
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default Home;
