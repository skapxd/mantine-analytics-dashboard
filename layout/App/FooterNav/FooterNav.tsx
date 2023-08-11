import React from 'react';
import {ActionIcon, Button, ButtonProps, Group, Menu, rem, Text, useMantineTheme} from "@mantine/core";
import {useMediaQuery} from "@mantine/hooks";
import {
    IconSettings,
    IconSearch,
    IconPhoto,
    IconMessageCircle,
    IconTrash,
    IconArrowsLeftRight, IconDots
} from '@tabler/icons-react';

const FooterNav = () => {
    const theme = useMantineTheme();
    const mobile_match = useMediaQuery('(max-width: 425px)');

    const BUTTON_PROPS: ButtonProps = {
        variant: "subtle",
        sx: {
            padding: `${rem(8)} ${rem(12)}`,
            color: theme.colorScheme === "dark" ? theme.white : theme.black,

            '&:hover': {
                transition: 'all ease 150ms',
                backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2],
                textDecoration: 'none'
            }
        }
    }

    return (
        <Group position="apart">
            {mobile_match ?
                <Menu shadow="md" width={200} position="right-end">
                    <Menu.Target>
                        <ActionIcon>
                            <IconDots size={18}/>
                        </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Item>Support</Menu.Item>
                        <Menu.Item>Help Center</Menu.Item>
                        <Menu.Item>Privacy</Menu.Item>
                        <Menu.Item>Terms of Use</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
                : <Group spacing={4}>
                    <Button {...BUTTON_PROPS}>Support</Button>
                    <Button {...BUTTON_PROPS}>Help Center</Button>
                    <Button {...BUTTON_PROPS}>Privacy</Button>
                    <Button {...BUTTON_PROPS}>Terms of Use</Button>
                </Group>
            }
            <Text c="dimmed" fz="sm">&copy;&nbsp;{new Date().getFullYear()}&nbsp;DesignSparx</Text>
        </Group>
    );
};

export default FooterNav;
