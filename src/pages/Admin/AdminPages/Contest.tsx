import {BiPlus} from "react-icons/bi";
import DatePicker from "react-datepicker";
import {useState} from "react";
import "react-datepicker/dist/react-datepicker.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    backgroundColor: '#303041',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Contest() {
    const [startDate, setStartDate] = useState(new Date());
    const [startTime, setStartTime] = useState("");
    const [finishDate, setFinishDate] = useState(new Date());
    const [finishTime, setFinishTime] = useState("");
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="px-5 py-3">
            <div className="departments-header d-flex justify-content-between align-items-center">
                <h2>Contest</h2>
                <Button variant="contained" onClick={handleOpen} className=""><BiPlus/>Yaratish</Button>
            </div>
            <hr/>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" className="mb-4" component="h2">
                        Yangi turnir e'lon qilish
                    </Typography>
                    <hr/>
                    <form name="newContestForm" id="newContestForm">
                        <div className="my-3">
                            <label htmlFor="newContestName">Turnir nomi</label>
                            <input type="text" className="form-control mt-2" id="newContestName"/>
                        </div>
                        <div className="my-3 d-flex justify-content-start align-items-center gap-2">
                            <label htmlFor="newContestStartDate">Boshlanish sanasi</label>
                            <DatePicker
                                className="form-control mt-2"
                                selected={startDate}
                                onChange={(date) => date ? setStartDate(date) : null}
                                dateFormat="MM/dd/yyyy"
                            />
                        </div>
                        <div className="my-3 d-flex justify-content-start align-items-center gap-2">
                            <label htmlFor="newContestStartTime">Boshlanish vaqti</label>
                            <input
                                type="time"
                                className="form-control w-50"
                                id="newContestStartTime"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                            />
                        </div>
                        <div className="my-3 d-flex justify-content-start align-items-center gap-2">
                            <label htmlFor="newContestFinishDate">Tugash sanasi</label>
                            <DatePicker
                                className="form-control"
                                selected={finishDate}
                                onChange={(date) => date ? setFinishDate(date) : null}
                                dateFormat="MM/dd/yyyy"
                            />
                        </div>
                        <div className="my-3">
                            <label htmlFor="newContestFinishTime">Tugash vaqti</label>
                            <input
                                type="time"
                                className="form-control mt-2"
                                id="newContestFinishTime"
                                value={finishTime}
                                onChange={(e) => setFinishTime(e.target.value)}
                            />
                        </div>
                    </form>
                    <hr/>
                    <div className="input-group d-flex justify-content-end align-items-center">
                        <button onClick={handleClose} className="btn btn-dark">Bekor qilish</button>
                        <button className="btn btn-primary">Yaratish</button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default Contest;
