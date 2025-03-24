// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, StoreType,  } from "../redux/store";
// import { getRecords } from "../redux/recordSlice";
// import { useNavigate } from "react-router-dom";
// import { Card } from "@mui/material";

// const RecordsList = () => {
//     const user = useSelector((state: StoreType) => state.auth.user);
//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate();
//     const { records, loading, error } = useSelector((state:StoreType ) => state.records);

//     useEffect(() => {
//         console.log(user);
        
//         if (!user) return;
//         dispatch(getRecords(user.id)); 
//     }, [dispatch]);

//     if (loading) return <p className="text-gray-400 text-center">Loading...</p>;
//     if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

//     return (
//         <div className="max-w-2xl mx-auto mt-6">
//             <h2 className="text-xl font-semibold text-gray-200 mb-4">Warranty Records</h2>
//             <div className="grid gap-4">
//                 {records.map((record) => (
//                     <Card
//                         key={record.id}
//                         onClick={() => navigate(`/warranty/${record.warrantyId}`)}
//                         className="p-4 bg-gray-900 text-white rounded-lg shadow-md cursor-pointer hover:bg-gray-800 transition"
//                     >
//                         <p className="text-lg font-medium">{record.warranty.name}</p>
//                         <p className="text-gray-400 text-sm">Warranty ID: {record.warrantyId}</p>
//                     </Card>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default RecordsList;
