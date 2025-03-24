

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddDispatch, StoreType } from "../../redux/store";
import { getRecords } from "../../redux/recordSlice";
import CategoryFilter from "./categoryFilter";
import AddRecordButton from "./addRecored";
import RecordsList from "./recordList"
import { Box, Grid } from "@mui/material";
import SearchBar from "./searchBar";

const RecordPage = () => {
    const dispatch = useDispatch<AddDispatch>();
    const {user,token} = useSelector((state: StoreType) => state.auth);
    useEffect(() => {
        if (user && token) 
            dispatch(getRecords({ token, userId: user.id }));
    }, []);

    return (
        <>
            <Box sx={{ padding: 3 }}>
                <Grid sx={{position:"fixed", backgroundColor:"primary"}} container spacing={3} alignItems="center">
                    <Grid item sx={{display: "flex", gap: 2, flexGrow: 1 }}>
                        <SearchBar />
                        <CategoryFilter />
                    </Grid>
                    <Grid item>
                        <AddRecordButton />
                    </Grid>
                </Grid>

                <Box sx={{ marginTop: 10 }}>
                    <RecordsList />
                </Box>
            </Box>



        </>
    );
};
export default RecordPage;
