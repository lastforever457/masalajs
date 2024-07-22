import {Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import {GridExpandMoreIcon} from "@mui/x-data-grid";
import {IContest, IUser} from "../../Functions/interface.ts";

interface IBoshlandiProps {
    contest: IContest;
    registeredUsersArr: IUser[];
    index: number;
}

function Boshlandi(props: IBoshlandiProps) {
    return (
        <Accordion
            className="contest-item alert alert-success"
            key={props.index}
        >
            <AccordionSummary
                expandIcon={<GridExpandMoreIcon/>}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <div
                    style={{width: "96%"}}
                    className="d-flex justify-content-between align-items-center accordion-head"
                >
                    <h2 className="fs-4 fw-bold p-0 m-0">
                        {props.index + 1}) {props.contest.name}
                    </h2>
                    <div
                        className={`alert m-0 p-1 d-flex justify-content-center align-items-center alert-success`}
                    >
                        Boshlandi
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
                        {props.contest.status === "Boshlandi" ||
                        props.contest.status === "Tugadi" ? (
                            <div className="col-sm-6 col-md-4 col-lg-3">
                                <div className="tasks-selection">
                                    <h3>
                                        Selected tasks
                                    </h3>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        <div className="col-sm-6 col-md-4 col-lg-3">
                            <div className="registered-users d-flex">
                                <h3>Registered users</h3>
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

export default Boshlandi;