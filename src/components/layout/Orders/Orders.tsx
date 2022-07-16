import './Orders.css';
import {SideMenu} from "../../common/SideMenu/SideMenu";
import {Heading} from "@chakra-ui/react";

export const Orders = () => {
    return (
        <>
            <SideMenu/>
            <Heading
                textAlign="center"
                fontSize={50}
                marginTop={5}
            >
                Orders
            </Heading></>
    )
};