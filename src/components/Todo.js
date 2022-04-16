import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {Switch, IconButton } from "@mui/material";
import { db } from '../firebase_config';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Todo({todo, timestamp, inprogress, id}) {
    function toggleTodoProgress() {
        db.collection("todos").doc(id).update({
            inprogress: !inprogress
        })
    }

    function deleteTodo() {
        db.collection("todos").doc(id).delete();
    }

    return (
        <TableRow>
            <TableCell align="left">{todo}</TableCell>
            <TableCell align="left">
                {
                    new Date(timestamp*1000).toDateString()
                }
            </TableCell>
            <TableCell>
                <Switch
                    checked={inprogress}
                    onChange={toggleTodoProgress}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </TableCell>
            <TableCell>
                <IconButton
                    onClick={deleteTodo}
                    aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}
