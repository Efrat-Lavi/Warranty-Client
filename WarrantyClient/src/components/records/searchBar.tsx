
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../redux/store";
import recordSlice from "../../redux/recordSlice";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

const SearchBar = () => {
    const dispatch = useDispatch();
    const searchQuery = useSelector((state: StoreType) => state.records.searchQuery);

    return (
        <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        {/* <IconButton sx={{ p: '10px' }} aria-label="menu">
          <MenuIcon />
        </IconButton> */}
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
       
        {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
        {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <DirectionsIcon />
        </IconButton> */}
      </Paper>
        // <input
        //     type="text"
        //     placeholder="Search..."
        //     value={searchQuery}
        //     onChange={(e) => dispatch(recordSlice.actions.setSearchQuery(e.target.value))}
        //     className="p-2 border rounded bg-gray-800 text-white"
        // />
    );
};
export default SearchBar;
