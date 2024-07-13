import {useEffect, useState} from "react";
import axios from "axios";

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

function Users() {
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

    return (
        <div className="px-5 py-3">
            <div className="departments-header d-flex justify-content-between align-items-center">
                <h2>Users</h2>
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
        </div>
    );
}

export default Users;
