import './App.css';
import {UserNotes, AppBar, NotesPosted} from './components';
import { Box } from "@mui/material";
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Router>
      <div className="App">
        <AppBar/>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            height: "100vh",
            padding: "50px"
          }}
        >
          
            <Routes>
                <Route path="/usernotes" element={<UserNotes />} />
                <Route path="/allnotes" element={<NotesPosted />} />
            </Routes>
        
        </Box>
      </div>
    </Router>
  );
}

export default App;