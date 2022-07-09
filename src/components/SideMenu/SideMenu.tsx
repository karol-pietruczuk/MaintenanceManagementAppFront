import React from 'react';

import {
    Button,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    DrawerHeader,
    DrawerBody,
    IconButton,
    DrawerFooter,
} from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons";
import {LogoHeader} from "../common/LogoHeader";
import {Nav} from "../Nav/Nav";
import {Footer} from "../Footer/Footer";

export const SideMenu = () => {
        const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button
                colorScheme='teal'
                onClick={onOpen}
                as={IconButton}
                icon={<HamburgerIcon/>}
                aria-label='Options'
                variant='outline'
                marginTop={5}
                marginLeft={5}
            />
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
            >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader
                        marginTop={5}
                        marginBottom={0}
                    >
                        <LogoHeader
                            imageSize={50}
                            menuMarginTop={0}
                            descriptionVisibility={false}
                        />
                    </DrawerHeader>
                    <DrawerBody>
                        <Nav/>
                    </DrawerBody>
                    <DrawerFooter>
                        <Footer/>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};