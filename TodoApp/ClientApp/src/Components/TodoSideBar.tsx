import { useState, Dispatch } from 'react';
import {
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
} from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { useQuery } from '@apollo/client';

import { GET_TODOS } from '../GraphQL/GqlStrings';

import SearchBar from './SearchBar';
import FilterTodoButton from './FilterTodoButton';
import SortTodoButton from './SortTodoButton';
import AddTodoButton from './AddTodoButton';

import Todo from '../Models/Todo';



const TodoSideBar = ({ setSelectedTodo }: { setSelectedTodo: Dispatch<Todo> }) =>
{
  // useSubscription might be best and might eliminate need for whole page reload, other solutions available
  // However, whole page reload means I don't have to deal with updating several states, reload is quick enough
  // anyways, useEffect with polling might be the best
  const { loading, error, data } = useQuery(GET_TODOS);

  const [selectedMenuItemIndex, setSelectedMenuItemIndex] = useState(-1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterVals, setFilterVals] = useState([
    "Todo",
    "In Progress",
    "Complete",
  ] as string[]);
  const [sortBy, setSortBy] = useState("title");
  const [orderBy, setOrderBy] = useState("asc");

  let returnVal;

  // See also CircularProgress, Skeleton
  if (loading)
  {
    returnVal = <LinearProgress />;
  }

  else if (error)
  {
    returnVal = (
      <List>
        <ListItem disablePadding>
          <ListItemIcon style={{paddingLeft: '10px'}}>
            <ErrorIcon color="error" />
          </ListItemIcon>
          <ListItemText primary={
            <Typography noWrap color="error">
              {error.message}
            </Typography>
          }/>
        </ListItem>
      </List>
    );
  }

  else
  {
    // Consider allowing several spacing schemes (compact, cozy, comfortable, etc.)
    // Pagination might be a useful thing, though this app will never be dealing with 
    // so much data that it is necessary
    returnVal = (
      <MenuList style={{ overflow: "auto" }}>
        {data?.todos
          .filter((todo: Todo) => filterVals.includes(todo.status) && todo.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .sort((todo1: Todo, todo2: Todo) =>
          {
            let order = orderBy === "asc" ? 1 : -1;

            // dueDate is an ISO date which is sortable by default and 
            // Todo > In Progress > Complete so don't need to convert
            let first = (todo1[sortBy] as string).toLowerCase();
            let second = (todo2[sortBy] as string).toLowerCase();

            if (first < second) { return -1 * order }
            else if (first > second) { return 1 * order}
            return 0;
          })
          .map((todo: Todo, index: number) => (
            <MenuItem
              key={todo.id}
              selected={index === selectedMenuItemIndex}
              onClick={() => { setSelectedTodo(todo); setSelectedMenuItemIndex(index) }}
            >
              <Typography noWrap paddingTop={1} paddingBottom={1}>
                {todo.title}
              </Typography>
            </MenuItem>
          ))
        }
      </MenuList>
    );
  }

  return (
    <>
      <Toolbar>
        <SearchBar setSearchTerm={setSearchTerm} />
        <FilterTodoButton filterVals={filterVals} setFilterVals={setFilterVals}/>
        <SortTodoButton sortBy={sortBy} setSortBy={setSortBy} orderBy={orderBy} setOrderBy={setOrderBy}/>
        <AddTodoButton />
      </Toolbar>
      <Divider />
      {returnVal}
    </>
  );
}

export default TodoSideBar;