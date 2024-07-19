import {IContest, IUser} from "../Functions/interface.ts";
import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {GridExpandMoreIcon} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import axios from "axios";
import {generateStatus, generateTheme} from "../Functions/functions.tsx";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {toast} from "react-toastify";

function Contests() {
    const [contests, setContests] = useState<IContest[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    const getUser: IUser = JSON.parse(localStorage.getItem("token") || "{}");

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const res = await axios.get<IContest[]>(
                    "https://f7f2aac439c74f02.mokky.dev/contests"
                );
                const resUsers = await axios.get(
                    "https://f7f2aac439c74f02.mokky.dev/userDetails"
                );
                setContests(res.data);
                setUsers(resUsers.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchContests();
    }, []);

    const breadcrumbs = [
        <Link className="fs-4 text-secondary text-decoration-none" key="1" color="inherit" to="/">
            Bosh sahifa
        </Link>,
        <Typography className="fs-5 text-light" key="2">
            Turnirlar
        </Typography>
    ]

    return (
        <section id="home" className="container py-3">
            <div className="home-header d-flex justify-content-between align-items-center">
                <p id="main-title" className="p-0 m-0">Turnirlar</p>
            </div>
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
            <hr/>
            <div className="contests-body">
                {contests
                    ? contests.map((contest, index) => {
                        const registeredUsersArr: IUser[] = [];
                        contest.users.map((usr) => {
                            const registeredUsers = users.find(
                                (user) => user.id === usr
                            );
                            if (registeredUsers) {
                                registeredUsersArr.push(registeredUsers);
                            }
                        });

                        const registerBtn: HTMLButtonElement | null = document.querySelector(".contest-register-btn")


                        const handleRegisterToContest = async () => {
                            try {
                                await axios.patch(
                                    `https://f7f2aac439c74f02.mokky.dev/contests/${contest.id}`,
                                    {
                                        ...contest,
                                        users: [
                                            ...contest.users, getUser.id
                                        ]
                                    }
                                );
                                toast.success(`Ro'yxatdan o'tdingiz !`, {
                                    position: "top-right",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "dark",
                                });
                            } catch (error) {
                                console.log(error)
                            }
                        }

                        if (registerBtn) {
                            registerBtn.addEventListener("click", handleRegisterToContest);
                        }

                        return (
                            <Accordion
                                className={`contest-item alert alert-${generateTheme(
                                    contest.status
                                )} `}
                                key={contest.id}
                            >
                                <AccordionSummary
                                    expandIcon={<GridExpandMoreIcon/>}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <div
                                        style={{width: "96%"}}
                                        className="d-flex justify-content-between align-items-center accordion-head"
                                    >
                                        <h2 className="fs-4 fw-bold p-0 m-0">
                                            {index + 1}) {contest.name}
                                        </h2>
                                        <div className="right d-flex gap-3">
                                            <button data-id={contest.id} onClick={handleRegisterToContest}
                                                    className={`btn contest-register-btn contest-register-btn-${contest.id} btn-outlined-${generateTheme(contest.status)}`}>Ro'yxatdan
                                                o'tish
                                            </button>
                                            <div
                                                className={`alert m-0 p-1 d-flex justify-content-center align-items-center alert-${generateTheme(
                                                    contest.status
                                                )}`}
                                            >
                                                {generateStatus(contest.status)}
                                            </div>
                                        </div>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div
                                        style={{minHeight: "200px"}}
                                        className="contest-body"
                                    >
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="contest-passport">
                                                    <table className="table table-bordered">
                                                        <tbody>
                                                        <tr>
                                                            <td>Nomi</td>
                                                            <td>
                                                                {
                                                                    contest.name
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Boshlanish vaqti:
                                                            </td>
                                                            <td>
                                                                {
                                                                    contest.startDate
                                                                }{" "}
                                                                |{" "}
                                                                {
                                                                    contest.startTime
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Tugash vaqti:
                                                            </td>
                                                            <td>
                                                                {
                                                                    contest.finishDate
                                                                }{" "}
                                                                |{" "}
                                                                {
                                                                    contest.finishTime
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Vazifalar soni
                                                            </td>
                                                            <td>
                                                                {
                                                                    contest
                                                                        .tasks
                                                                        .length
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Qatnashuvchilar soni
                                                            </td>
                                                            <td>
                                                                {
                                                                    contest
                                                                        .users
                                                                        .length
                                                                }
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            {contest.status === "started" ||
                                            contest.status === "finished" ? (
                                                <div className="col-md-6">
                                                    <div className="tasks-selection">
                                                        <h3>
                                                            Selected tasks
                                                        </h3>
                                                    </div>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            <div className="col-md-6 registered-users">
                                                <h3>Qatnashuvchilar ({registeredUsersArr.length}):</h3>
                                                <div className="users-list d-flex flex-wrap gap-2">
                                                    {registeredUsersArr.map((user) => {
                                                        return (
                                                            <p key={user.id}
                                                               className="py-1 px-3 rounded-5  user-item bg-body-tertiary">
                                                                {user.name}
                                                            </p>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        )
                    }) : ""}
            </div>
        </section>
    );
}

export default Contests;