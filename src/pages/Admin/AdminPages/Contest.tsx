import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import Button from "@mui/material/Button";
import {GridExpandMoreIcon} from "@mui/x-data-grid";
import axios from "axios";
import {useEffect, useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import {BiPlus} from "react-icons/bi";
import {IContest, ITask, IUser} from "../../../Functions/interface.ts";
import {handleSendMessage} from "../../../Functions/sendNotification.ts";
import {generateStatus, generateTheme} from "../../../Functions/functions.tsx";

function Contest() {
    const [contests, setContests] = useState<IContest[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [selectTasks, setSelectTasks] = useState<ITask[]>([]);

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const res = await axios.get<IContest[]>(
                    "https://f7f2aac439c74f02.mokky.dev/contests"
                );
                const resUsers = await axios.get(
                    "https://f7f2aac439c74f02.mokky.dev/userDetails"
                );
                const resTasks = await axios.get(
                    "https://f7f2aac439c74f02.mokky.dev/tasks"
                );
                setContests(res.data);
                setUsers(resUsers.data);
                setTasks(resTasks.data);
                setSelectTasks(resTasks.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchContests();
    }, []);



    const handleSearchTask = () => {
        const searchInput =
            document.querySelector<HTMLInputElement>("#search-task-input");
        if (searchInput) {
            const selectedTasks = tasks.filter((task) =>
                task.fun_name
                    .toLowerCase()
                    .includes(searchInput.value.toLowerCase() ?? "")
            );
            const sortedSelectedTasks = selectedTasks.sort((a, b) =>
                a.fun_name.localeCompare(b.fun_name)
            );
            setSelectTasks(sortedSelectedTasks);
        }
    };

    const handleCreateContest = async () => {
        const newContestForm =
            document.querySelector<HTMLFormElement>("#newContestForm");
        const getContestTasksSelectForm: HTMLFormElement | null =
            document.querySelector("#contestTasksSelectForm");
        const checkedValues: string[] = [];

        if (getContestTasksSelectForm) {
            const formData = new FormData(getContestTasksSelectForm);

            formData.forEach((value) => {
                checkedValues.push(value as string);
            });
        }

        if (newContestForm) {
            const formData = new FormData(newContestForm);
            const data = {
                name: formData.get("contestName"),
                startDate: formData.get("contestStartDate"),
                startTime: formData.get("contestStartTime"),
                finishDate: formData.get("contestFinishDate"),
                finishTime: formData.get("contestFinishTime"),
                status: "registering",
                tasks: checkedValues,
                users: [],
            };
            try {
                await axios.post(
                    "https://f7f2aac439c74f02.mokky.dev/contests",
                    data
                );
                handleSendMessage(`Yangi turnir e'lon qilindi (${data.name})`, users);
                console.log(data);
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <div className="px-5 py-3">
            <div className="contests-header d-flex justify-content-between items-center">
                <h2>Contest</h2>
                <Button
                    variant="contained"
                    data-bs-target="#createContestModal"
                    data-bs-toggle="modal"
                    className=""
                >
                    <BiPlus/>
                    Yaratish
                </Button>
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

                        return (
                            <Accordion
                                className={`contest-item alert alert-${generateTheme(
                                    contest.status
                                )} `}
                                key={index}
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
                                        <div
                                            className={`alert m-0 p-1 d-flex justify-content-center align-items-center alert-${generateTheme(
                                                contest.status
                                            )}`}
                                        >
                                            {generateStatus(contest.status)}
                                        </div>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div
                                        style={{minHeight: "200px"}}
                                        className="contest-body"
                                    >
                                        <div className="row">
                                            <div className="col-sm-6 col-md-4 col-lg-3">
                                                <div className="contest-passport">
                                                    <table className="table table-bordered">
                                                        <tbody>
                                                        <tr>
                                                            <td>Name</td>
                                                            <td>
                                                                {
                                                                    contest.name
                                                                }
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                Start:
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
                                                                Finish:
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
                                                                Selected
                                                                tasks
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
                                                                Registered
                                                                users
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
                                            {contest.status === "Boshlandi" ||
                                            contest.status === "Tugadi" ? (
                                                <div className="col-sm-6 col-md-4 col-lg-3">
                                                    <div className="tasks-selection">
                                                        <h3>
                                                            Selected tasks
                                                        </h3>
                                                    </div>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            <div className="col-sm-6 col-md-4 col-lg-3">
                                                <div className="registered-users d-flex">
                                                    <h3>Registered users</h3>
                                                    <div className="users-list">
                                                        <ul className="list-group list-group-flush bg-transparent">
                                                            {registeredUsersArr.map(
                                                                (user) => {
                                                                    return (
                                                                        <li
                                                                            key={
                                                                                user.id
                                                                            }
                                                                            className="list-group-item"
                                                                        >
                                                                            {
                                                                                user.name
                                                                            }
                                                                        </li>
                                                                    );
                                                                }
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        );
                    })
                    : ""}
            </div>
            <div
                className="modal fade modal-xl"
                id="createContestModal"
                tabIndex={-1}
                aria-labelledby="createContestModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1
                                className="modal-title fs-5"
                                id="createContestModalLabel"
                            >
                                Yangi turnir e'lon qilish
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="contest-form">
                                        <h4>Turnir ma'lumotlarini kiriting</h4>
                                        <form
                                            name="newContestForm"
                                            id="newContestForm"
                                        >
                                            <div className="my-3">
                                                <label htmlFor="newContestName">
                                                    Turnir nomi
                                                </label>
                                                <input
                                                    name="contestName"
                                                    type="text"
                                                    className="form-control mt-2"
                                                    id="newContestName"
                                                />
                                            </div>
                                            <div className="my-3 flex justify-start items-center gap-2">
                                                <label htmlFor="newContestStartDate">
                                                    Boshlanish sanasi
                                                </label>
                                                <input
                                                    id="contestStartDate"
                                                    name="contestStartDate"
                                                    className="form-control mt-2"
                                                    type="date"
                                                />
                                            </div>
                                            <div className="my-3 d-flex justify-content-start align-items-center gap-2">
                                                <label htmlFor="newContestStartTime">
                                                    Boshlanish vaqti
                                                </label>
                                                <input
                                                    name="contestStartTime"
                                                    type="time"
                                                    className="form-control w-50"
                                                    id="newContestStartTime"
                                                />
                                            </div>
                                            <div className="my-3 d-flex justify-content-start align-items-center gap-2">
                                                <label htmlFor="newContestFinishDate">
                                                    Tugash sanasi
                                                </label>
                                                <input
                                                    id="contestFinishDate"
                                                    name="contestFinishDate"
                                                    className="form-control"
                                                    type="date"
                                                />
                                            </div>
                                            <div className="my-3">
                                                <label htmlFor="newContestFinishTime">
                                                    Tugash vaqti
                                                </label>
                                                <input
                                                    type="time"
                                                    name="contestFinishTime"
                                                    className="form-control mt-2"
                                                    id="newContestFinishTime"
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="newContestTasks">
                                        <h4>Turnir testlarini tanlang</h4>
                                        <div className="my-2 d-flex justify-content-start gap-3 align-items-center">
                                            <label htmlFor="search-task-input">
                                                Qidirish:
                                            </label>
                                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                                            {/* @ts-ignore*/}
                                            <input
                                                onChange={handleSearchTask}
                                                name="search-task-input"
                                                type="search"
                                                placeholder="Search"
                                                id="search-task-input"
                                                className="form-control"
                                            />
                                        </div>
                                        <form id="contestTasksSelectForm">
                                            <ul className="list-group list-group-flush">
                                                {selectTasks.map((task) => (
                                                    <li
                                                        key={task.id}
                                                        className="list-group-item"
                                                    >
                                                        <div className="d-flex start align-items-center">
                                                            <div
                                                                className="d-flex justify-content-start align-items-center gap-2">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input me-2"
                                                                    value={
                                                                        task.id
                                                                    }
                                                                    id={task.id.toString()}
                                                                    name="contestTasks"
                                                                />
                                                                <label
                                                                    htmlFor={task.id.toString()}
                                                                >
                                                                    {
                                                                        task.fun_name
                                                                    }
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="input-group d-flex justify-content-end align-items-center">
                                <button
                                    data-bs-dismiss="modal"
                                    className="btn btn-secondary"
                                >
                                    Bekor qilish
                                </button>
                                <button
                                    onClick={handleCreateContest}
                                    className="btn btn-primary"
                                >
                                    Yaratish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contest;
