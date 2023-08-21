import { Avatar, Box, Button, Divider, Flex, HStack, Heading, Stack, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { CommonLayout } from "../layouts/Layout";

export function MyCircle() {
  return (
    <CommonLayout>
      <Tabs variant={"unstyled"} isFitted isLazy>
        <Box position={"sticky"} top={0} backgroundColor={"circleDark"} zIndex={1}>
          <Heading size={"md"} p={4}>My Circle</Heading>
          <Divider borderColor={"circleAccent"} />
          <TabList p={2}>
            <Tab>Followers</Tab>
            <Tab>Following</Tab>
          </TabList>
          <Divider borderColor={"circleAccent"} />
          <TabIndicator
            height={"5px"}
            bg={"circleGreen"}
            borderRadius={"full"}
            mt={"-3px"}
          />
        </Box>
        <TabPanels>
          <TabPanel>
            <Stack spacing={5} my={2}>
              <Flex justify={"space-between"} align={"center"}>
                <HStack>
                  <Avatar name="(G)I-DLE" src="https://upload.wikimedia.org/wikipedia/en/d/dc/%28G%29I-dle_-_I_Feel_digital.png" />
                  <Stack spacing={0}>
                    <Text>(G)I-DLE</Text>
                    <Text fontSize={"sm"} textColor={"GrayText"}>@g_i_dle</Text>
                  </Stack>
                </HStack>
                <Button variant={"outline"} borderRadius={"full"} isDisabled>Following</Button>
              </Flex>

              {/* Omit down after fetch */}
              <Flex justify={"space-between"} align={"center"}>
                <HStack>
                  <Avatar name="Spider Gwen" src="https://assetsio.reedpopcdn.com/Spider-Gwen-4.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp" />
                  <Stack spacing={0}>
                    <Text>Spider Gwen</Text>
                    <Text textColor={"GrayText"}>@not_gwen_tennyson</Text>
                  </Stack>
                </HStack>
                <Button variant={"outline"} borderRadius={"full"}>Follow</Button>
              </Flex>

              <Flex justify={"space-between"} align={"center"}>
                <HStack>
                  <Avatar name="Xtraordinary Girls" src="https://pbs.twimg.com/profile_images/1610924024091267073/UpPO8LMM_400x400.jpg" />
                  <Stack spacing={0}>
                    <Text>Xtraordinary Girls</Text>
                    <Text fontSize={"sm"} textColor={"GrayText"}>@grlgvng</Text>
                  </Stack>
                </HStack>
                <Button variant={"outline"} borderRadius={"full"}>Follow</Button>
              </Flex>

              <Flex justify={"space-between"} align={"center"}>
                <HStack>
                  <Avatar name="John Doe" src="" />
                  <Stack spacing={0}>
                    <Text>John Doe</Text>
                    <Text fontSize={"sm"} textColor={"GrayText"}>@johndoe</Text>
                  </Stack>
                </HStack>
                <Button variant={"outline"} borderRadius={"full"}>Follow</Button>
              </Flex>
              {/* Omit up after fetch */}

            </Stack>
            <Flex direction={"column"} justify={"center"} align={"center"} h={"10em"}>
              <Text textColor={"GrayText"}>And a lot more....</Text>
            </Flex>
          </TabPanel>
          <TabPanel>
            <Stack spacing={5} my={2}>
              <Flex justify={"space-between"} align={"center"}>
                <HStack>
                  <Avatar name="Song Yuqi" src="https://static.wikia.nocookie.net/g-idle/images/8/87/Yuqi_I_feel_Concept_Photo_Queen_Ver_2.jpg" />
                  <Stack spacing={0}>
                    <Text>Song Yuqi</Text>
                    <Text fontSize={"sm"} textColor={"GrayText"}>@yuqisong.923</Text>
                  </Stack>
                </HStack>
                <Button variant={"outline"} borderRadius={"full"}>Unfollow</Button>
              </Flex>

              {/* Omit down after fetch */}
              <Flex justify={"space-between"} align={"center"}>
                <HStack>
                  <Avatar name="(G)I-DLE" src="https://upload.wikimedia.org/wikipedia/en/d/dc/%28G%29I-dle_-_I_Feel_digital.png" />
                  <Stack spacing={0}>
                    <Text>(G)I-DLE</Text>
                    <Text fontSize={"sm"} textColor={"GrayText"}>@g_i_dle</Text>
                  </Stack>
                </HStack>
                <Button variant={"outline"} borderRadius={"full"}>Unfollow</Button>
              </Flex>

              <Flex justify={"space-between"} align={"center"}>
                <HStack>
                  <Avatar name="Yeh Shuhua" src="https://static.wikia.nocookie.net/g-idle/images/e/ef/Shuhua_I_feel_Concept_Photo_Queen_Ver_2.jpg" />
                  <Stack spacing={0}>
                    <Text>Yeh Shuhua</Text>
                    <Text textColor={"GrayText"}>@yeh.shaa_</Text>
                  </Stack>
                </HStack>
                <Button variant={"outline"} borderRadius={"full"}>Unfollow</Button>
              </Flex>

              <Flex justify={"space-between"} align={"center"}>
                <HStack>
                  <Avatar name="Seo Soojin" src="https://kbizoom.com/wp-content/uploads/2022/11/soojin-2-241122.webp" />
                  <Stack spacing={0}>
                    <Text>Seo Soojin</Text>
                    <Text fontSize={"sm"} textColor={"GrayText"}>@_seosootang</Text>
                  </Stack>
                </HStack>
                <Button variant={"outline"} borderRadius={"full"}>Unfollow</Button>
              </Flex>

              <Flex justify={"space-between"} align={"center"}>
                <HStack>
                  <Avatar name="Minnie" src="https://asset-2.tstatic.net/tribunnews/foto/bank/images/minnie-gi-dle.jpg" />
                  <Stack spacing={0}>
                    <Text>Minnie</Text>
                    <Text fontSize={"sm"} textColor={"GrayText"}>@min.nicha</Text>
                  </Stack>
                </HStack>
                <Button variant={"outline"} borderRadius={"full"}>Unfollow</Button>
              </Flex>

              <Flex justify={"space-between"} align={"center"}>
                <HStack>
                  <Avatar name="Jeon Soyeon" src="https://lastfm.freetls.fastly.net/i/u/ar0/9c4b28cf7da4b56c405f0b869470ef07.jpg" />
                  <Stack spacing={0}>
                    <Text>Jeon Soyeon</Text>
                    <Text fontSize={"sm"} textColor={"GrayText"}>@tiny.pretty.j</Text>
                  </Stack>
                </HStack>
                <Button variant={"outline"} borderRadius={"full"}>Unfollow</Button>
              </Flex>

              <Flex justify={"space-between"} align={"center"}>
                <HStack>
                  <Avatar name="Cho Miyeon" src="https://static.wikia.nocookie.net/g-idle/images/5/5e/Miyeon_I_feel_Concept_Photo_Queen_Ver_1.jpg" />
                  <Stack spacing={0}>
                    <Text>Cho Miyeon</Text>
                    <Text fontSize={"sm"} textColor={"GrayText"}>@noodle.zip</Text>
                  </Stack>
                </HStack>
                <Button variant={"outline"} borderRadius={"full"}>Unfollow</Button>
              </Flex>
              {/* Omit up after fetch */}

            </Stack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </CommonLayout>
  )
}