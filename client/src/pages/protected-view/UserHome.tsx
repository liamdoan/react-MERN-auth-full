import styles from "./UserHome.module.css";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { Navigate } from "react-router-dom";
import { logout } from "../../redux/slices/userSlice";
import { useState } from "react";
import LoadingBar from "../../components/loading/LoadingBar";
import Spinner from "../../components/loading/Spinner";
import { userLogout } from "../../utils/authApiCalls";

const UserHome = () => {
    const [loading, setLoading] = useState<Boolean>(false);
    const [messageSuccess, setMessageSuccess] = useState<string>("");
    const [messageFailed, setMessageFailed] = useState<string>("");

    const user: any = useSelector((state: RootState) => state.user.user);
    const isCheckingUserAuthenticated = useSelector((state: RootState) => state.user.isCheckingUserAuthenticated);
    const isUserAuthenticated = useSelector((state: RootState) => state.user.isUserAuthenticated);
    const dispatch = useDispatch();

    if (isCheckingUserAuthenticated) {
        return <div className={styles.spinnerWrapper}><Spinner /></div>;
    }

    if (!isUserAuthenticated) {
        return <Navigate to="/login" />;
    }

    const handleLogout = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await userLogout();

            setLoading(false);
            setMessageSuccess(response.data.message);
            dispatch(logout());
        } catch (error: any) {
            console.error(error);
            setMessageFailed(error.response.data.message);
            setLoading(false);
        }
    };
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.navbar}>
                <button className={styles.logoutButton} onClick={handleLogout}>Log Out</button>
            </div>
            <div className={styles.mainSection}>
                <h1>This is user homepage</h1>
                <div className={styles.infoWrapper}>
                    <div className={styles.infoText}>
                        <p>Hello: {user.name}</p>
                        <p>Your email is: {user.email}</p>
                        <p>You joined on: {new Date (user.createdAt).toLocaleString()}</p>
                        <p>You last logged in on: {user && new Date(user.lastLogin).toLocaleString()}</p>
                    </div>
                    { loading && <LoadingBar /> }
                    { messageSuccess && <span className={styles.messageSuccess}>{messageSuccess}</span> }
                    { messageFailed && <span className={styles.messageFailed}>{messageFailed}</span> }
                </div>
            </div>
        </div>
    )
}

export default UserHome
