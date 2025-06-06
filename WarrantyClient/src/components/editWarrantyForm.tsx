import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    Box,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

interface EditWarrantyDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: WarrantyData) => void;
    initialData: WarrantyData;
}

export interface WarrantyData {
    nameProduct: string;
    company: string;
    expirationDate: string;
    category: string;
}

// פונקציה להמרת תאריך לפורמט YYYY-MM-DD
const formatDate = (date: string | Date): string => {
    if (!date) return ""; // אם אין תאריך, נחזיר מחרוזת ריקה
    const d = new Date(date);
    return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
};

const schema = yup.object().shape({
    nameProduct: yup.string().required("Product name is required"),
    company: yup.string().required("Company name is required"),
    expirationDate: yup.string().required("Expiration date is required"),
    category: yup.string().required("Category is required"),
});

const EditWarrantyDialog: React.FC<EditWarrantyDialogProps> = ({
    open,
    onClose,
    onSubmit,
    initialData,
}) => {
    // יצירת עותק עם תאריך בפורמט הנכון
    const formattedInitialData: WarrantyData = {
        ...initialData,
        expirationDate: formatDate(initialData.expirationDate),
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<WarrantyData>({
        resolver: yupResolver(schema),
        defaultValues: formattedInitialData,
    });

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            {/* כותרת עם כפתור סגירה */}
            <Box display="flex" alignItems="center" justifyContent="space-between" px={2} py={1}>
                <DialogTitle>Edit Warranty</DialogTitle>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* תוכן הדיאלוג */}
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        label="Product Name"
                        {...register("nameProduct")}
                        error={!!errors.nameProduct}
                        helperText={errors.nameProduct?.message}
                        fullWidth
                    />
                    <TextField
                        label="Company"
                        {...register("company")}
                        error={!!errors.company}
                        helperText={errors.company?.message}
                        fullWidth
                    />
                    <TextField
                        label="Expiration Date"
                        type="date"
                        {...register("expirationDate")}
                        error={!!errors.expirationDate}
                        helperText={errors.expirationDate?.message}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Category"
                        {...register("category")}
                        error={!!errors.category}
                        helperText={errors.category?.message}
                        fullWidth
                    />
                </Box>
            </DialogContent>

            {/* כפתורים */}
            <DialogActions>
                <Button onClick={onClose} variant="outlined">
                    Cancel
                </Button>
                <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary">
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditWarrantyDialog;
