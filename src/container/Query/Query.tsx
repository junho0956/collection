import React from 'react';
import {
    QueryClient,
    QueryClientProvider
} from "@tanstack/react-query";
import Posts from "./Posts";

const queryClient = new QueryClient();
// const env = process.env.REACT_APP_DEFAULT;
const Query = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <Posts />
        </QueryClientProvider>
    );
};

export default Query;