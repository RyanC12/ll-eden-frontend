import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';

import axios from 'axios';
import { Link } from 'react-router';

import ImmunityLevels from '../ImmunityLevels./ImmunityLevels';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    cell: {
        maxWidth: 20,
        borderLeft: '1px solid grey',
    }
})

const Dashboard = () => {
    const classes = useStyles();
    const [users, setUsers] = useState([]);
    const [isFlagSpec, setIsFlagSpec] = useState(false);
    const [immunityLevel, setImmunityLevel] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/')
            .then((res) => {
                const usersInfo = res.data.users;
                setUsers(usersInfo);
                setIsFlagSpec(usersInfo.flag);
                setImmunityLevel(usersInfo.immunity);
            })
    }, [])
    console.log({ immunityLevel });
    console.log({ users })

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
        <h1>We Are One</h1>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.cell}>Name</TableCell>
                        <TableCell className={classes.cell} align="center">Immunity</TableCell>
                        <TableCell className={classes.cell} align="center">Flag Spec</TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user._id}>
                            <TableCell className={classes.cell} component="th" scope="user">
                                {user.name}
                            </TableCell>
                            <TableCell
                                className={classes.cell}
                                align="center"
                                onClick={() => {handleOpen()}}
                            >
                                {user.immunity}
                            </TableCell>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                disablePortal
                                disableEnforceFocus
                                disableAutoFocus
                                aria-labelledby="server-modal-title"
                                aria-describedby="server-modal-description"
                            >
                                <ImmunityLevels
                                    id={user._id}
                                />
                            </Modal>
                            <TableCell
                                className={classes.cell}
                                align="center"
                                style={{
                                    backgroundColor: isFlagSpec ? 'green' : 'red'
                                }}
                            />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
};

export default Dashboard;