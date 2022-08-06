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
import EditIcon from '@mui/icons-material/Edit';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useMutation } from '@apollo/client';

import { UPDATE_TODO } from '../GraphQL/GqlStrings';

import Todo from '../Models/Todo';



// This is pretty much the AddTodoButton's code with a few minor modifications,
// I felt it was easier to copy and paste it over for now
const EditTodoButton = ({ selectedTodo }: { selectedTodo: Todo | undefined }) =>
{
  const [updateTodo] = useMutation(UPDATE_TODO);

  const [openEditTodo, setOpenEditTodo] = useState(false);

  // Null coalescing unnecessary, won't show if selectedTodo undefined but needed so Typescript doesn't complain
  const [title, setTitle] = useState(selectedTodo?.title ?? "");
  const [description, setDescription] = useState(selectedTodo?.description ?? "");
  const [status, setStatus] = useState(selectedTodo?.status ?? "Todo");
  const [dueDate, setDueDate] = useState(selectedTodo?.dueDate ?? new Date());

  return (
    <>
      <Dialog fullWidth maxWidth="lg" open={openEditTodo}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            margin="normal"
            autoComplete="off"
            type="text"
            label="Title"
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
              alert("Title and description must be filled out.");
            }
            else
            {
              setOpenEditTodo(false);
              updateTodo({ variables: { id: selectedTodo?.id, title: title, description: description, status: status, dueDate: dueDate } });
              window.location.reload();
            }
          }}>
            Save
          </Button>
          <Button onClick={() => setOpenEditTodo(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Tooltip title="Edit Todo">
        <span>
          <IconButton disabled={selectedTodo === undefined} onClick={() =>
          {
            // Need to reset the state to the selected todo so the first todo selected isn't always present
            setTitle(selectedTodo?.title ?? "");
            setDescription(selectedTodo?.description ?? "");
            setStatus(selectedTodo?.status ?? "Todo");
            setDueDate(selectedTodo?.dueDate ?? new Date());
            setOpenEditTodo(true)
          }}>
            <EditIcon />
          </IconButton>
        </span>
      </Tooltip>
    </>
  );
}

export default EditTodoButton;