import { Box, Text } from "@chakra-ui/react";

export default function ErrorMessage() {
    return (
        <Box display='flex' justifyContent='center' alignItems='center'>
            <Text>Error while fetching the data</Text>
        </Box>
    )
}