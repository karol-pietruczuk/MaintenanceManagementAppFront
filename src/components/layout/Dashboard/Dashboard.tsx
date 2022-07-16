import './Dashboard.css';
import {SideMenu} from "../../common/SideMenu/SideMenu";
import {Heading} from "@chakra-ui/react";

export const Dashboard = () => {
    return (
     <>
         <SideMenu/>
         <Heading
             textAlign="center"
             fontSize={50}
             marginTop={5}
         >
             Dashboard
         </Heading>
     </>
    )
};