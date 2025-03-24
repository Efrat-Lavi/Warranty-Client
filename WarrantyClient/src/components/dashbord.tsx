// // import { useState, useEffect } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import { AddDispatch, StoreType } from "../redux/store";
// // import { Box, Typography, Button, Paper } from "@mui/material";
// // import { ArrowBack, ArrowForward } from "@mui/icons-material";
// // import dayjs from "dayjs";
// // import { getRecords } from "../redux/recordSlice";

// // const Dashboard = () => {
// //   const dispatch:AddDispatch = useDispatch();
// //   const { records, loading } = useSelector((state: StoreType) => state.records);
// //   const { user, token } = useSelector((state: StoreType) => state.auth);

// //   const [currentMonth, setCurrentMonth] = useState(dayjs());

// //   useEffect(() => {
// //     if (user && token) dispatch(getRecords({ token, userId: user.id }))
// //   }, [dispatch, user, token])

// //   const handlePrevMonth = () => setCurrentMonth((prev) => prev.subtract(1, "month"));
// //   const handleNextMonth = () => setCurrentMonth((prev) => prev.add(1, "month"));

// //   const filteredRecords = records.filter((record) =>
// //     dayjs(record.warranty.expirationDate).isSame(currentMonth, "month")
// //   );

// //   return (
// //     <Box sx={{ p: 3 }}>
// //       <Box display="flex" alignItems="center" justifyContent="space-between">
// //         <Button onClick={handlePrevMonth} startIcon={<ArrowBack />} variant="outlined">
// //           Previous
// //         </Button>
// //         <Typography variant="h5">{currentMonth.format("MMMM YYYY")}</Typography>
// //         <Button onClick={handleNextMonth} endIcon={<ArrowForward />} variant="outlined">
// //           Next
// //         </Button>
// //       </Box>

// //       <Box sx={{ mt: 3 }}>
// //         {loading ? (
// //           <Typography>Loading...</Typography>
// //         ) : filteredRecords.length === 0 ? (
// //           <Typography>No warranties expiring this month.</Typography>
// //         ) : (
// //           filteredRecords.map((record) => (
// //             <Paper key={record.id} sx={{ p: 2, mt: 2 }}>
// //               <Typography variant="h6">{record.warranty.nameProduct}</Typography>
// //               <Typography>Company: {record.warranty.company}</Typography>
// //               <Typography>Expiration: {dayjs(record.warranty.expirationDate).format("DD/MM/YYYY")}</Typography>
// //             </Paper>
// //           ))
// //         )}
// //       </Box>
// //     </Box>
// //   );
// // };

// // export default Dashboard;
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Box, Typography, Button, Paper, Grid, Link } from "@mui/material";
// import { ArrowBack, ArrowForward } from "@mui/icons-material";
// import dayjs from "dayjs";
// import { getRecords } from "../redux/recordSlice";
// import { useNavigate } from "react-router-dom";
// import { AddDispatch, StoreType } from "../redux/store";

// const Dashboard = () => {
//   const dispatch: AddDispatch = useDispatch();
//   const navigate = useNavigate();
//   const { records, loading } = useSelector((state: StoreType) => state.records);
//   const { user, token } = useSelector((state: StoreType) => state.auth);

//   const [currentMonth, setCurrentMonth] = useState(dayjs());

//   useEffect(() => {
//     if (user && token) dispatch(getRecords({ token, userId: user.id }));
//   }, [dispatch, user, token]);

//   const handlePrevMonth = () => setCurrentMonth((prev) => prev.subtract(1, "month"));
//   const handleNextMonth = () => setCurrentMonth((prev) => prev.add(1, "month"));

//   // מציאת כל הימים בחודש
//   const startOfMonth = currentMonth.startOf("month");
//   const endOfMonth = currentMonth.endOf("month");
//   const daysInMonth = endOfMonth.date();
//   const firstDayOfWeek = startOfMonth.day(); // 0 - ראשון, 6 - שבת

//   // מיפוי תעודות אחריות לפי תאריכים
//   const warrantiesByDate: { [key: string]: any[] } = {};
//   records.forEach((record) => {
//     const dateKey = dayjs(record.warranty.expirationDate).format("YYYY-MM-DD");
//     if (!warrantiesByDate[dateKey]) warrantiesByDate[dateKey] = [];
//     warrantiesByDate[dateKey].push(record);
//   });

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* ניווט בין חודשים */}
//       <Box display="flex" alignItems="center" justifyContent="space-between">
//         <Button onClick={handlePrevMonth} startIcon={<ArrowBack />} variant="outlined">
//           Previous
//         </Button>
//         <Typography variant="h5">{currentMonth.format("MMMM YYYY")}</Typography>
//         <Button onClick={handleNextMonth} endIcon={<ArrowForward />} variant="outlined">
//           Next
//         </Button>
//       </Box>

//       {/* הצגת לוח השנה */}
//       <Grid container spacing={1} sx={{ mt: 3 }}>
//         {/* שמות ימות השבוע */}
//         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//           <Grid item xs={1.71} key={day}>
//             <Typography variant="subtitle1" sx={{ fontWeight: "bold", textAlign: "center" }}>
//               {day}
//             </Typography>
//           </Grid>
//         ))}

//         {/* ימים ריקים בתחילת החודש */}
//         {Array.from({ length: firstDayOfWeek }).map((_, i) => (
//           <Grid item xs={1.71} key={`empty-${i}`} />
//         ))}

//         {/* יצירת הימים בחודש */}
//         {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
//           const date = startOfMonth.add(dayIndex, "day");
//           const dateKey = date.format("YYYY-MM-DD");
//           const warranties = warrantiesByDate[dateKey] || [];

//           return (
//             <Grid item xs={1.71} key={dateKey}>
//               <Paper sx={{ p: 1, minHeight: 80, textAlign: "center", backgroundColor: "#f9f9f9" }}>
//                 <Typography variant="subtitle2">{date.format("D")}</Typography>
//                 {warranties.map((record) => (
//                   <Link
//                     key={record.id}
//                     onClick={() => navigate(`/record/${record.id}`)}
//                     sx={{ display: "block", color: "primary.main", cursor: "pointer" }}
//                   >
//                     {record.warranty.nameProduct}
//                   </Link>
//                 ))}
//               </Paper>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </Box>
//   );
// };

// export default Dashboard;
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Button, Paper, Grid, Card, CardContent, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward, EventNote } from "@mui/icons-material";
import dayjs from "dayjs";
import { getRecords } from "../redux/recordSlice";
import { useNavigate } from "react-router-dom";
import { AddDispatch, StoreType } from "../redux/store";

const Dashboard = () => {
  const dispatch: AddDispatch = useDispatch();
  const navigate = useNavigate();
  const { records, loading } = useSelector((state: StoreType) => state.records);
  const { user, token } = useSelector((state: StoreType) => state.auth);

  const [currentMonth, setCurrentMonth] = useState(dayjs());

  useEffect(() => {
    if (user && token) dispatch(getRecords({ token, userId: user.id }));
  }, [dispatch, user, token]);

  const handlePrevMonth = () => setCurrentMonth((prev) => prev.subtract(1, "month"));
  const handleNextMonth = () => setCurrentMonth((prev) => prev.add(1, "month"));

  // מציאת כל הימים בחודש
  const startOfMonth = currentMonth.startOf("month");
  const daysInMonth = currentMonth.daysInMonth();
  const firstDayOfWeek = startOfMonth.day(); // 0 - ראשון, 6 - שבת

  // מיפוי תעודות אחריות לפי תאריכים
  const warrantiesByDate: { [key: string]: any[] } = {};
  records.forEach((record) => {
    const dateKey = dayjs(record.warranty.expirationDate).format("YYYY-MM-DD");
    if (!warrantiesByDate[dateKey]) warrantiesByDate[dateKey] = [];
    warrantiesByDate[dateKey].push(record);
  });

  return (
    <Box sx={{ p: 3 }}>
      {/* ניווט בין חודשים */}
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Button onClick={handlePrevMonth} startIcon={<ArrowBack />} variant="contained" color="primary">
          Previous
        </Button>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "primary.main" }}>
          {currentMonth.format("MMMM YYYY")}
        </Typography>
        <Button onClick={handleNextMonth} endIcon={<ArrowForward />} variant="contained" color="primary">
          Next
        </Button>
      </Box>

      {/* הצגת לוח השנה */}
      <Grid container spacing={1} sx={{ mt: 2 }}>
        {/* שמות ימות השבוע */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <Grid item xs={1.71} key={day}>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold", textAlign: "center", color: "gray" }}>
              {day}
            </Typography>
          </Grid>
        ))}

        {/* ימים ריקים בתחילת החודש */}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <Grid item xs={1.71} key={`empty-${i}`} />
        ))}

        {/* יצירת הימים בחודש */}
        {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
          const date = startOfMonth.add(dayIndex, "day");
          const dateKey = date.format("YYYY-MM-DD");
          const warranties = warrantiesByDate[dateKey] || [];

          return (
            <Grid item xs={1.71} key={dateKey}>
              <Card
                sx={{
                  p: 1,
                  minHeight: 90,
                  textAlign: "center",
                  backgroundColor: warranties.length > 0 ? "#fff8e1" : "#f9f9f9",
                  boxShadow: warranties.length > 0 ? "0px 4px 10px rgba(0,0,0,0.2)" : "none",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: "0px 6px 15px rgba(0,0,0,0.3)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                    {date.format("D")}
                  </Typography>
                  {warranties.map((record) => (
                    <Box
                      key={record.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "primary.light",
                        borderRadius: "8px",
                        p: 1,
                        mb: 0.5,
                        cursor: "pointer",
                        transition: "0.2s",
                        "&:hover": {
                          backgroundColor: "primary.main",
                          color: "white",
                        },
                      }}
                      onClick={() => navigate(`/record/${record.id}`)}
                    >
                      <IconButton size="small" color="inherit">
                        <EventNote />
                      </IconButton>
                      <Typography variant="body2" sx={{ fontWeight: "bold", ml: 1 }}>
                        {record.warranty.nameProduct}
                      </Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Dashboard;
