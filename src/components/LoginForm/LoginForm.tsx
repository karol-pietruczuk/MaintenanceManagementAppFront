import { Input, Button } from '@chakra-ui/react'
import './LoginForm.css';
import {FormEvent, useContext, useEffect, useState} from "react";
import {apiURL} from "../../config/api";
import {AuthContext} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";

interface Props {
    setErrMsg: (errMsg: string) => void;
}

export const LoginForm = (props: Props) => {
    const {setUserEmail, setUserType, setAccessToken, setRefreshToken} = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        props.setErrMsg('');
    }, [email, password]);

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiURL}/auth/login`, {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            const result = await response.json();

            setUserEmail(email);
            setUserType(result?.userType);
            setAccessToken(result?.accessToken);
            setRefreshToken(result?.refreshToken);

            window.localStorage.setItem('email', email);
            window.localStorage.setItem('userType', result?.userType);
            window.localStorage.setItem('accessToken', result?.accessToken);
            window.localStorage.setItem('refreshToken', result?.refreshToken);
            setEmail('');
            setPassword('');
            navigate('/task');
        } catch (err: any) {
            if (!err?.response) {
                props.setErrMsg('No Server Response');
            } else if (err?.response.status === 400) {
                props.setErrMsg('Missing Username or Password');
            } else if (err?.response.status === 401) {
                props.setErrMsg('Unauthorized');
            } else if (err?.response.status === 403) {
                props.setErrMsg('Access Denied');
            } else if (err?.response.status === 500) {
                props.setErrMsg('Internal Server Error. Please, try again later.');
            } else {
                props.setErrMsg('Login failed');
            }
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            <label><p>email</p>
                <Input
                    placeholder='write email...'
                    type="email"
                    width={200}
                    required
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                />
            </label>
            <label><p>password</p>
                <Input
                    placeholder='write password...'
                    type="password"
                    width={200}
                    required
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                />
            </label>
            <Button
                colorScheme='blue'
                type={"submit"}
            >
                login
            </Button>
        </form>
    )
};