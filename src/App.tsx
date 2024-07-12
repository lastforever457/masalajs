import {Route, Routes} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Task from "./pages/Task";
import TaskPage from "./pages/TaskPage";
import {useEffect, useState} from "react";
import useLogin from "./Functions/UseLogin.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Leaderboard from "./pages/Leaderboard.tsx";
import Admin from "./pages/Admin/Admin.tsx";

interface IUser {
    name: string;
    email: string;
    password: string;
    role: string;
    id: number;
    results: { [key: number]: boolean };
}

const App = () => {

    const {checkLogin} = useLogin();
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);

    useEffect(() => {
        checkLogin();

        const getCurrentUser = localStorage.getItem("token");
        if (getCurrentUser) {
            setCurrentUser(JSON.parse(getCurrentUser));
        }
    }, [])
    return (
        <div>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/tasks" element={<TaskPage/>}/>
                <Route path="/tasks/task" element={<Task/>}/>
                <Route path="/leaderboard" element={<Leaderboard/>}/>
                {currentUser && currentUser.role === "admin"
                    ? <Route path="*" element={<Admin/>}/>
                    : <Route path="*" element={<Home/>}/>}
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
        ;
};

export default App;