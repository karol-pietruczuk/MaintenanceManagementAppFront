import {Box, Heading} from "@chakra-ui/react";
import {SearchTask} from "./SearchTask";
import {inspect} from "util";

interface Props {
    searchText: string;
    searchOrder: string;
    setSearchText: (newSearchText: string) => void;
    setSearchOrder: (newSearchOrder: string) => void;
    handleSearch: (newList: boolean) => void;
}

export const TaskBar = (props: Props) => {
    return (
        <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '140px', backgroundColor: "#1a202c"}}>
            <Box display="block" width="100%" top={0}/>
            <Heading
                textAlign="center"
                fontSize={50}
                position="fixed"
                left="10%"
                top={10}
            >
                Tasks
            </Heading>
            <SearchTask
                searchText={props.searchText}
                searchOrder={props.searchOrder}
                setSearchText={props.setSearchText}
                setSearchOrder={props.setSearchOrder}
                handleSearch={props.handleSearch}
            />
        </div>

    )
}