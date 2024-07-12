import React, {useEffect} from 'react';
import {GiSandsOfTime} from "react-icons/gi";
import {ImExit} from "react-icons/im";
import {MdLeaderboard} from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";
import useLogin from "../Functions/UseLogin";
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

interface IUser {
    name: string;
    email: string;
    password: string;
    role: string;
    id: number;
    results: { [key: string]: boolean }[];
}

const Home: React.FC = () => {
    const navigate = useNavigate();
    const {checkLogin} = useLogin();
    const {departments, getDepartments} = useDepartments();
    const {tasks, getTasks} = useTasks();

    const user: IUser = JSON.parse(localStorage.getItem("token") || "{}");
    user.results = user.results || [];

    useEffect(() => {
        getDepartments();
        getTasks();
    }, []);

    const logout = async () => {
        localStorage.removeItem("token");
        await checkLogin();
    };

    const openLeaderboards = () => {
        navigate("/leaderboard");
    }

    return (
        <section id="home" className="container py-3">
            <div className="home-header d-flex justify-content-between align-items-center">
                <p id="main-title" className="p-0 m-0">masala.js</p>
                <div className="main-actions d-flex justify-content-center align-items-center gap-2">
                    <button onClick={openLeaderboards} className="btn fs-5"><MdLeaderboard/></button>
                    <button onClick={logout} className="btn text-light fs-5"><ImExit/></button>
                </div>
            </div>
            <p className="fs-5 text-secondary">
                JavaScript dasturlash tiliga oid turli qiyinlikdagi masalalar
            </p>
            <hr className="text-secondary"/>
            <div className="row">
                {departments.map((item: IDepartment) => {
                    const departmentTasks: ITask[] = tasks.filter((t: ITask) => t.departmentId === item.id)
                    const solvedTasks = Object.keys(user.results).map(k => (parseInt(k) as number))
                    const solvedCount = departmentTasks.filter(t => solvedTasks.includes(t.id)).length;
                    const percentage = (solvedCount / departmentTasks.length) * 100;
                    localStorage.setItem("solvedTasks", JSON.stringify(solvedTasks));

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
                                        <GiSandsOfTime className="fs-4"/>
                                    </p>
                                </div>
                                <div className="col-sm-6 department-progress-wrapper position-relative">
                                    <div className="department-progress">
                                        <h3 className="m-0">
                                            {percentage ? percentage : '0'}
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
};

export default Home;