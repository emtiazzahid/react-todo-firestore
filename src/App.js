import * as React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import Todos from "./components/Todos";
import Center from "./components/Center";

function App() {
  return (
    <div className="App">
        <Container sx={{ display: 'flex' }}>
            <Center>
                <Todos />
            </Center>
        </Container>
    </div>
  );
}

export default App;
