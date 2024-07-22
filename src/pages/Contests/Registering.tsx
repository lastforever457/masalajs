import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {GridExpandMoreIcon} from "@mui/x-data-grid";
import {IContest, IUser} from "../../Functions/interface.ts";

interface IBoshlandiProps {
    contest: IContest;
    registeredUsersArr: IUser[];
    index: number;
}

function Registering(props: IBoshlandiProps) {
    const handleJoinContest = () => {
        console.log(props.contest)
    }
    return (
        <Accordion
            className="contest-item alert alert-warning"
            key={props.index}
        >
            <AccordionSummary
                expandIcon={<GridExpandMoreIcon/>}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <div
                    style={{width: "96%"}}
                    className="row align-items-center accordion-head d-flex justify-content-between gap-sm-4"
                >
                    <div className="col-sm-6">
                        <h2 className="fs-4 fw-bold p-0 m-0">
                            {props.index + 1}) {props.contest.name}
                        </h2>
                    </div>
                    <div className="actions col-sm-6 d-flex justify-content-end align-items-center gap-3">
                        <button onClick={handleJoinContest}
                                className="contest-register-btn m-0 px-4 rounded-3 py-1">Qo'shilish
                        </button>
                        <div
                            className={`alert m-0 p-1 d-flex justify-content-center align-items-center alert-warning`}
                        >
                            Ro'yxatdan o'tilmoqda
                        </div>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <div
                    style={{minHeight: "200px"}}
                    className="contest-body"
                >
                    <div className="row">
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="contest-passport">
                                <table className="table table-bordered">
                                    <tbody>
                                    <tr>
                                        <td>Nomi</td>
                                        <td>
                                            {
                                                props.contest.name
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Boshlanish vaqti:
                                        </td>
                                        <td>
                                            {
                                                props.contest.startDate
                                            }{" "}
                                            |{" "}
                                            {
                                                props.contest.startTime
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Tugash vaqti:
                                        </td>
                                        <td>
                                            {
                                                props.contest.finishDate
                                            }{" "}
                                            |{" "}
                                            {
                                                props.contest.finishTime
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Topshiriqlar soni
                                        </td>
                                        <td>
                                            {
                                                props.contest
                                                    .tasks
                                                    .length
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Qatnashuvchilar soni
                                        </td>
                                        <td>
                                            {
                                                props.contest
                                                    .users
                                                    .length
                                            }
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="registered-users d-flex">
                                <h3>Ro'yxatdan o'tganlar</h3>
                                <div className="users-list">
                                    <ul className="list-group list-group-flush bg-transparent">
                                        {props.registeredUsersArr.map(
                                            (user) => {
                                                return (
                                                    <li
                                                        key={
                                                            user.id
                                                        }
                                                        className="list-group-item"
                                                    >
                                                        {
                                                            user.name
                                                        }
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AccordionDetails>
        </Accordion>
    );
}

export default Registering;