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
import Leaderboard from "./pages/Leaderboard.tsx";
import Admin from "./pages/Admin/Admin.tsx";
import {CssBaseline} from "@mui/material";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import Departments from "./pages/Admin/AdminPages/Departments.tsx";
import Tasks from "./pages/Admin/AdminPages/Tasks.tsx";
import Users from "./pages/Admin/AdminPages/Users.tsx";
import Contest from "./pages/Admin/AdminPages/Contest.tsx";
import Contests from "./pages/Contests/Contests.tsx";

const App = () => {

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const {checkLogin} = useLogin();

    useEffect(() => {
        checkLogin();
    }, [])
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/tasks" element={<TaskPage/>}/>
                <Route path="/tasks/task" element={<Task/>}/>
                <Route path="/leaderboard" element={<Leaderboard/>}/>
                <Route path="/contests" element={<Contests/>}/>
                <Route path="/admin" element={<Admin/>}>
                    <Route path="users" element={<Users/>}/>
                    <Route path="tasks" element={<Tasks/>}/>
                    <Route path="departments" element={<Departments/>}/>
                    <Route path="contest" element={<Contest/>}/>
                </Route>

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
        </ThemeProvider>

    )
        ;
};

export default App;