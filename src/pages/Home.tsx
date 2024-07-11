import {GiSandsOfTime} from "react-icons/gi";
import {Link, useNavigate} from "react-router-dom";
import {tasks} from "../Materials/Tasks";
import {ImExit} from "react-icons/im";
import useLogin from "../Functions/UseLogin.tsx";
import axios from "axios";
import {useEffect, useState} from "react";

interface IDepartment {
    id: number,
    title: string
}

function Home() {
    const [departments, setDepartments] = useState([])
    const navigate = useNavigate();
    const {checkLogin} = useLogin();

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await axios.get("https://f7f2aac439c74f02.mokky.dev/departments");
                setDepartments(res.data);
            } catch (error) {
                console.error('Error fetching the departments:', error);
            }
        };

        fetchDepartments();
    }, []);

    console.log(departments);

    const logout = async () => {
        localStorage.removeItem("token");
        await checkLogin();
    };

    return (
        <section id="home" className="container py-3">
            <div className="home-header d-flex justify-content-between align-items-center">
                <p id="main-title" className="p-0 m-0">
                    masala.js
                </p>
                <button onClick={logout} className="btn text-light fs-5"><ImExit/></button>
            </div>
            <p className="fs-5 text-secondary">
                JavaScript dasturlash tiliga oid turli qiyinlikdagi masalalar
            </p>
            <hr className="text-secondary"/>
            <div className="row">
                {departments.map((item: IDepartment) => {
                    const a = tasks.filter((t) => t.departmentId === item.id);
                    const b = a.filter((t) => t.solved);
                    const c = a.length / 100;
                    const progress = b.length / c;
                    return (
                        <div
                            key={item.id}
                            className="col-sm-6 col-md-4 col-lg-3 my-2"
                        >
                            <Link
                                to={"/tasks"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    localStorage.setItem(
                                        "departmentId",
                                        item.id.toString()
                                    );
                                    navigate("/tasks");
                                }}
                                className="row department-card m-1 shadow-lg px-2 py-3 text-decoration-none"
                            >
                                <div className="col-sm-6 d-flex flex-column justify-content-around align-items-start">
                                    <h2>{item.title}</h2>
                                    <p className="fs-3 p-0 m-0">
                                        {
                                            tasks.filter(
                                                (t) =>
                                                    t.departmentId === item.id
                                            ).length
                                        }
                                        <GiSandsOfTime className="fs-4"/>
                                    </p>
                                </div>
                                <div className="col-sm-6 department-progress-wrapper position-relative">
                                    <div
                                        className="department-progress"
                                        
                                    >
                                        <h3>
                                            {progress}
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
