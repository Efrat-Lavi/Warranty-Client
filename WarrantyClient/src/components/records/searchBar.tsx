
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../redux/store";
import recordSlice from "../../redux/recordSlice";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector((state: StoreType) => state.records.searchQuery);

    return (
        <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >

         <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search google maps' }}
          value={searchQuery}
            onChange={(e) => dispatch(recordSlice.actions.setSearchQuery(e.target.value))}
        />

      </Paper>
    );
};
export default SearchBar;
