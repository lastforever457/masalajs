import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {ImExit} from "react-icons/im";
import useLogin from "../../Functions/UseLogin.tsx";

interface NavbarProps {
    toggleDrawer: (newOpen: boolean) => () => void;
}

export default function Navbar({toggleDrawer}: NavbarProps) {
    const {checkLogin} = useLogin();
    const logout = async () => {
        localStorage.removeItem("token");
        await checkLogin();
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" style={{backgroundColor: '#303041'}}>
                <Toolbar className="d-flex justify-content-between align-items-center">
                    <div className="admin-header-left d-flex justify-content-center align-items-center">
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Admin Page
                        </Typography>
                    </div>
                    <div className="admin-header-right">
                        <button onClick={logout} className="btn text-light fs-5"><ImExit/></button>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
