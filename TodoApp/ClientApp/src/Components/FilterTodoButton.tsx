import { useState, Dispatch } from 'react'
import {
  Tooltip,
  IconButton,
  Popover,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

import FilterListIcon from '@mui/icons-material/FilterList';



const FilterButton = ({ filterVals, setFilterVals }: { filterVals: Array<string>, setFilterVals: Dispatch<string[]> }) =>
{
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);

  const toggleList = (val: string) =>
  {
    if (filterVals.includes(val))
    {
      setFilterVals(filterVals.filter(status => val !== status));
    }
    else
    {
      setFilterVals([...filterVals, val]);
    }
  }

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
          <FormLabel>Filter by status</FormLabel>
          <FormGroup>
            {["Todo", "In Progress", "Complete"].map((status: string) =>
              <FormControlLabel key={status}
                control={
                  <Checkbox checked={filterVals.includes(status)} onChange={() => toggleList(status)} />
                }
                label={status}
              />
            )}
          </FormGroup>
        </FormControl>
      </Popover>
      <Tooltip title="Filter Todos">
        <IconButton onClick={event => setAnchor(event.currentTarget)}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default FilterButton;