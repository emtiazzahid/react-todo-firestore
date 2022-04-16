import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TextField} from "@mui/material";
import { useEffect, useState} from "react";
import { db } from '../firebase_config';
import firebase from 'firebase/compat/app';
import CircularProgress from '@mui/material/CircularProgress';
import Todo from './Todo';

export default function Todos() {
    const [todos, setTodos] = useState([]);
    const [todoInput, setTodoInput] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getTodos();
    }, []);

    function getTodos() {
        setLoading(true);
        db.collection("todos").onSnapshot(function (query) {
            setTodos(
                query.docs.map( (doc) => ({
                    id: doc.id,
                    todo: doc.data().todo,
                    timestamp: doc.data().timestamp,
                    inprogress: doc.data().inprogress
                }))
            )

            setLoading(false);
        })
    }

    function addTodo(e) {
        e.preventDefault();

        db.collection('todos').add({
            inprogress: true,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            todo: todoInput
        })

        setTodoInput('');
    }

    return (
        <>
            <form onSubmit={addTodo}>
            <TextField id="standard-basic"
                       sx={{ width: 650 }}
                       label="Add new todo"
                       variant="standard"
                       value={todoInput}
                       onChange={(e) => {
                           setTodoInput(e.target.value)
                       }}
            />
            </form>
            <Table sx={{ width: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Todo</TableCell>
                        <TableCell>Created at</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {loading ?
                        <TableRow style={{textAlign: "center"}}>
                            <TableCell colSpan={4} style={{textAlign: "center"}}>
                                <CircularProgress/>
                            </TableCell>
                        </TableRow>
                        :
                        todos.map((row) => (
                            row.timestamp ?
                                <Todo key={row.id} id={row.id} timestamp={row.timestamp.seconds} inprogress={row.inprogress} todo={row.todo}/>
                            : ''
                        ))
                    }
                </TableBody>
            </Table>
        </>
    );
}
