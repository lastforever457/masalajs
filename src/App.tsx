import {Route, Routes} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Task from "./pages/Task";
import TaskPage from "./pages/TaskPage";
import {useEffect} from "react";
import useLogin from "./Functions/UseLogin.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

    const {checkLogin} = useLogin();

    useEffect(() => {
        checkLogin();
    }, [])
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/tasks" element={<TaskPage/>}/>
                <Route path="/tasks/task" element={<Task/>}/>
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
    );
};

export default App;