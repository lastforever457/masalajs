import React, {useEffect, useState} from 'react';
import {GiSandsOfTime} from "react-icons/gi";
import {ImExit} from "react-icons/im";
import {MdLeaderboard} from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";
import useLogin from "../Functions/UseLogin";
import useDepartments from "../Functions/UseDepartments";
import useTasks from "../Functions/UseTasks";
import {GrUserAdmin} from "react-icons/gr";
import {MdNotificationsActive} from "react-icons/md";
import axios from "axios";

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

interface INotification {
    id: number;
    message: string;
    read: boolean;
    userId: number;
}

interface IUser {
    name: string;
    email: string;
    password: string;
    role: string;
    id: number;
    notifications: INotification[];
    results: { [key: string]: boolean }[];
}

const Home: React.FC = () => {
    const navigate = useNavigate();
    const {checkLogin} = useLogin();
    const {departments, getDepartments} = useDepartments();
    const {tasks, getTasks} = useTasks();

    const getUser: IUser = JSON.parse(localStorage.getItem("token") || "{}");
    const [user, setUser] = useState<IUser>(getUser);
    const [notifications, setNotifications] = useState<INotification[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`https://f7f2aac439c74f02.mokky.dev/userDetails?id=${getUser.id}`);
                const resNotifications = await axios.get(`https://f7f2aac439c74f02.mokky.dev/userDetails?notifications.userId=${getUser.id}`);
                setUser(res.data);
                setNotifications(resNotifications.data);
                console.log(resNotifications);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
        getDepartments();
        getTasks();
    }, []);

    const logout = async () => {
        localStorage.removeItem("token");
        await checkLogin();
    };

    const openLeaderboards = () => {
        navigate("/leaderboard");
    };

    const handleOpenNotifications = () => {
        console.log(notifications[0])
        const ul: HTMLUListElement | null = document.querySelector("#messagesModal ul");
        if (ul && notifications) {
            ul.innerHTML = "";
            for (let i: number = 0; i < notifications.length; i++) {
                console.log(notifications[i])
                const li = document.createElement("li");
                li.className = "list-group-item d-flex justify-content-between align-items-center";
                li.innerHTML = `
                    <p>${notifications[i].message}</p>
                `;
                ul.appendChild(li);
            }
        }
    };

    return (
        <section id="home" className="container py-3">
            <div className="home-header d-flex justify-content-between align-items-center">
                <p id="main-title" className="p-0 m-0">masala.js</p>
                <div className="main-actions d-flex justify-content-center align-items-center gap-2">
                    {getUser.role === "admin" ? (
                        <Link to="/admin" className="btn fs-5"><GrUserAdmin/></Link>
                    ) : (
                        <button onClick={handleOpenNotifications} data-bs-target="#messagesModal"
                                data-bs-toggle="modal" type="button" className="btn position-relative">
                            <MdNotificationsActive className="fs-4"/>
                            {notifications.length > 0 && (
                                <span
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {notifications.filter(msg => !msg.read).length}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            )}
                        </button>
                    )}
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
                    const departmentTasks: ITask[] = tasks.filter((t: ITask) => t.departmentId === item.id);
                    let percentage: number = 0;
                    if (user && user.results) {
                        const solvedTasks = Object.keys(user.results).map(k => (parseInt(k) as number));
                        const solvedCount = solvedTasks ? departmentTasks.filter(t => solvedTasks.includes(t.id)).length : 0;
                        percentage = (solvedCount / departmentTasks.length) * 100;
                        localStorage.setItem("solvedTasks", JSON.stringify(solvedTasks));
                    }

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
                                            {percentage ? percentage.toFixed(2) : '0'}
                                            <span>%</span>
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
            <div className="modal modal-lg fade" id="messagesModal" data-bs-backdrop="static"
                 data-bs-keyboard="false" tabIndex={-1} aria-labelledby="messagesModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="messagesModalLabel">Bildirishnomalar</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul className="list-group list-group-flush"></ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Barchasini yopish</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;