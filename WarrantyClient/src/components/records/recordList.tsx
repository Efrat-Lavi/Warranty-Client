
// import { Card } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, StoreType } from "../../redux/store";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getRecords } from "../../redux/recordSlice";
// import { string } from "yup";

// const RecordsList = () => {
//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate();

//     const {user,token} = useSelector((state: StoreType) => state.auth);
//     const { records, searchQuery, selectedCategory, loading, error } = useSelector((state: StoreType) => state.records);

//     // State לרשימה המסוננת
//     const [filteredRecords, setFilteredRecords] = useState(records);

//     useEffect(() => {
//         console.log("load", user);
//         if (user && token) 
//             dispatch(getRecords({ token, userId: user.id }));
//     }, []);

//     useEffect(() => {
//         console.log("change");
//         const filtered = records.filter((record) => {
//             const matchesSearch = record.warranty.nameProduct.toLowerCase().includes(searchQuery.toLowerCase());
//             const matchesCategory = selectedCategory ? record.warranty.category === selectedCategory : true;
//             return matchesSearch && matchesCategory;
//         });
//         setFilteredRecords(filtered); // עדכון ה-state עם התוצאה המסוננת
//     }, [records, searchQuery, selectedCategory]);

//     if (!filteredRecords.length) return <p className="text-gray-400 text-center">No records found.</p>;

//     return (
//         <div className="grid gap-4" style={{ width: "100%" }}>
//             {filteredRecords.map((record) => (
//                 <Card
//                     key={record.id}
//                     onClick={() => navigate(`/warranty/${record.id}`)}
//                     className="p-4 bg-gray-900 text-white rounded-lg shadow-md cursor-pointer hover:bg-gray-800 transition"
//                 >
//                     <p className="text-lg font-medium">{record.warranty.nameProduct}</p>
//                     <p className="text-gray-400 text-sm">Company: {record.warranty.company}</p>
//                     <p className="text-gray-400 text-sm">Expiration: {new Date(record.warranty.expirationDate).toDateString()}</p>
//                 </Card>
//             ))}
//         </div>
//     );
// };

// export default RecordsList;
import { Card, Chip, Typography, Box, Skeleton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import type { AddDispatch, StoreType } from "../../redux/store"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getRecords } from "../../redux/recordSlice"
import { CalendarIcon, BuildingIcon } from "lucide-react"

const RecordsList = () => {
  const dispatch = useDispatch<AddDispatch>()
  const navigate = useNavigate()

  const { user, token } = useSelector((state: StoreType) => state.auth)
  const { records, searchQuery, selectedCategory, loading, error } = useSelector((state: StoreType) => state.records)

  // State for filtered list
  const [filteredRecords, setFilteredRecords] = useState(records)

  useEffect(() => {
    if (user && token) dispatch(getRecords({ token, userId: user.id }))
  }, [dispatch, user, token])

  useEffect(() => {
    const filtered = records.filter((record) => {
      const matchesSearch = record.warranty.nameProduct.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory ? record.warranty.category === selectedCategory : true
      return matchesSearch && matchesCategory
    })
    setFilteredRecords(filtered)
  }, [records, searchQuery, selectedCategory])

  if (loading) {
    return (
      <div className="space-y-4 w-full">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-4 rounded-lg shadow-sm border border-gray-100">
            <Skeleton variant="text" width="60%" height={28} />
            <Skeleton variant="text" width="40%" height={20} />
            <Skeleton variant="text" width="30%" height={20} />
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Box className="text-center p-6 bg-red-50 rounded-lg">
        <Typography color="error">Error loading warranty records: {error}</Typography>
      </Box>
    )
  }

  if (!filteredRecords.length) {
    return (
      <Box className="text-center p-8 bg-gray-50 rounded-lg border border-gray-100">
        <Typography className="text-gray-500">
          No warranty records found. Add your first warranty document to get started.
        </Typography>
      </Box>
    )
  }

  const isExpired = (date: string) => {
    return new Date(date) < new Date()
  }

  return (
    <div className="space-y-3 w-full">
      {filteredRecords.map((record) => {
        const expired = isExpired(record.warranty.expirationDate)

        return (
          <Card
            key={record.id}
            onClick={() => navigate(`/record/${record.id}`)}
            className="p-5 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer"
            sx={{
              "&:hover": {
                borderColor: "rgba(0, 0, 0, 0.12)",
              },
            }}
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <Typography variant="h6" className="font-medium text-gray-900">
                  {record.warranty.nameProduct}
                </Typography>

                <div className="flex items-center text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <BuildingIcon size={16} className="mr-1.5" />
                    <Typography variant="body2">{record.warranty.company}</Typography>
                  </div>

                  <div className="flex items-center">
                    <CalendarIcon size={16} className="mr-1.5" />
                    <Typography variant="body2">
                      {new Date(record.warranty.expirationDate).toLocaleDateString()}
                    </Typography>
                  </div>
                </div>
              </div>

              <Chip
                label={expired ? "Expired" : "Valid"}
                size="small"
                color={expired ? "error" : "success"}
                sx={{
                  fontWeight: 500,
                  backgroundColor: expired ? "rgba(239, 68, 68, 0.1)" : "rgba(34, 197, 94, 0.1)",
                  color: expired ? "rgb(220, 38, 38)" : "rgb(22, 163, 74)",
                  borderRadius: "4px",
                }}
              />
            </div>

            {record.warranty.category && (
              <Typography variant="body2" className="mt-2 text-gray-400">
                Category: {record.warranty.category}
              </Typography>
            )}
          </Card>
        )
      })}
    </div>
  )
}

export default RecordsList

