import axios from "axios";
import {toast} from "react-toastify";
import {IUser} from "./interface.ts";

export const handleSendMessage = async (text: string, users: IUser[]) => {

    if (text && users) {
        const userIds: {
            id: number
        }[] = Array.from(users).map(user => ({"id": Number(user.id)}));

        const sendingData = {
            text: text,
            users: userIds,
            color: "success",
            date: new Date().toLocaleString()
        };

        console.log(sendingData)

        try {
            await axios.post("https://f7f2aac439c74f02.mokky.dev/notifications", sendingData);
            toast.success(`Xabar yuborildi !`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            toast.error(`Xatolik yuz berdi !`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            console.error(error);
        }
    }
};