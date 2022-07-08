import { Input, Button } from '@chakra-ui/react'
import './LoginForm.css';
import {createRef, FormEvent, useContext, useEffect, useState} from "react";
import {apiURL} from "../../config/api";
import {AuthContext} from "../../context/AuthContext";
import {handleBadResponse} from "../../utils/handleBadResponse";

interface Props {
    setErrMsg: (errMsg: string) => void;
}

export const LoginForm = (props: Props) => {
    const {setAccessToken} = useContext(AuthContext);
    const {setRefreshToken} = useContext(AuthContext);
    const {setUserEmail} = useContext(AuthContext)
    const {setUserType} = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [userRef, setUserRef] = useState(createRef<HTMLInputElement>());
    // const [errRef, setErrRef] = useState(createRef<HTMLInputElement>());

    // useEffect(() => {
    //     userRef.current?.focus();
    // }, []);

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
            });

            handleBadResponse(response);

            const result = await response.json();
            console.log(result);
            setAccessToken(result?.accessToken);
            setRefreshToken(result?.refreshToken);
            setUserEmail(email);
            setUserType(result?.userType);
            setEmail('');
            setPassword('');
            // navigate(from, { replace: true });
        } catch (err: any) {
            if (!err?.response) {
                props.setErrMsg('No Server Response');
            }
            // errRef.current?.focus();
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
                    // ref={userRef}
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
                    // ref={errRef}
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