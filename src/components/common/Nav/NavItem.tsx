import {Button, ListItem} from "@chakra-ui/react";
import {NavLink} from "react-router-dom";
import React from "react";

interface Props {
    name: string;
    query: string;
}

export const NavItem = (props: Props) => {
    return (
        <ListItem
            marginBottom={5}
        >
            <Button
                colorScheme='teal'
                variant='outline'
                width={"100%"}
                padding={0}
            >
                <NavLink to={`/${props.query}`} style={{width: '100%'}}>{props.name}</NavLink>
            </Button>
        </ListItem>
    );
};