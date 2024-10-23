

import React, { useState } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

const SearchHistoryModal = ({ show, onHide, history, currentUser }) => {
    const userHistory = history.filter(item => item.email === currentUser.email);
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Search History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {(history) && console.log(history)}
                <ListGroup>
                    {userHistory.length > 0 ? (
                        userHistory.map((item, index) => (
                            <ListGroup.Item key={index}>{item.name}</ListGroup.Item>
                        ))
                    ) : (
                        <ListGroup.Item>No history available</ListGroup.Item>
                    )}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SearchHistoryModal;
