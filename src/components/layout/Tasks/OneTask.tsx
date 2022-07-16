import {
    Button, FormControl, FormLabel,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalOverlay,
    Td, Textarea,
    Tr,
    useDisclosure
} from "@chakra-ui/react";
import React, {ChangeEvent, useEffect, useRef, useState} from "react";

import {TaskEntity} from 'types';

interface Props {
    task: TaskEntity;
}

export const OneTask = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [name, setName] = useState(props.task.name);
    const [desc, setDesc] = useState(props.task.description);
    const nameRef = useRef<HTMLTextAreaElement | null>(null);
    const descRef = useRef<HTMLTextAreaElement | null>(null);

    const nameChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setName(event.target.value);
    };

    const descChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDesc(event.target.value);
    };

    useEffect(() => {
        if (nameRef && nameRef.current) {
            nameRef.current.style.height = "0px";
            const scrollHeight = nameRef.current.scrollHeight;
            nameRef.current.style.height = scrollHeight + 2 + "px";
        }
    }, [name]);

    useEffect(() => {
        if (descRef && descRef.current) {
            descRef.current.style.height = "0px";
            const scrollHeight = descRef.current.scrollHeight;
            descRef.current.style.height = scrollHeight + 2 + "px";
        }
    }, [desc]);

    return (
            <Tr
                _hover={{padding: '20px', borderRadius: '8px', backgroundColor: '#3f444e', cursor: 'pointer'}}
                onClick={onOpen}
            >
                <Td>{props.task.name}</Td>
                <Td>{props.task.description}</Td>
                <Td>{props.task.status}</Td>
                {/*<Td style={{textAlign: 'right'}}>{new Date(props.task.createTime).toLocaleString()}</Td>*/}
                <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                    <ModalOverlay />
                    <ModalContent>

                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl style={{margin: '4%', width: '92%'}}>
                                <FormLabel>Topic</FormLabel>
                                <Textarea ref={nameRef} value={name} name="name" style={{marginBottom: '20px'}} onChange={nameChange}/>
                                <FormLabel>Description</FormLabel>
                                <Textarea ref={descRef} value={desc} name="desc" style={{marginBottom: '20px'}} onChange={descChange}/>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3}>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Tr>
    )
}