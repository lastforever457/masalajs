export interface IGenerateAva {
    width: number;
    height: number;
    name: string;
    background: string;
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: string;
    id: number;
    notifications: INotification[];
    results: { [key: string]: boolean };
    avatar: string
}

export interface ITask {
    id: number;
    departmentId: number;
    text: string;
    examples: string[];
    fun_name: string;
    solved: boolean;
    check: string[];
    answers: number[];
}

export interface INotification {
    id: number;
    text: string;
    color: "primary" | "secondary" | "success" | "info" | "warning" | "error" | "danger" | "light" | "dark";
    users: { id: number };
    date: string;
}

export interface IDepartment {
    id: number;
    title: string;
}

export interface IContest {
    id: number;
    name: string;
    startDate: string;
    startTime: string;
    finishDate: string;
    finishTime: string;
    status: "Registering" | "Boshlandi" | "Tugadi";
    users: number[];
    tasks: number[];
    winner: number;
}