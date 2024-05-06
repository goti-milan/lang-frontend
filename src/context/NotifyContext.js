import React, { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const NotifyContext = createContext({});

const NotifyContextProvider = ({ children }) => {

    const customToast = ({ type, message }) => {
        toast(message, { type: type });
    }

    return (
        <NotifyContext.Provider value={{ toast: customToast }}>
            {children}
            <ToastContainer hideProgressBar closeOnClick pauseOnHover autoClose={3000} closeButton />
        </NotifyContext.Provider>
    )
}

export default NotifyContextProvider;