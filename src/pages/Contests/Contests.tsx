import {IContest, IUser} from "../../Functions/interface.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import useCheckContest from "../../Functions/UseCheckContest.tsx";
import Boshlandi from "./Boshlandi.tsx";
import Tugadi from "./Tugadi.tsx";
import Registering from "./Registering.tsx";

function Contests() {
    const [contests, setContests] = useState<IContest[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    const {checkContest} = useCheckContest();

    useEffect(() => {
        checkContest();
    }, [checkContest]);

    useEffect(() => {
        const fetchContests = async () => {
            try {
                const res = await axios.get<IContest[]>(
                    "https://f7f2aac439c74f02.mokky.dev/contests"
                );
                const resUsers = await axios.get(
                    "https://f7f2aac439c74f02.mokky.dev/userDetails"
                );
                setContests(res.data);
                setUsers(resUsers.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchContests();
    }, []);

    const breadcrumbs = [
        <Link className="fs-4 text-secondary text-decoration-none" key="1" color="inherit" to="/">
            Bosh sahifa
        </Link>,
        <Typography className="fs-5 text-light" key="2">
            Turnirlar
        </Typography>
    ]

    return (
        <section id="home" className="container py-3">
            <div className="home-header d-flex justify-content-between align-items-center">
                <p id="main-title" className="p-0 m-0">Turnirlar</p>
            </div>
            <p className="fs-5 text-secondary">
                JavaScript dasturlash tiliga oid turli qiyinlikdagi masalalar
            </p>
            <hr className="text-secondary"/>

            <div className="breadcrumb1">
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small"/>}
                    aria-label="breadcrumb"
                    className="my-3"
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </div>
            <hr/>
            <div className="contests-body">
                {contests?.map((contest, index) => {
                    const registeredUsersArr: IUser[] = users.filter(({id}) => contest.users.includes(id));
                    if (contest.status === "Boshlandi") {
                        return (
                            <Boshlandi key={contest.id} contest={contest} registeredUsersArr={registeredUsersArr}
                                       index={index}/>
                        )
                    } else if (contest.status === "Tugadi") {
                        return (
                            <Tugadi key={contest.id} contest={contest} registeredUsersArr={registeredUsersArr}
                                    index={index}/>
                        )
                    } else if (contest.status === "Registering") {
                        return (
                            <Registering key={contest.id} contest={contest} registeredUsersArr={registeredUsersArr}
                                         index={index}/>
                        )
                    }

                })}
            </div>
        </section>
    );
}

export default Contests;