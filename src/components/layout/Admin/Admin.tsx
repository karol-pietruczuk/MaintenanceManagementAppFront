import './Admin.css';
import {SideMenu} from "../../common/SideMenu/SideMenu";
import {Heading} from "@chakra-ui/react";

export const Admin = () => {
    return (
        <>
            <SideMenu/>
            <Heading
                textAlign="center"
                fontSize={50}
                marginTop={5}
            >
                Admin panel
            </Heading></>
    )
};