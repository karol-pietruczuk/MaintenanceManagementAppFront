import './Parts.css';
import {SideMenu} from "../../common/SideMenu/SideMenu";
import {Heading} from "@chakra-ui/react";

export const Parts = () => {
    return (
        <>
            <SideMenu/>
            <Heading
                textAlign="center"
                fontSize={50}
                marginTop={5}
            >
                Parts
            </Heading>
        </>
    )
};