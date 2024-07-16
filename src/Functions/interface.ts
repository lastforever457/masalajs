export interface IGenerateAva{
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
    results?: { [key: string]: boolean };
    avatar: string;
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