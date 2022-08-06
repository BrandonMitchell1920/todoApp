import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  IconButton,
  Tooltip
} from '@mui/material/';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMutation } from '@apollo/client';

import { DELETE_TODO } from '../GraphQL/GqlStrings';

import Todo from '../Models/Todo';



const DeleteTodoButton = ({ selectedTodo }: { selectedTodo: Todo | undefined }) =>
{
  const [deleteTodo] = useMutation(DELETE_TODO);

  const [openDeleteTodo, setOpenDeleteTodo] = useState(false);

  return (
    <>
      <Dialog open={openDeleteTodo} onClose={() => setOpenDeleteTodo(false)}>
        <DialogContent>
          <DialogContentText>
            Delete the Todo?  This can not be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() =>
          {
            setOpenDeleteTodo(false)
            deleteTodo({ variables: { id: selectedTodo?.id } });
            window.location.reload();
          }}>
            OK
          </Button>
          <Button autoFocus onClick={() => setOpenDeleteTodo(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Tooltip title="Delete">
        {/* Span necessary for tooltip to work on disabled button */}
        <span>
          <IconButton disabled={selectedTodo === undefined} onClick={() => setOpenDeleteTodo(true)}>
            <DeleteIcon />
          </IconButton>
        </span>
      </Tooltip>
    </>
  );
}

export default DeleteTodoButton;