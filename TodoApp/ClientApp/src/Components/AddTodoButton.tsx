import { useState } from 'react';
import {
  TextField,
  Tooltip,
  IconButton,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  DialogTitle,
  Select,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useMutation } from '@apollo/client';

import { CREATE_TODO } from '../GraphQL/GqlStrings';



const AddTodoButton = () =>
{
  const [createTodo] = useMutation(CREATE_TODO);

  const [openAddTodo, setOpenAddTodo] = useState(false);

  // I wanted to avoid using state as that causes unncessarily rerenders.  However, the date picker
  // doesn't have the defaultValue attritube, and the value shown by the datepicker will only be updated
  // on a state change, so everything must be state now
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Todo");
  const [dueDate, setDueDate] = useState(new Date());

  return (
    <>
      <Dialog fullWidth maxWidth="lg" open={openAddTodo}>
        <DialogTitle>Add new Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="normal"
            autoComplete="off"
            label="Title"
            type="text"
            value={title}
            onChange={event => setTitle(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            multiline
            margin="normal"
            autoComplete="off"
            label="Description"
            type="text"
            value={description}
            onChange={event => setDescription(event.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Box style={{ display: "flex", flexDirection: "row" }}>
            <Box style={{ marginRight: "auto", marginLeft: 0 }}>
              <FormControl margin="normal" style={{ minWidth: 150 }}>
                <InputLabel id="statusSelectionBox">Status</InputLabel>
                <Select
                  labelId="statusSelectionBox"
                  label="Status"
                  value={status}
                  onChange={event => setStatus(event.target.value)}
                >
                  {["Todo", "In Progress", "Complete"].map((status: string) =>
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Box>
            <Box style={{ marginRight: 0, marginLeft: "auto" }}>
              <FormControl margin="normal">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Due date"
                    inputFormat="MM/dd/yyyy"
                    value={dueDate}
                    onChange={newDate => setDueDate(newDate as Date)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() =>
          {
            if (title.length === 0 || description.length === 0)
            {
              // Might be best to somehow warn the user on the form instead of using an alert
              alert("Title and description must be filled out.");
            }
            else
            {
              setOpenAddTodo(false);
              createTodo({ variables: { title: title, description: description, status: status, dueDate: dueDate } });
              window.location.reload();
            }
          }}>
            Save
          </Button>
          <Button onClick={() => { setOpenAddTodo(false); }}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Tooltip title="Add Todo">
        <IconButton onClick={() =>
        {
          // Since I have to use state for the date picker, I have to reset the state on open or 
          // the user's previous choices would still be there
          setTitle("");
          setDescription("");
          setStatus("Todo");
          setDueDate(new Date());
          setOpenAddTodo(true);
        }}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default AddTodoButton;