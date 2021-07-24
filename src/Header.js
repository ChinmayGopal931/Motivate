import { useState } from "react";
import { Flex, Spacer, Box, Heading, Button, Switch, useColorMode, Tag, useToast, TagLabel, Avatar, Link } from "@chakra-ui/react";
import Jazzicon from "./Jazzicon";

function Header(props){
    const toast = useToast();
    const [isLoading, setisLoading] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();

    const requestConnect = async () => {
        setisLoading(true);
        window.ethereum.request({
            method: "eth_requestAccounts"
        }).then(() => {
            props.setCurrentAccount(window.ethereum.selectedAddress);
            setisLoading(false);
        }).catch((err) => {
            console.log(err);
            toast({
                position: "bottom-right",
                title: `Request Rejected`,
                status: "error",
                isClosable: true
            })
            setisLoading(false);
        })
    }
    return (
        <Flex
            px={10}
            py={4}
            w="100vw"
            boxShadow="lg"
            align="center"
        >
            <Box>
                <Heading style={{cursor: "pointer"}} onClick={() => props.setIsHome(true)} as="h2" size="lg"  fontWeight ="extrabold" size="3xl" bgGradient="linear(to-r , blue.600, purple.500, red.500, green.600)"
                    bgClip="text">
                    Motiv8
                </Heading>
            </Box>
            <Spacer />

            <Box  mx={2}>

                <Button onClick={props.onOpen} variant="ghost" color="green.600">
                    How it Works?
                </Button>
            </Box>
            <Box
                mx={2}
            >
                <Button onClick={() => props.setIsHome(false)} variant="ghost" color="green.600">
                    Promises
                </Button>
            </Box>
            <Box>
                {
                    props.chainId == "137" ?
                    <Link isExternal style={{textDecoration: "none"}} href="https://explorer-mainnet.maticvigil.com/address/0x8E96E9B6bCB3DA7e7459f3115B4D4Ca364050429">
                        <Button variant="ghost"  color="green.600" >Contract</Button>
                    </Link> :
                    ""
                }
            </Box>
            <Box
                mx={2}
            >
                <Switch  size="lg" onChange={toggleColorMode}>

                </Switch>
            </Box>
            <Box
                ml={7}
                mr={2}
            >
                {
                    props.currentAccount == undefined ?
                        <Button isLoading={isLoading} onClick={requestConnect} variant="solid" color="green.600">
                            Connect
                        </Button> :
                        <Tag
                            size="lg"
                            borderRadius="full"
                            ml={3}
                            mr={-2}
                        >
                            <TagLabel>
                                {`${props.currentAccount.substr(0,6)}...${props.currentAccount.substr(-4)}`}
                            </TagLabel>
                            <Avatar ml={3} size="xs" bg="transparent" icon={<Jazzicon address={props.currentAccount} />} />
                        </Tag>

                }
            </Box>
        </Flex>
    );
}

export default Header;
