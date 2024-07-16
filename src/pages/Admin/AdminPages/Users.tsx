import {FormEvent, useEffect, useState} from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {toast} from "react-toastify";

interface IUser {
    name: string;
    email: string;
    password: string;
    role: string;
    id: number;
    results?: { [key: string]: boolean };
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "80%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Users() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [tasks, setTasks] = useState<ITask[] | null>(null);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetchUsersAndTasks = async () => {
            try {
                const resUsers = await axios.get("https://f7f2aac439c74f02.mokky.dev/userDetails");
                const resTasks = await axios.get("https://f7f2aac439c74f02.mokky.dev/tasks");
                setUsers(resUsers.data);
                setTasks(resTasks.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsersAndTasks();
    }, []);

    const sortedUsers = [...users].sort((a, b) => {
        const aSolved = a.results ? Object.keys(a.results).length : 0;
        const bSolved = b.results ? Object.keys(b.results).length : 0;
        return bSolved - aSolved;
    });

    const ranks = (num: number) => {
        switch (num) {
            case 1:
                return "🥇"
            case 2:
                return "🥈"
            case 3:
                return "🥉"
        }
    }

    const selectAllUsers = async () => {
        const formData: HTMLFormElement | null = document.querySelector("#userSendMessageForm");
        if (formData) {
            const inputs: NodeListOf<HTMLInputElement> = formData.querySelectorAll("input[type='checkbox']");
            console.log(inputs);

            if (inputs.length > 0 && inputs[0].checked) {
                inputs.forEach(input => {
                    input.checked = true;
                });
            } else {
                inputs.forEach(input => {
                    input.checked = false;
                });
            }

            const form = new FormData(formData);
            const data = Array.from(form.entries());
            console.log(data);
        }
    };

    const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData: HTMLFormElement | null = document.querySelector("#userSendMessageForm");
        const message: HTMLTextAreaElement | null = document.querySelector("#send-message-textarea");

        if (formData && message) {
            const checkedCheckboxes: NodeListOf<HTMLInputElement> = formData.querySelectorAll("input[type='checkbox']:checked");
            const userIds: {
                id: number
            }[] = Array.from(checkedCheckboxes).map(checkbox => ({"id": Number(checkbox.value)}));

            const sendingData = {
                text: message.value,
                users: userIds,
                color: "primary",
                date: new Date().toLocaleString()
            };

            try {
                await axios.post("https://f7f2aac439c74f02.mokky.dev/notifications", sendingData);
                toast.success(`Xabar yuborildi !`, {
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
                toast.error(`Xatolik yuz berdi !`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                console.error(error);
            }
        }
    };

    return (
        <div className="px-5 py-3">
            <div className="users-header d-flex justify-content-between align-items-center">
                <h2>Users</h2>
                <div className="users-right">
                    <Button onClick={handleOpen} variant="contained" color="primary">Xabar yuborish</Button>
                </div>
            </div>
            <hr/>
            <table className="table table-responsive text-center">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
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
                            <td>{user.name}</td>
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Foydalanuvchilarga xabar yuborish
                    </Typography>
                    <hr/>
                    <div id="users-checkbox-list" className="my-3">
                        <form name="userSendMessageForm" id="userSendMessageForm">
                            <div className="user-checkbox mx-2 d-flex justify-content-center align-items-center gap-1">
                                <input onChange={selectAllUsers} className="form-check" type="checkbox"
                                       id={`user-checkbox-all`}
                                       name="user-checkbox"
                                       value="all"/>
                                <label className="form-check-label" htmlFor={`user-checkbox-all`}>Hamma</label>
                            </div>
                            {users.map((user: IUser) => (
                                <div key={user.id}
                                     className="user-checkbox mx-2 d-flex justify-content-center align-items-center gap-1">
                                    <input className="form-check" type="checkbox" id={`user-checkbox-${user.id}`}
                                           name="user-checkbox"
                                           value={user.id}/>
                                    <label className="form-check-label"
                                           htmlFor={`user-checkbox-${user.id}`}>{user.name}</label>
                                </div>
                            ))}
                        </form>
                    </div>
                    <div className="message-to-user">
                        <textarea className="form-control" placeholder="Xabar matnini kiriting"
                                  id="send-message-textarea"
                                  style={{height: "100px"}}></textarea>
                    </div>
                    <hr/>
                    <div className="action-buttons input-group d-flex gap-1">
                        <button className="btn btn-dark">Bekor qilish</button>
                        {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                        {/*@ts-ignore*/}
                        <button className="btn btn-dark" onClick={handleSendMessage}>Yuborish</button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default Users;
