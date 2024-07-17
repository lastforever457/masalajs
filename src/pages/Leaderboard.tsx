import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {useEffect, useState} from "react";
import axios from "axios";
import {ITask, IUser} from "../Functions/interface.ts";
import generateAvatar from "../Functions/avatarGenerator.ts";

function Leaderboard() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [tasks, setTasks] = useState<ITask[] | null>(null);

    useEffect(() => {
        const fetchUsersAndTasks = async () => {
            try {
                const resUsers = await axios.get("https://f7f2aac439c74f02.mokky.dev/userDetails");
                const resTasks = await axios.get("https://f7f2aac439c74f02.mokky.dev/tasks");
                setUsers(resUsers.data);
                setTasks(resTasks.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsersAndTasks();
    }, []);

    const breadcrumbs = [
        <Link className="fs-4 text-secondary text-decoration-none" key="1" to="/">
            Bosh sahifa
        </Link>,
        <Typography className="fs-5 text-light" key="2">
            Leaderboard
        </Typography>,
    ];

    const sortedUsers = [...users].sort((a, b) => {
        const aSolved = a.results ? Object.keys(a.results).length : 0;
        const bSolved = b.results ? Object.keys(b.results).length : 0;
        return bSolved - aSolved;
    });

    const ranks = (num: number) => {
        switch (num) {
            case 1:
                return "🥇";
            case 2:
                return "🥈";
            case 3:
                return "🥉";
            default:
                return num;
        }
    }

    return (
        <section id="home" className="container py-3">
            <div className="home-header d-flex justify-content-start align-items-center">
                <p id="main-title" className="p-0 m-0">masala.js</p>
            </div>
            <p className="fs-5 text-secondary">
                JavaScript dasturlash tiliga oid turli qiyinlikdagi masalalar
            </p>
            <hr className="text-secondary"/>
            <div className="breadcrumb2">
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>} aria-label="breadcrumb" className="my-3">
                    {breadcrumbs}
                </Breadcrumbs>
            </div>
            <table className="table table-responsive text-center">
                <thead>
                <tr>
                    <th>#</th>
                    <th className="text-start">Name</th>
                    <th>All tasks</th>
                    <th>Tasks solved</th>
                    <th>Tasks left</th>
                    <th>Progress</th>
                </tr>
                </thead>
                <tbody id="leaderboards-table">
                {sortedUsers.length > 0 ? sortedUsers.map((user, index) => {
                    const solvedTasks = user.results ? Object.keys(user.results).length : 0;
                    const totalTasks = tasks ? tasks.length : 100; // Replace with actual total tasks if known
                    const tasksLeft = totalTasks - solvedTasks;
                    const percentage = (solvedTasks / totalTasks) * 100;

                    return (
                        <tr key={user.id}>
                            <td>{index < 3 ? ranks(index + 1) : index + 1}</td>
                            <td className="text-start d-flex justify-content-start align-items-center gap-2">
                                <span>
                                    {user.avatar ? (
                                        <img
                                            style={{
                                                width: "35px",
                                                height: "35px",
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                                objectPosition: "center",
                                            }}
                                            src={user.avatar}
                                            alt=""
                                        />
                                    ) : (
                                        <img
                                            style={{
                                                width: "35px",
                                                height: "35px",
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                                objectPosition: "center",
                                            }}
                                            src={generateAvatar({
                                                width: 30,
                                                height: 30,
                                                name: user.name,
                                                background: "#444",
                                            })}
                                            alt=""
                                        />
                                    )}
                                </span>
                                {user.name}
                            </td>

                            <td>{totalTasks}</td>
                            <td>{solvedTasks}</td>
                            <td>{tasksLeft}</td>
                            <td>{percentage.toFixed(1)}%</td>
                        </tr>
                    );
                }) : (
                    <tr>
                        <td colSpan={6}>Loading...</td>
                    </tr>
                )}
                </tbody>
            </table>
        </section>
    );
}

export default Leaderboard;
