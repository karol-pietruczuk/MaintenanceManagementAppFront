import {LogoHeader} from "../../common/LogoHeader/LogoHeader";
import {LoginForm} from "../../LoginForm/LoginForm";
import {useContext, useEffect, useState} from "react";
import {Alert, AlertIcon, AlertTitle, Spinner} from "@chakra-ui/react";
import {Footer} from "../../common/Footer/Footer";
import {AuthContext} from "../../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {takeUserFromLocaleIfNotUpToDate} from "../../../utils/auth";

export const Login = () => {
    const {userEmail, userType, accessToken, refreshToken, setUserEmail, setUserType, setAccessToken, setRefreshToken} = useContext(AuthContext);
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const localeUser = takeUserFromLocaleIfNotUpToDate({userEmail, userType, accessToken, refreshToken});
        if (localeUser) {
            setUserEmail(localeUser.userEmail);
            setUserType(localeUser.userType);
            setAccessToken(localeUser.accessToken);
            setRefreshToken(localeUser.refreshToken);
        };
        setLoading(false);
        if (userEmail && userType && accessToken && refreshToken) {
            navigate('/task');
        }
    },[userType, userEmail, accessToken, refreshToken]);

    if (loading) {
        return <Spinner/>
    } else {
        return (
            <div>
                <LogoHeader/>
                <LoginForm
                    setErrMsg={setErrMsg}
                />
                {errMsg ? <Alert status='error' className="alert" marginTop={20}>
                    <AlertIcon />
                    <AlertTitle>{errMsg}!</AlertTitle>
                    {/*<AlertDescription>Your Chakra experience may be degraded.</AlertDescription>*/}
                </Alert> : <div className="alert-placeholder" style={{height: 68}}/>}
                <Footer/>
            </div>
        )
    }
}