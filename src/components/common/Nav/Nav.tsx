import {UnorderedList} from "@chakra-ui/react";
import React from "react";
import {NavItem} from "./NavItem";

export const Nav = () => {
    const navList = [
        {name: 'admin', query: 'admin'},
        {name: 'dashboard', query: 'dashboard'},
        {name: 'tasks', query: 'task'},
        {name: 'parts', query: 'part'},
        {name: 'orders', query: 'order'},
    ];
    return (
        <UnorderedList
            listStyleType={"none"}
            marginLeft={0}
            className="un-list"
        >
            {navList.map((val) => <NavItem name={val.name} query={val.query} key={val.query}/>)}
        </UnorderedList>
    );
}