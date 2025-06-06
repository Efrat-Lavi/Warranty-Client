
// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   IconButton,
//   Menu,
//   MenuItem,
//   Tooltip
// } from '@mui/material';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { StoreType } from '../../redux/store';
// import recordSlice from '../../redux/recordSlice';

// const CategoryFilter = () => {
//   const dispatch = useDispatch();
//   const selectedCategory = useSelector((state: StoreType) => state.records.selectedCategory);
//   const categories = ['Electronics', 'Home Appliances', 'Furniture', 'Other'];

//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = (category?: string) => {
//     if (category !== undefined) {
//       dispatch(recordSlice.actions.setSelectedCategory(category));
//     }
//     setAnchorEl(null);
//   };

//   return (
//     <>
//       <Tooltip title="Filter by Category">
//         <IconButton
//           onClick={handleClick}
//           sx={{
//             color: '#238636',
//             borderRadius: '6px',
//             ml: 1,
//             '&:hover': {
//               backgroundColor: '#f0f0f0'
//             }
//           }}
//         >
//           <FilterListIcon />
//         </IconButton>
//       </Tooltip>

//       <Menu
//         anchorEl={anchorEl}
//         open={open}
//         onClose={() => handleClose()}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
//       >
//         <MenuItem onClick={() => handleClose('')}>All Categories</MenuItem>
//         {categories.map((category) => (
//           <MenuItem
//             key={category}
//             selected={selectedCategory === category}
//             onClick={() => handleClose(category)}
//           >
//             {category}
//           </MenuItem>
//         ))}
//       </Menu>
      
//     </>
//   );
// };

// export default CategoryFilter;
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  // Grow,
  Tooltip
} from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { StoreType } from '../../redux/store';
import recordSlice from '../../redux/recordSlice';

const categories = ['All', 'Electronics', 'Home Appliances', 'Furniture', 'Other'];

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: StoreType) => state.records.selectedCategory || 'All');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (category: string) => {
    dispatch(recordSlice.actions.setSelectedCategory(category === 'All' ? '' : category));
    handleClose();
  };

  return (
    <Box sx={{ mr:3,display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="body2" sx={{ color: '#238636' }}>
        {selectedCategory}
      </Typography>

      <Tooltip title="Filter by category">
        <IconButton onClick={handleClick} sx={{ color: '#238636' }}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      
      
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // TransitionComponent={Grow}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {categories.map((category) => (
          <MenuItem
            key={category}
            selected={selectedCategory === category || (selectedCategory === '' && category === 'All')}
            onClick={() => handleSelect(category)}
          >
            {category}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default CategoryFilter;
