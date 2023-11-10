import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is installed with `npm install axios`
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel'; // Correctly imported here
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Header from './Header'; // Import Header component
import Footer from './Footer'; // Import Footer component
    
export default class CreateVectorstorePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            media_url: '',
            // Assuming 'owner' is provided by the backend on save and not a form field
            // createdon and updatedon are also typically set by the backend
            published: false, // Assuming this is a boolean field
        };
    }

    handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        this.setState({
            [name]: type === 'checkbox' ? checked : value,
        });
    }

    handleFileChange = (event) => {
        this.setState({
            media_file: event.target.files[0],
            media_url: event.target.files[0].name, // Automatically set the filename based on the uploaded file
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('owner', this.state.owner);
        formData.append('published', this.state.published);
        formData.append('media_file', this.state.media_file); // Add the file
    
        axios.post('/api/createvectorstore', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            // success message
            this.setState({ successMsg: 'VectorStore created successfully!', errorMsg: '' });
        })
        .catch(error => {
            // error message
            this.setState({ errorMsg: 'An error occurred while creating the VectorStore.', successMsg: '' });
        });
    };

    render() {
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
                <Container component="main" maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
                    <form onSubmit={this.handleSubmit } style={{ width: '100%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} align="center">
                                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                    Create VectorStore
                                </Typography>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <TextField
                                    name="title"
                                    label="Title"
                                    value={this.state.title}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <TextField
                                    name="description"
                                    label="Description"
                                    value={this.state.description}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <TextField
                                    name="owner"
                                    label="Owner"
                                    value={this.state.owner}
                                    onChange={this.handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <input
                                    accept="application/zip" // specify the file types you want to accept
                                    style={{ display: 'none' }} // hide the default file input
                                    id="raised-button-file"
                                    multiple
                                    type="file"
                                    name="media_file"
                                    onChange={this.handleFileChange}
                                />
                                <label htmlFor="raised-button-file">
                                    <Button variant="contained" color="primary" component="span">
                                        Upload File
                                    </Button>
                                </label>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <FormControlLabel
                                    control={
                                        <Radio
                                            checked={this.state.published}
                                            onChange={this.handleInputChange}
                                            name="published"
                                            value="true"
                                        />
                                    }
                                    label="Published"
                                />
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Button type="submit" variant="contained" color="primary">Create</Button>
                            </Grid>
                            <Grid item xs={12} align="center">
                                <Button variant="contained" color="secondary" to="/" component={Link}>Back</Button>
                            </Grid>
                            {this.state.successMsg && (
                            <Grid item xs={12} align="center">
                                <Typography color="primary">{this.state.successMsg}</Typography>
                            </Grid>
                            )}
                            {this.state.errorMsg && (
                            <Grid item xs={12} align="center">
                                <Typography color="error">{this.state.errorMsg}</Typography>
                            </Grid>
                            )}
                        </Grid>
                    </form>
                </Container>
                <Footer />
            </Box>
        );
    }
}
