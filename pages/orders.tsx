import React from 'react';
import Head from "next/head";
import Layout from "@/layout";
import {Anchor, Breadcrumbs, Container, Paper, Stack, Title} from "@mantine/core";
import {PATH_DASHBOARD} from "@/routes";
import {OrdersTable} from "@/components";
import OrdersData from "../mocks/Orders.json";

const items = [
    {title: 'Dashboard', href: PATH_DASHBOARD.default},
    {title: 'Pages', href: '#'},
    {title: 'Orders', href: '#'},
].map((item, index) => (
    <Anchor href={item.href} key={index}>
        {item.title}
    </Anchor>
));

function Orders() {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Layout>
                <Container>
                    <Stack>
                        <Title>Settings</Title>
                        <Breadcrumbs>{items}</Breadcrumbs>
                    </Stack>
                    <Paper>
                        <Title>Orders</Title>
                        <OrdersTable data={OrdersData}/>
                    </Paper>
                </Container>
            </Layout>
        </>
    );
}

export default Orders;