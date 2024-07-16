import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const useLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const checkLogin = async () => {
        const tokenStr = localStorage.getItem("token");

        if (tokenStr) {
            const token = JSON.parse(tokenStr);
            try {
                const res = await axios.get(`https://f7f2aac439c74f02.mokky.dev/userDetails?email=${token.email}&password=${token.password}`);
                const user = res.data[0];
                localStorage.setItem("token", JSON.stringify(user));
                if (token && user && token.email === user.email) {
                    if (location.pathname === "/login") navigate("/")
                    if (user.role === "admin") {

                        toast.success(`Xush kelibsiz admin !`, {
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
                        if (location.pathname.startsWith("/admin")) navigate("/")
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
                    }
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