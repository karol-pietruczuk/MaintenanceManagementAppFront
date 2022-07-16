import './Tasks.css';
import {SideMenu} from "../../common/SideMenu/SideMenu";
import {Alert, AlertIcon, AlertTitle, Spinner, Table, TableContainer, Tbody, Th, Thead, Tr} from "@chakra-ui/react";
import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../../context/AuthContext";
import {apiURL} from "../../../config/api";
import {TaskEntity} from 'types';
import {TaskBar} from "./TaskBar";
import {OneTask} from "./OneTask";
import {deleteLocaleUserData, takeUserFromLocaleIfNotUpToDate} from "../../../utils/auth";

export const Tasks = () => {
    const [tasks, setTasks] = useState<TaskEntity []>([]);
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [searchOrder, setSearchOrder] = useState('asc');
    const {userEmail, userType, accessToken, refreshToken, setUserEmail, setUserType, setAccessToken, setRefreshToken} = useContext(AuthContext);
    const navigate = useNavigate();

    const refreshAccessToken = async (response: Response) => {
        try {
            console.log('Refresh Tokena');
            console.log({userEmail, userType, accessToken, refreshToken})
            const refreshAccessTokenResponse = await fetch(`${apiURL}/auth/refresh`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({
                    refreshToken,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const refreshAccessTokenResult = await refreshAccessTokenResponse.json();
            const newAccessToken = refreshAccessTokenResult.accessToken;

            setAccessToken(newAccessToken);

            window.localStorage.setItem('accessToken', newAccessToken);
            return 'Authorization renewed';
        } catch (err: any) {
            if (!err?.response) {
                return 'No Server Response';
            } else if (err.response?.status === 401) {
                /**invalid refresh token*/
                deleteLocaleUserData();
                setUserEmail('');
                setUserType('');
                setAccessToken('');
                setRefreshToken('');
                return 'Unauthorized';
            } else if (err.response?.status === 500) {
                return 'Internal Server Error. Please, try again later.';
            } else {
                setErrMsg('Operation failed');
            }
        }
    }

    const taskReq = async (newList = false) => {


        const response = await fetch(`${apiURL}/task/${searchOrder === 'asc'}/15/1/${searchText}`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response) {
            console.log('Why no server response?')
            setErrMsg('No Server Response');
            return;
        } else if (response.status === 200) {
            const result = (await response.json()) as TaskEntity [];

            if (newList) {
                setTasks([...result]);
            } else {
                setTasks([...tasks, ...result]);
            }
        } else if (response.status === 401) {
            const refreshMessage = await refreshAccessToken(response);

            if (refreshMessage && refreshMessage !== 'Authorization renewed') {
                setErrMsg(refreshMessage);
                return;
            }

            const secondResponse = await fetch(`${apiURL}/task/${searchOrder === 'asc'}/15/1/${searchText}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (secondResponse) {
                setErrMsg('No Server Response');
            } else if ((secondResponse as Response).status === 200) {
                const secondResult = (await response.json()) as TaskEntity [];

                if (newList) {
                    setTasks([...secondResult]);
                } else {
                    setTasks([...tasks, ...secondResult]);
                }
            }  else {
                deleteLocaleUserData();
                setUserEmail('');
                setUserType('');
                setAccessToken('');
                setRefreshToken('');
                setTimeout(() =>{
                    navigate('/login');
                },5000);
            }
        } else if (response.status === 403) {
            setErrMsg('Access Denied');
        } else if (response.status === 500) {
            setErrMsg('Internal Server Error. Please, try again later.');
        } else {
            setErrMsg('Operation failed');
        }
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            const localeUser = takeUserFromLocaleIfNotUpToDate({userEmail, userType, accessToken, refreshToken});
            if (localeUser?.userEmail && localeUser?.userType && localeUser?.accessToken && localeUser?.refreshToken) {
                setUserEmail(localeUser.userEmail);
                setUserType(localeUser.userType);
                setAccessToken(localeUser.accessToken);
                setRefreshToken(localeUser.refreshToken);
            }
            if (!userEmail || !userType || !accessToken || !refreshToken) {
                deleteLocaleUserData();
                setUserEmail('');
                setUserType('');
                setAccessToken('');
                setRefreshToken('');
                setTimeout(() =>{
                    navigate('/login');
                },5000);
            }
            setLoading(false);
        })()
    },[]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            await taskReq();
            setLoading(false);
        })()

    },[userEmail, userType, accessToken, refreshToken]);

    /** Context tak szybko nie aktualizuje się. Zrób kod tak, żeby w useEffect bez deps wywoływany był normalny kod i w razie gdy zmieniamy dane context to daj kolejny useEffecr z deps contextowym, tj. [userEmail, userType, accessToken, refreshToken] */

    return (
            <div className="tasks" style={{width: '100%'}}>
                <TaskBar
                    searchText={searchText}
                    searchOrder={searchOrder}
                    setSearchText={setSearchText}
                    setSearchOrder={setSearchOrder}
                    handleSearch={taskReq}
                />
                <SideMenu/>

                <TableContainer
                    width='98%'
                    margin='150px auto 0'
                >
                    <Table
                        variant='simple'
                        size='lg'
                        className="table"
                    >
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Description</Th>
                                <Th>Status</Th>
                                {/*<Th isNumeric>Create Date</Th>*/}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {tasks.map((task) => <OneTask task={task} key={task.id}/>)}
                        </Tbody>
                    </Table>
                </TableContainer>
                {loading ?
                    <Spinner
                        size="xl"
                        position="fixed"
                        top='50vh'
                        left='50vw'
                    /> : null
                }
                {/*// @TODO Change to popup with e.g position: fixed*/}
                { errMsg ? <Alert status='error' className="alert" display="fixed">
                    <AlertIcon />
                    <AlertTitle>{errMsg}!</AlertTitle>
                    {/*<AlertDescription>Your Chakra experience may be degraded.</AlertDescription>*/}
                </Alert> : null}
            </div>
    )

}