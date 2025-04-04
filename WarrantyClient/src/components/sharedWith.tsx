import { Box, Chip, IconButton, Typography } from "@mui/material"
import { Record } from "../models/record"
import { DeleteIcon } from "lucide-react";
import { AddDispatch, StoreType } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecord, getRecords } from "../redux/recordSlice";
import { useEffect, useState } from "react";

const SharedWith = ({ recordId }: { recordId: number }) => {
    const dispatch: AddDispatch = useDispatch()
    const { token ,user} = useSelector((store: StoreType) => store.auth)
    const { records } = useSelector((state: StoreType) => state.records)
    const [record, setRecord] = useState<Record>()
    const [foundRecord, setFoundRecord] = useState<Record | null>(null);

    useEffect(() => {
        console.log(records);
        
        if (records.length > 0 && recordId) {
            const r = records.find((r:Record) => r.id === +recordId);
            console.log(r);
            
            setFoundRecord(r ?? null);
        }
    }, [records, recordId]);
    
    useEffect(() => {
        console.log(foundRecord);
        
        if (foundRecord) {
            setRecord(foundRecord);
        }
    }, [foundRecord]);

    const handleRemoveShare = async (recordToRemove: Record) => {
        if (token) {
            await dispatch(deleteRecord({ token, recordId: recordToRemove.id }))
            .then(() => {
                if(user&&user.id)
                dispatch(getRecords({ token, userId: user?.id })); 
            });
        }
    };

    return (
      
            <Box sx={{ mt: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Shared with:
                </Typography>


                {record?.warranty.records.map((record) => (
                    record.roleWarranty != "OWNER" && <Box
                        key={record.user.id}
                        sx={{
                            width:"80%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            py: 1.5,
                            borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
                            "&:last-child": {
                                borderBottom: "none",
                            },
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center" }}>

                            <Box
                                sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                    backgroundColor: "primary.main",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mr: 2,
                                    color: "white",
                                    fontSize: "0.875rem",
                                    fontWeight: 600,
                                }}
                            >
                                {record.user.nameUser.charAt(0)}
                            </Box>
                            <Box>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                    {record.user.nameUser}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.75rem" }}>
                                    {record.user.email}
                                </Typography>
                            </Box>
                        </Box>
                        <Chip
                            label={record.roleWarranty}
                            size="small"
                            sx={{
                                fontWeight: 500,
                                backgroundColor: "rgba(0, 0, 0, 0.04)",
                                color: "text.primary",
                            }}
                        />
                        <IconButton color="error" onClick={() => handleRemoveShare(record)} sx={{ ml: 2 }}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                ))}
            </Box>
     )

}
export default SharedWith
