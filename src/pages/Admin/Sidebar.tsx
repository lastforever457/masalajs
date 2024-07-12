import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import PeopleIcon from '@mui/icons-material/People';
import FolderIcon from '@mui/icons-material/Folder';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {Link} from "react-router-dom";

interface TemporaryDrawerProps {
    open: boolean;
    toggleDrawer: (newOpen: boolean) => () => void;
}

export default function Sidebar({open, toggleDrawer}: TemporaryDrawerProps) {
    return (
        <Drawer open={open} onClose={toggleDrawer(false)}>
            <Box sx={{width: 250, height: "100%", color: "#fff", backgroundColor: "#303041"}} role="presentation"
                 onClick={toggleDrawer(false)}>
                <Typography variant="h6" component="div" sx={{flexGrow: 1, padding: 2}}>
                    Admin Menu
                </Typography>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon sx={{color: "#fff"}}>
                                <PeopleIcon/>
                            </ListItemIcon>
                            <Link to="/admin" className="text-decoration-none text-light">
                                <ListItemText primary="Users"/>
                            </Link>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon sx={{color: "#fff"}}>
                                <FolderIcon/>
                            </ListItemIcon>
                            <Link to="/admin/departments" className="text-decoration-none text-light">
                                <ListItemText primary="Departments"/>
                            </Link>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon sx={{color: "#fff"}}>
                                <AssignmentIcon/>
                            </ListItemIcon>
                            <Link to="/admin" className="text-decoration-none text-light">
                                <ListItemText primary="Tasks"/>
                            </Link>
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon sx={{color: "#fff"}}>
                                <EmojiEventsIcon/>
                            </ListItemIcon>
                            <Link to="/admin" className="text-decoration-none text-light">
                                <ListItemText primary="Contests"/>
                            </Link>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}
