import {useState} from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import {Route, Routes} from "react-router-dom";
import Departments from "./AdminPages/Departments.tsx";

export default function App() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <div id="admin">
            <Navbar toggleDrawer={toggleDrawer}/>
            <Sidebar open={open} toggleDrawer={toggleDrawer}/>

            <Routes>
                <Route path="/admin/departments" element={<Departments/>}/>
            </Routes>
        </div>
    );
}
