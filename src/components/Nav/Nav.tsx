import {Button, ListItem, UnorderedList} from "@chakra-ui/react";
import {apiURL} from "../../config/api";
import React from "react";

export const Nav = () => {
    return (
        <UnorderedList
            listStyleType={"none"}
            marginLeft={0}
            className="un-list"
        >
            <ListItem
                marginBottom={5}
            >
                <Button
                    colorScheme='teal'
                    variant='outline'
                    width={"100%"}
                >
                    <a href={`${apiURL}/admin`}>admin</a>
                </Button>
            </ListItem>
            <ListItem
                marginBottom={5}
            >
                <Button
                    colorScheme='teal'
                    variant='outline'
                    width={"100%"}
                >
                    <a href={`${apiURL}/dashboard`}>dashboard</a>
                </Button>
            </ListItem>
            <ListItem
                marginBottom={5}
            >
                <Button
                    colorScheme='teal'
                    variant='outline'
                    width={"100%"}
                >
                    <a href={`${apiURL}/task`}>tasks</a>
                </Button>
            </ListItem>
            <ListItem
                marginBottom={5}
            >
                <Button
                    colorScheme='teal'
                    variant='outline'
                    width={"100%"}
                >
                    <a href={`${apiURL}/part`}>parts</a>
                </Button>
            </ListItem>
            <ListItem
                marginBottom={5}
            >
                <Button
                    colorScheme='teal'
                    variant='outline'
                    width={"100%"}
                >
                    <a href={`${apiURL}/order`}>orders</a>
                </Button>
            </ListItem>
        </UnorderedList>
    );
};