import React, { Component } from 'react';
//import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import Header from './Header'
import Footer from './Footer'

export default class VectorStoreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vectorStores: [], // This will hold our data from the backend
            isLoading: true,  // This will be true when we are fetching the data
        };
    }
    
    componentDidMount() {
        // Fetch the vectorStores from the Django backend when the component mounts
        this.fetchVectorStores();
    }

    fetchVectorStores = async () => {
        // Replace with your actual API URL
        const apiUrl = '/api/vectorstores';
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.setState({ vectorStores: data, isLoading: false });
        } catch (error) {
            console.error("Fetching data failed", error);
            this.setState({ isLoading: false });
        }
    }

    render() {
        const { vectorStores, isLoading } = this.state;

        if (isLoading) {
            return <p>Loading vector stores...</p>;
        }

        return (
            <Box
            sx={{
                minHeight: '100vh', // Sets the minimum height to 100% of the viewport height
                width: '100vw', // Sets the width to 100% of the viewport width
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.default', // Use the default background color
            }}
            >
                <Header />
                <Container component="main" maxWidth="lg" sx={{ flex: 1, py: 8 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }}>
                        VectorStore List
                    </Typography>
                    <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                        <Table aria-label="simple table" sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow sx={{ '& th': { bgcolor: 'primary.main', color: 'common.white', fontWeight: 'bold' } }}>
                                    <TableCell>Code</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Owner</TableCell>
                                    <TableCell>Created On</TableCell>
                                    <TableCell>Updated On</TableCell>
                                    <TableCell>Published</TableCell>
                                    <TableCell>Download</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {vectorStores.map((vectorStore) => (
                                    <TableRow 
                                        key={vectorStore.code}
                                        sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                                    >
                                        <TableCell>{vectorStore.code}</TableCell>
                                        <TableCell>{vectorStore.title}</TableCell>
                                        <TableCell>{vectorStore.description}</TableCell>
                                        <TableCell>{vectorStore.owner}</TableCell>
                                        <TableCell>{new Date(vectorStore.createdon).toLocaleString()}</TableCell>
                                        <TableCell>{new Date(vectorStore.updatedon).toLocaleString()}</TableCell>
                                        <TableCell>{vectorStore.published ? 'Yes' : 'No'}</TableCell>
                                        <TableCell>
                                            {vectorStore.full_media_url ? (
                                                <a href={vectorStore.full_media_url} download>
                                                    Download
                                                </a>
                                            ) : (
                                                'No File'
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
                <Footer />
            </Box>
        )
    }
}
