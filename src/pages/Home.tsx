import React, {useEffect, useState} from 'react';
import {GiSandsOfTime} from "react-icons/gi";
import {ImExit} from "react-icons/im";
import {MdLeaderboard, MdNotificationsActive} from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";
import useLogin from "../Functions/UseLogin";
import useDepartments from "../Functions/UseDepartments";
import {GrUserAdmin} from "react-icons/gr";
import axios from "axios";
import {IoEllipsisVerticalSharp} from "react-icons/io5";
import {FaRegUserCircle} from "react-icons/fa";

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
    text: string;
    color: "primary" | "secondary" | "success" | "info" | "warning" | "error" | "danger" | "light" | "dark";
    users: { id: number };
    date: string;
}

interface IUser {
    name: string;
    email: string;
    password: string;
    role: string;
    id: number;
    notifications: INotification[];
    results: { [key: string]: boolean };
    avatar: string
}

const Home: React.FC = () => {
    const navigate = useNavigate();
    const {checkLogin} = useLogin();
    const {departments, getDepartments} = useDepartments();

    const getUser: IUser = JSON.parse(localStorage.getItem("token") || "{}");
    const [user, setUser] = useState<IUser>(getUser);
    const [notifications, setNotifications] = useState<INotification[] | null>(null);
    const [tasks, setTasks] = useState<ITask[] | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`https://f7f2aac439c74f02.mokky.dev/userDetails?id=${getUser.id}`);
                const resTasks = await axios.get(`https://f7f2aac439c74f02.mokky.dev/tasks`);
                const resNotifications = await axios.get(`https://f7f2aac439c74f02.mokky.dev/notifications?users.id=${getUser.id}`);
                setUser(res.data);
                setTasks(resTasks.data);
                setNotifications(resNotifications.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUser();
        getDepartments();
    }, []);

    const logout = async () => {
        localStorage.removeItem("token");
        await checkLogin();
    };

    const openLeaderboards = () => {
        navigate("/leaderboard");
    };

    const handleOpenNotifications = () => {
        const ul: HTMLUListElement | null = document.querySelector("#messagesModal ul");
        if (ul && notifications) {
            ul.innerHTML = "";
            notifications.forEach((notification) => {
                const li = document.createElement("li");
                li.className = "list-group-item d-flex justify-content-between align-items-center";
                li.innerHTML = `
                    <div class="w-100 m-0 d-flex justify-content-between alert alert-${notification.color}" role="alert">
                        ${notification.text}
                        <span>${notification.date}</span>
                    </div>
                `;
                ul.appendChild(li);
            });
        }
    };

    return (
        <section id="home" className="container py-3">
            <div className="home-header d-flex justify-content-between align-items-center">
                <p id="main-title" className="p-0 m-0">masala.js</p>
                <div className="main-actions d-flex justify-content-center align-items-center gap-2">
                    <div className="dropdown">
                        <button className="btn" type="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                            <IoEllipsisVerticalSharp/>
                        </button>
                        <ul className="dropdown-menu">
                            <li data-bs-toggle="modal" data-bs-target="#userProfileModal"
                                className="dropdown-item d-flex justify-content-start align-items-center gap-2">
                                <FaRegUserCircle/> Profilingiz
                            </li>
                            {getUser.role === "admin"
                                ? (<li><Link to="/admin"
                                             className="dropdown-item d-flex justify-content-start align-items-center gap-2"><GrUserAdmin/> Admin</Link>
                                </li>)
                                : (<li data-bs-target="#messagesModal" data-bs-toggle="modal"
                                       className="dropdown-item d-flex justify-content-start align-items-center gap-2"
                                       onClick={handleOpenNotifications}><MdNotificationsActive/> Xabarlar</li>)
                            }
                            <li className="dropdown-item d-flex justify-content-start align-items-center gap-2"
                                onClick={openLeaderboards}><MdLeaderboard/> Reyting
                            </li>
                            <li className="dropdown-item d-flex justify-content-start align-items-center gap-2"
                                onClick={logout}><ImExit/> Chiqish
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <p className="fs-5 text-secondary">
                JavaScript dasturlash tiliga oid turli qiyinlikdagi masalalar
            </p>
            <hr className="text-secondary"/>
            <div className="row">
                {departments.map((item: IDepartment) => {
                    const departmentTask: ITask[] = tasks ? tasks.filter(t => t.departmentId === item.id) : [];
                    let percentage: number = 0;
                    if (user && user.results) {
                        const solvedTasks = Object.keys(user.results).map(k => parseInt(k));
                        const solvedCount = departmentTask.filter(t => solvedTasks.includes(t.id)).length;
                        percentage = departmentTask.length > 0 ? (solvedCount / departmentTask.length) * 100 : 0;
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
                                        {departmentTask.length}
                                        <GiSandsOfTime className="fs-4"/>
                                    </p>
                                </div>
                                <div className="col-sm-6 department-progress-wrapper position-relative">
                                    <div className="department-progress">
                                        <h3 className="m-0">
                                            {percentage ? percentage.toFixed(2) : 0}
                                            <span>%</span>
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </div>
            {/*Xabarlar modal*/}
            <div className="modal modal-lg fade" id="messagesModal" data-bs-backdrop="static"
                 data-bs-keyboard="false" tabIndex={-1} aria-labelledby="messagesModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="messagesModalLabel">Bildirishnomalar</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul className="d-flex flex-column list-group list-group-flush"></ul>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Barchasini yopish</button>
                        </div>
                    </div>
                </div>
            </div>

            {/*User profile modal*/}
            <div className="modal modal-lg fade" id="userProfileModal" tabIndex={-1}
                 aria-labelledby="userProfileModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="userProfileModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-6 col-md-4 d-flex justify-content-around align-items-center">
                                    <div className="user-profile-image">
                                        <img className="" style={{
                                            height: "200px",
                                            width: "200px",
                                            backgroundSize: "cover",
                                            objectFit: "cover",
                                            borderRadius: "50%",
                                            backgroundPosition: "center",
                                        }} src={getUser && getUser.avatar != "" ? getUser.avatar : "0"}
                                             alt={getUser.name}/>

                                    </div>
                                </div>
                                <div className="col-sm-6 col-md-8"></div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
