import { useState, Dispatch } from 'react'
import {
  Tooltip,
  IconButton,
  Popover,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material';

import SortIcon from '@mui/icons-material/Sort';



// Originally was passing just a setSortFunction React.Dispatch thing down, but kept getting an error about "sortFunction"
// is not a function even though it clerly was, now just pass all this stuff down and make the sort function in the side bar
const SortButton = ({ sortBy, setSortBy, orderBy, setOrderBy }: { sortBy: string, setSortBy: Dispatch<string>, orderBy: string, setOrderBy: Dispatch<string> }) =>
{
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

  return (
    <>
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <FormControl sx={{ m: 2 }}>
          <FormLabel>Sort by</FormLabel>
          <RadioGroup
            value={sortBy}
            onChange={event => setSortBy(event.target.value)}
          >
            <FormControlLabel value="title" control={<Radio />} label="Title" />
            <FormControlLabel value="status" control={<Radio />} label="Status" />
            <FormControlLabel value="dueDate" control={<Radio />} label="Due date" />
          </RadioGroup>
        </FormControl>
        <FormControl sx={{ m: 2 }}>
          <FormLabel>Order by</FormLabel>
          <RadioGroup
            value={orderBy}
            onChange={event => setOrderBy(event.target.value)}
          >
            <FormControlLabel value="asc" control={<Radio />} label="Ascending" />
            <FormControlLabel value="desc" control={<Radio />} label="Descending" />
          </RadioGroup>
        </FormControl>
      </Popover>
      <Tooltip title="Sort Todos">
        <IconButton onClick={event => setAnchor(event.currentTarget)}>
          <SortIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default SortButton;