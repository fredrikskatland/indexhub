import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
// ... other imports ...

function VectorstoreDetails() {
    const [fileMetadata, setFileMetadata] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { vectorstore_id } = useParams(); // Accessing the route parameter

    useEffect(() => {
        fetchFileMetadata(vectorstore_id);
    }, [vectorstore_id]);

    const fetchFileMetadata = async (vectorstoreId) => {
        const apiUrl = `/api/vectorstores/${vectorstoreId}/filemetadata`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setFileMetadata(data);
            setIsLoading(false);
        } catch (error) {
            console.error("Fetching data failed", error);
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return <p>Loading file metadata...</p>;
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'background.default',
            }}
        >
            <Header />
            <Container component="main" maxWidth="lg" sx={{ flex: 1, py: 8 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main', textAlign: 'center' }}>
                    File Metadata
                </Typography>
                <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                    <Table aria-label="simple table" sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow sx={{ '& th': { bgcolor: 'primary.main', color: 'common.white', fontWeight: 'bold' } }}>
                                <TableCell>Filename</TableCell>
                                <TableCell>File Size (Bytes)</TableCell>
                                <TableCell>Created On</TableCell>
                                <TableCell>Updated On</TableCell>
                                <TableCell>Metadata Fields</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {fileMetadata.map((metadata) => (
                                <TableRow 
                                    key={metadata.filehash} // Assuming filehash is unique
                                    sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                                >
                                    <TableCell>{metadata.filename}</TableCell>
                                    <TableCell>{metadata.filesize}</TableCell>
                                    <TableCell>{new Date(metadata.createdon).toLocaleString()}</TableCell>
                                    <TableCell>{new Date(metadata.updatedon).toLocaleString()}</TableCell>
                                    <TableCell>{metadata.metadatafields}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
            <Footer />
        </Box>
    );
}

export default VectorstoreDetails;
