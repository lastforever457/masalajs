export const generateTheme = (status: string) => {
    if (status === "Boshlandi") {
        return "success";
    } else if (status === "Tugadi") {
        return "danger";
    } else if (status === "Registering") {
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