import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import { Box, Paper, Grid, Button, TextField } from "@mui/material";
import axios from 'axios';
import { useEffect, useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body1,
    padding: theme.spacing(2),
    textAlign: "center",
    height: '150px',
    width: '170px',
    color: theme.palette.text.secondary,
    backgroundColor: "seashell",
    border: "1px solid #ccc",
  }));


export default function UserNotes() {
    const [userID, setUID] = useState(localStorage.getItem("userID") || "");
    const [myNotes, setMyNotes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [noteText, setNoteText] = useState('');

    useEffect(() => {
        axios.get(`http://hyeumine.com/mynotes.php?id=${userID}`)
        .then((res) => {
            setMyNotes(res.data.notes)
        });
    }, [userID])

    const addNote = () => {
        axios
      .post(
        "http://hyeumine.com/newnote.php",
        {
          id: localStorage.getItem("userID"),
          note: noteText,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    }

    const handleAddNote = () => {
        setShowForm(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addNote();
        setMyNotes([...myNotes, [noteText]]);
        setNoteText('');
        setShowForm(false);
    };

  return (
    <>
      <Box textAlign="left">
      <h1>My Notes</h1>
        <Grid
          container
          spacing={{ xs: 2, md: 1 }}
          columns={{ xs: 4, sm: 8, md: 8 }}
        >
          {myNotes.map((note, index) => (
            <Grid item key={index}>
              <Item>
                {note[0]}
              </Item>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          sx={{
            height: "55px",
            backgroundColor: "gray",
            "&:hover": {
              backgroundColor: "silver",
            },
          }}
          onClick={handleAddNote}
        >
          Add
        </Button>
        {showForm && (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Note"
              multiline
              rows={4}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              fullWidth
              required
              variant="outlined"
              margin="normal"
            />
            <Button
            type="button"
            variant="contained"
            sx={{
              backgroundColor: "lightgray",
              "&:hover": {
                backgroundColor: "silver",
              },
              marginRight: '20px'
            }}
            onClick={() => {
              setShowForm(false);
              setNoteText('');
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: 'gray',
              '&:hover': {
                backgroundColor: 'silver',
              },
            }}
          >
            Save Note
          </Button>
          </form>
        )}
      </Box>
    </>
  );
}