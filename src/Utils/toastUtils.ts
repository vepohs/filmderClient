import { toast } from "react-toastify";

export const handleSuccess = (message: string) => {
    toast.success(message);
};

export const handleError = (message: string) => {
    toast.error(message);
};

export const handleInfo = (message: string) => {
    toast.info(message);
};


export const handleWarning = (message: string) => {
    toast.warn(message);
};
