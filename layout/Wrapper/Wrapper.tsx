import React from 'react'
import { Box } from '@mui/material';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface wrapperProps {
    children: JSX.Element | JSX.Element[];
}

const Wrapper = (props: wrapperProps) => {
    const { children } = props;
    return (
        <div>
            <Header />
            <Box className="body_content">{children}</Box>
            <Footer />

        </div>
    )
}

export default Wrapper