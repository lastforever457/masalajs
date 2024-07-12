import {Tab} from "@mui/base/Tab";
import {TabPanel} from "@mui/base/TabPanel";
import {Tabs} from "@mui/base/Tabs";
import {TabsList} from "@mui/base/TabsList";
import axios from "axios";
import {MouseEvent} from "react";
import useLogin from "../Functions/UseLogin.tsx";
import {toast} from "react-toastify";


function Login() {
    const {checkLogin} = useLogin();

    const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const loginForm: HTMLFormElement | null = document.querySelector("#login-form");
            if (loginForm) {
                const email = loginForm.email.value;
                const password = loginForm.password.value;
                const res = await axios.get(`https://f7f2aac439c74f02.mokky.dev/userDetails?email=${email}&password=${password}`);
                if (res.data.length > 0) {
                    localStorage.setItem("token", JSON.stringify(res.data[0]));
                    await checkLogin();
                } else {
                    toast.error('Login yoki parol xato !', {
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
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleRegister = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const registerForm: HTMLFormElement | null = document.querySelector("#register-form");
            if (registerForm) {
                const newUser = {
                    name: registerForm.firstName.value,
                    email: registerForm.email.value,
                    password: registerForm.password.value,
                    role: "user"
                }
                const res = await axios.get(`https://f7f2aac439c74f02.mokky.dev/userDetails?email=${newUser.email}`);
                if (res.data.length == 0) {
                    const resRegister = await axios.post("https://f7f2aac439c74f02.mokky.dev/userDetails", newUser);
                    localStorage.setItem("token", JSON.stringify(resRegister.data));
                    await checkLogin();
                } else {
                    toast.error('Bunday foydalanuvchi tizimda mavjud !', {
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
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <section id="login" className="container py-3">
            <p id="main-title" className="p-0 m-0">
                masala.js
            </p>
            <p className="fs-5 text-secondary">
                JavaScript dasturlash tiliga oid turli qiyinlikdagi masalalar
            </p>
            <hr className="text-secondary"/>
            <Tabs defaultValue={0}>
                <TabsList className="d-flex gap-3">
                    <Tab className="login-tab px-3" value={0}>
                        Kirish
                    </Tab>
                    <Tab className="login-tab px-3" value={1}>
                        Ro'yxatdan o'tish
                    </Tab>
                </TabsList>
                <TabPanel value={0}>
                    <div className="login-body py-5">
                        <h3 className="text-light pb-3">Tizimga kiring</h3>
                        <form id="login-form" className="col-md-6 col-lg-4">
                            <div className="my-2">
                                <label
                                    className="form-label text-light"
                                    htmlFor="email"
                                >
                                    Elektron pochta
                                </label>
                                <input
                                    className="form-control"
                                    type="email"
                                    id="email"
                                    name="email"
                                />
                            </div>
                            <div className="my-2">
                                <label
                                    className="form-label text-light"
                                    htmlFor="password"
                                >
                                    Parol
                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                    id="password"
                                    name="password"
                                />
                            </div>
                            <div className="my-4">
                                <button onClick={handleLogin} className="px-5 btn btn-outline-light">Kirish</button>
                            </div>
                        </form>
                    </div>
                </TabPanel>
                <TabPanel value={1}>
                    <div className="register-body py-5">
                        <h3 className="text-light pb-3">Ro'yxatdan o'ting</h3>
                        <form id="register-form" className="col-md-6 col-lg-4">
                            <div className="my-2">
                                <label
                                    className="form-label text-light"
                                    htmlFor="name"
                                >
                                    Ism
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="name"
                                    name="firstName"
                                />
                            </div>
                            <div className="my-2">
                                <label
                                    className="form-label text-light"
                                    htmlFor="email"
                                >
                                    Elektron pochta
                                </label>
                                <input
                                    className="form-control"
                                    type="email"
                                    id="email"
                                    name="email"
                                />
                            </div>
                            <div className="my-2">
                                <label
                                    className="form-label text-light"
                                    htmlFor="password"
                                >
                                    Parol
                                </label>
                                <input
                                    className="form-control"
                                    type="password"
                                    id="password"
                                    name="password"
                                />
                            </div>
                            <div className="my-4">
                                <button onClick={handleRegister} className="px-3 btn btn-outline-light">Ro'yxatdan o'tish</button>
                            </div>
                        </form>
                    </div>
                </TabPanel>
            </Tabs>
        </section>
    )
        ;
}

export default Login;
