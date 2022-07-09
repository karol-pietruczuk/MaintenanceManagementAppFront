import {LogoHeader} from "../../common/LogoHeader";
import {LoginForm} from "../../LoginForm/LoginForm";
import {useState} from "react";
import {Alert, AlertIcon, AlertTitle} from "@chakra-ui/react";
import {Footer} from "../../Footer/Footer";

export const Login = () => {

    const [errMsg, setErrMsg] = useState('');


    return (
        <div>
            <LogoHeader/>
            <LoginForm
                setErrMsg={setErrMsg}
            />
            {errMsg ? <Alert status='error'  className="alert" marginTop={20}>
                <AlertIcon />
                <AlertTitle>{errMsg}!</AlertTitle>
                {/*<AlertDescription>Your Chakra experience may be degraded.</AlertDescription>*/}
            </Alert> : <div className="alert-placeholder" style={{height: 68}}/>}
            <Footer/>
        </div>
    )
}