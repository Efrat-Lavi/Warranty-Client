import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddDispatch, StoreType } from "../../redux/store";
import { getRecords } from "../../redux/recordSlice";
import CategoryFilter from "./categoryFilter";
import AddRecordButton from "./addRecored";
import RecordsList from "./recordList";
import { Box, Grid, Container, Divider } from "@mui/material";
import SearchBar from "./searchBar";

const RecordPage = () => {
    const dispatch = useDispatch<AddDispatch>();
    const { user, token } = useSelector((state: StoreType) => state.auth);

    useEffect(() => {
        if (user && token) {
            dispatch(getRecords({ token, userId: user.id }));
        }
    }, [dispatch, user, token]);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            {/* אזור הסינון והחיפוש */}
            <Grid container spacing={2} alignItems="center" sx={{ mb: 3, p: 2, borderRadius: 2 }}>
                <Grid item xs={12} sm={4} md={9} sx={{ display: "flex", gap: 2 }}>
                    <SearchBar />
                </Grid>
                <Grid item xs={12} sm={8} md={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <CategoryFilter />
                <Divider orientation="vertical" flexItem />

                    <AddRecordButton />
                </Grid>
            </Grid>
            
            {/* רשימת הרשומות */}
            <Box sx={{ mt: 2 }}>
                <RecordsList />
            </Box>
        </Container>
    );
};

export default RecordPage;
