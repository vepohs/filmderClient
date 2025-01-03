import { toast } from "react-toastify";

export const handleSuccessToast = (message: string) => {
    toast.success(message);
};

export const handleErrorToast = (message: string) => {
    toast.error(message);
};

export const handleInfoToast = (message: string) => {
    toast.info(message);
};


export const handleWarningToast = (message: string) => {
    toast.warn(message);
};
