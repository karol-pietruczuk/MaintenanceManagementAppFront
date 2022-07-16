import {ChangeEvent, FormEvent, SetStateAction, useState} from "react";
import {
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input, InputGroup, InputLeftElement,
    Radio,
    RadioGroup, Stack
} from "@chakra-ui/react";

import './SearchTask.css';
import {SearchIcon} from "@chakra-ui/icons";

interface Props {
    searchText: string;
    searchOrder: string;
    setSearchText: (newSearchText: string) => void;
    setSearchOrder: (newSearchOrder: string) => void;
    handleSearch: (newList: boolean) => void;
}

export const SearchTask = (props: Props) => {
    const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => props.setSearchText(e.target.value);
    const handleSearchOrderChange = (nextValue: string ) => props.setSearchOrder(nextValue);


    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                console.log('SUBMIT')
                props.handleSearch(true)
            }}>
            <FormControl
                className="form-control"
                top={5}
            >
                <FormLabel
                    className="form-label"
                >
                    <p>search task</p>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<SearchIcon color='gray.300' />}
                        />
                        <Input
                            className="form-label__input"
                            type='text'
                            name='searchText'
                            value={props.searchText}
                            onChange={handleSearchTextChange}
                        />
                    </InputGroup>
                </FormLabel>
                <FormLabel
                    className="form-label"
                >
                    <p>last change date order</p>
                    <RadioGroup
                        name='searchOrder'
                        className="form-label__radio"
                        value={props.searchOrder}
                        onChange={handleSearchOrderChange}
                    >
                        <Stack
                            // spacing='12px'
                            direction="column"
                        >
                            <Radio value='asc' >ascending</Radio>
                            <Radio value='desc'>descending</Radio>
                        </Stack>
                    </RadioGroup>
                </FormLabel>
                <Button
                    className="form-label__button"
                    mt={4}
                    colorScheme='teal'
                    type="submit"
                >
                    search
                </Button>
            </FormControl>
        </form>
    )
}