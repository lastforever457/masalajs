import {useState} from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import {Outlet} from "react-router-dom";

export default function App() {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };


    return (
        <div id="admin">
            <Navbar toggleDrawer={toggleDrawer}/>
            <Sidebar open={open} toggleDrawer={toggleDrawer}/>

            <Outlet/>
        </div>
    );
}
