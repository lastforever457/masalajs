export const generateTheme = (status: string) => {
    if (status === "active") {
        return "success";
    } else if (status === "finished") {
        return "secondary";
    } else if (status === "registering") {
        return "warning";
    }
};

export const generateStatus = (status: string) => {
    if (status === "Boshlandi") {
        return "Boshlandi";
    } else if (status === "Tugadi") {
        return "Tugadi";
    } else if (status === "Registering") {
        return "Tez orada boshlanadi";
    }
};