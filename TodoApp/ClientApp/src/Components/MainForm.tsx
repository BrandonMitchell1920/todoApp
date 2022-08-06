import { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  TextField
} from '@mui/material';

import TodoSideBar from './TodoSideBar';
import DeleteTodoButton from './DeleteTodoButton';
import EditTodoButton from './EditTodoButton';

import Todo from '../Models/Todo';



const DRAWER_WIDTH = 360;

const MainForm = () =>
{
  const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>(undefined);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${DRAWER_WIDTH}px)`, ml: `${DRAWER_WIDTH}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" flex="1">
            {selectedTodo?.title ?? "Select a Todo!"}
          </Typography>
          <EditTodoButton selectedTodo={selectedTodo} />
          <DeleteTodoButton selectedTodo={selectedTodo} />
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        <TodoSideBar setSelectedTodo={setSelectedTodo}/>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <TextField
          multiline
          fullWidth
          label="Description"
          autoComplete="off"
          placeholder="Choose a Todo to see its description!"
          value={selectedTodo?.description ?? ""}
          InputProps={{
            spellCheck: false,
            readOnly: true,
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box style={{ display: "flex", flexDirection: "row" }}>
          <Box style={{ marginRight: "auto", marginLeft: 0 }}>
            <TextField
              label="Status"
              margin="normal"
              autoComplete="off"
              placeholder="No Todo selected."
              value={selectedTodo?.status ?? ""}
              InputProps={{
                spellCheck: false,
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box style={{ marginRight: 0, marginLeft: "auto" }}>
            <TextField
              label="Due date"
              margin="normal"
              autoComplete="off"
              placeholder="No Todo selected."
              value={(() =>
              {
                if (selectedTodo?.dueDate === undefined) { return "" }
                return new Date(selectedTodo?.dueDate as Date).toLocaleDateString();
              })()}
              InputProps={{
                spellCheck: false,
                readOnly: true,
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MainForm;