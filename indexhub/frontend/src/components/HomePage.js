import React, { Component } from 'react';
import RoomJoinPage from './RoomJoinPage';
import CreateVectorstorePage from './CreateVectorstorePage';
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";
import VectorStoreList from './VectorStoreList';
import FrontPage from './FrontPage';

export default class HomePage extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<FrontPage />} />
                    <Route path="/join" element={<RoomJoinPage />} />
                    <Route path="/create" element={<CreateVectorstorePage />} />
                    <Route path="/list" element={<VectorStoreList />} />
                </Routes>
            </Router>
        );
    }
}
