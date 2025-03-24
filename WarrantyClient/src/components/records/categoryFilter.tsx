
// import { useDispatch, useSelector } from "react-redux";
// import { StoreType } from "../../redux/store";
// import recordSlice  from "../../redux/recordSlice";

// const CategoryFilter = () => {
//     const dispatch = useDispatch();
//     const selectedCategory = useSelector((state: StoreType) => state.records.selectedCategory);
//     const categories = ["Electronics", "Home Appliances", "Furniture", "Other"];

//     return (
//         <select
//             value={selectedCategory}
//             onChange={(e) => dispatch(recordSlice.actions.setSelectedCategory(e.target.value))}
//             className="p-2 border rounded bg-gray-800 text-white"
//         >
//             <option value="">All Categories</option>
//             {categories.map((category) => (
//                 <option key={category} value={category}>{category}</option>
//             ))}
//         </select>
//     );
// };
// export default CategoryFilter;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { StoreType } from '../../redux/store';
import recordSlice from '../../redux/recordSlice';

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state: StoreType) => state.records.selectedCategory);
  const categories = ['Electronics', 'Home Appliances', 'Furniture', 'Other'];

  const handleChange = (event: SelectChangeEvent<string>) => {
    dispatch(recordSlice.actions.setSelectedCategory(event.target.value));
  };

  return (
    <FormControl variant="outlined" sx={{ width: '200px', backgroundColor: '#f0f0f0' }}>
      <InputLabel id="category-label" sx={{ color: '#238636' }}>Category</InputLabel>
      <Select
        labelId="category-label"
        value={selectedCategory}
        onChange={handleChange}
        label="Category"
        sx={{
          '& .MuiSelect-icon': { color: '#238636' }, // צבע האייקון
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: '#238636' }, // גבול רגיל
            '&:hover fieldset': { borderColor: '#238636' }, // גבול בעת hover
            '&.Mui-focused fieldset': { borderColor: '#238636' }, // גבול במצב ממוקד
          },
          '& .MuiInputLabel-root': {
            color: '#238636', // צבע הלייבל
          },
          '& .MuiSelect-root': {
            color: '#238636', // צבע של הטקסט שבחרת
          },
        }}
      >
        <MenuItem value="">
          <em>All Categories</em>
        </MenuItem>
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;
