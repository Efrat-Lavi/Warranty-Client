// import { useDispatch, useSelector } from "react-redux";
// import { StoreType } from "../../redux/store";
// import recordSlice from "../../redux/recordSlice";
// import Paper from '@mui/material/Paper';
// import InputBase from '@mui/material/InputBase';
// import IconButton from '@mui/material/IconButton';
// import SearchIcon from '@mui/icons-material/Search';

// const SearchBar = () => {
//     const dispatch = useDispatch();
//     const searchQuery = useSelector((state: StoreType) => state.records.searchQuery);

//     return (
//         <Paper
//         component="form"
//         sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
//       >

//          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
//           <SearchIcon />
//         </IconButton>
//         <InputBase
//           sx={{ ml: 1, flex: 1 }}
//           placeholder="Search..."
//           inputProps={{ 'aria-label': 'search google maps' }}
//           value={searchQuery}
//             onChange={(e) => dispatch(recordSlice.actions.setSearchQuery(e.target.value))}
//         />

//       </Paper>
//     );
// };
// export default SearchBar;
"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { StoreType } from "../../redux/store"
import recordSlice from "../../redux/recordSlice"
import Paper from "@mui/material/Paper"
import InputBase from "@mui/material/InputBase"
import IconButton from "@mui/material/IconButton"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import { Collapse, Box, Tooltip } from "@mui/material"

const SearchBar = () => {
  const dispatch = useDispatch()
  const searchQuery = useSelector((state: StoreType) => state.records.searchQuery)
  const [isOpen, setIsOpen] = useState(false)

  const handleToggleSearch = () => {
    setIsOpen(!isOpen)
    // Clear search when closing
    if (isOpen && searchQuery) {
      dispatch(recordSlice.actions.setSearchQuery(""))
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(recordSlice.actions.setSearchQuery(e.target.value))
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {/* Search Icon Button */}
      {!isOpen && (
                <Tooltip title="Search" >
        
        <IconButton
          onClick={handleToggleSearch}
          sx={{
            p: "10px",
            color: "primary.main",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
          aria-label="open search"
        >
          <SearchIcon />
        </IconButton>
        </Tooltip>
      )}

      {/* Expandable Search Bar */}
      <Collapse in={isOpen} orientation="horizontal">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
            ml: 1,
            boxShadow: 2,
            borderRadius: 2,
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <IconButton onClick={handleToggleSearch} sx={{ p: "10px" }} aria-label="close search">
            <CloseIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search warranties..."
            inputProps={{ "aria-label": "search warranties" }}
            value={searchQuery}
            onChange={handleSearchChange}
            autoFocus
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Collapse>
    </Box>
  )
}

export default SearchBar
