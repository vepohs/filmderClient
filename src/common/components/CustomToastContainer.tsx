import { ToastContainer } from "react-toastify";

export function CustomToastContainer() {
    return (
        <ToastContainer
            position="bottom-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnHover
        />
    );
}
