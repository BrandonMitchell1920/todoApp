import { Dispatch } from 'react';
import {
  Input,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';



const SearchBar = ({ setSearchTerm }: { setSearchTerm: Dispatch<string> }) =>
{
  return (
    <Input
      type="search"
      placeholder="Search Todos..."
      onChange={event => setSearchTerm(event.target.value)}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
    />
  );
}

export default SearchBar;