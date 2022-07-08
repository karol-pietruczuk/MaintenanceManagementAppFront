import {LogoHeader} from "../../common/LogoHeader";
import {LoginForm} from "../../LoginForm/LoginForm";
import {useEffect, useState} from "react";
import {Alert, AlertDescription, AlertIcon, AlertTitle} from "@chakra-ui/react";
import './Login.css';

export const Login = () => {

    const [errMsg, setErrMsg] = useState('');


    return (
        <>
            <LogoHeader/>
            <LoginForm
                setErrMsg={setErrMsg}
            />
            {errMsg ? <Alert status='error'  className="alert">
                <AlertIcon />
                <AlertTitle>{errMsg}!</AlertTitle>
                {/*<AlertDescription>Your Chakra experience may be degraded.</AlertDescription>*/}
            </Alert> : null}
        </>
    )
}