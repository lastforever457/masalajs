import axios from "axios";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const useLogin = () => {
    const navigate = useNavigate();

    const checkLogin = async () => {
        const tokenStr = localStorage.getItem("token");
        if (tokenStr) {
            const token = JSON.parse(tokenStr);
            console.log(token);
            try {
                const res = await axios.get(`https://f7f2aac439c74f02.mokky.dev/userDetails?email=${token.email}&password=${token.password}`);
                const user = res.data[0];
                if (token && user && token.email === user.email) {
                    navigate("/");
                    toast.success(`Xush kelibsiz ${user.name} !`, {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                } else {
                    toast.warning('Tizimga kiring !', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    navigate("/login");
                }
            } catch (error) {
                toast.warning('Tizimga kiring !', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                navigate("/login");
            }
        } else {
            navigate("/login");
            toast.warning('Tizimga kiring !', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    return {checkLogin};
};

export default useLogin;