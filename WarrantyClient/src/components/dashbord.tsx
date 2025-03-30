// // // import { useState, useEffect } from "react";
// // // import { useSelector, useDispatch } from "react-redux";
// // // import { AddDispatch, StoreType } from "../redux/store";
// // // import { Box, Typography, Button, Paper } from "@mui/material";
// // // import { ArrowBack, ArrowForward } from "@mui/icons-material";
// // // import dayjs from "dayjs";
// // // import { getRecords } from "../redux/recordSlice";

// // // const Dashboard = () => {
// // //   const dispatch:AddDispatch = useDispatch();
// // //   const { records, loading } = useSelector((state: StoreType) => state.records);
// // //   const { user, token } = useSelector((state: StoreType) => state.auth);

// // //   const [currentMonth, setCurrentMonth] = useState(dayjs());

// // //   useEffect(() => {
// // //     if (user && token) dispatch(getRecords({ token, userId: user.id }))
// // //   }, [dispatch, user, token])

// // //   const handlePrevMonth = () => setCurrentMonth((prev) => prev.subtract(1, "month"));
// // //   const handleNextMonth = () => setCurrentMonth((prev) => prev.add(1, "month"));

// // //   const filteredRecords = records.filter((record) =>
// // //     dayjs(record.warranty.expirationDate).isSame(currentMonth, "month")
// // //   );

// // //   return (
// // //     <Box sx={{ p: 3 }}>
// // //       <Box display="flex" alignItems="center" justifyContent="space-between">
// // //         <Button onClick={handlePrevMonth} startIcon={<ArrowBack />} variant="outlined">
// // //           Previous
// // //         </Button>
// // //         <Typography variant="h5">{currentMonth.format("MMMM YYYY")}</Typography>
// // //         <Button onClick={handleNextMonth} endIcon={<ArrowForward />} variant="outlined">
// // //           Next
// // //         </Button>
// // //       </Box>

// // //       <Box sx={{ mt: 3 }}>
// // //         {loading ? (
// // //           <Typography>Loading...</Typography>
// // //         ) : filteredRecords.length === 0 ? (
// // //           <Typography>No warranties expiring this month.</Typography>
// // //         ) : (
// // //           filteredRecords.map((record) => (
// // //             <Paper key={record.id} sx={{ p: 2, mt: 2 }}>
// // //               <Typography variant="h6">{record.warranty.nameProduct}</Typography>
// // //               <Typography>Company: {record.warranty.company}</Typography>
// // //               <Typography>Expiration: {dayjs(record.warranty.expirationDate).format("DD/MM/YYYY")}</Typography>
// // //             </Paper>
// // //           ))
// // //         )}
// // //       </Box>
// // //     </Box>
// // //   );
// // // };

// // // export default Dashboard;
// // import { useState, useEffect } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import { Box, Typography, Button, Paper, Grid, Link } from "@mui/material";
// // import { ArrowBack, ArrowForward } from "@mui/icons-material";
// // import dayjs from "dayjs";
// // import { getRecords } from "../redux/recordSlice";
// // import { useNavigate } from "react-router-dom";
// // import { AddDispatch, StoreType } from "../redux/store";

// // const Dashboard = () => {
// //   const dispatch: AddDispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { records, loading } = useSelector((state: StoreType) => state.records);
// //   const { user, token } = useSelector((state: StoreType) => state.auth);

// //   const [currentMonth, setCurrentMonth] = useState(dayjs());

// //   useEffect(() => {
// //     if (user && token) dispatch(getRecords({ token, userId: user.id }));
// //   }, [dispatch, user, token]);

// //   const handlePrevMonth = () => setCurrentMonth((prev) => prev.subtract(1, "month"));
// //   const handleNextMonth = () => setCurrentMonth((prev) => prev.add(1, "month"));

// //   // מציאת כל הימים בחודש
// //   const startOfMonth = currentMonth.startOf("month");
// //   const endOfMonth = currentMonth.endOf("month");
// //   const daysInMonth = endOfMonth.date();
// //   const firstDayOfWeek = startOfMonth.day(); // 0 - ראשון, 6 - שבת

// //   // מיפוי תעודות אחריות לפי תאריכים
// //   const warrantiesByDate: { [key: string]: any[] } = {};
// //   records.forEach((record) => {
// //     const dateKey = dayjs(record.warranty.expirationDate).format("YYYY-MM-DD");
// //     if (!warrantiesByDate[dateKey]) warrantiesByDate[dateKey] = [];
// //     warrantiesByDate[dateKey].push(record);
// //   });

// //   return (
// //     <Box sx={{ p: 3 }}>
// //       {/* ניווט בין חודשים */}
// //       <Box display="flex" alignItems="center" justifyContent="space-between">
// //         <Button onClick={handlePrevMonth} startIcon={<ArrowBack />} variant="outlined">
// //           Previous
// //         </Button>
// //         <Typography variant="h5">{currentMonth.format("MMMM YYYY")}</Typography>
// //         <Button onClick={handleNextMonth} endIcon={<ArrowForward />} variant="outlined">
// //           Next
// //         </Button>
// //       </Box>

// //       {/* הצגת לוח השנה */}
// //       <Grid container spacing={1} sx={{ mt: 3 }}>
// //         {/* שמות ימות השבוע */}
// //         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
// //           <Grid item xs={1.71} key={day}>
// //             <Typography variant="subtitle1" sx={{ fontWeight: "bold", textAlign: "center" }}>
// //               {day}
// //             </Typography>
// //           </Grid>
// //         ))}

// //         {/* ימים ריקים בתחילת החודש */}
// //         {Array.from({ length: firstDayOfWeek }).map((_, i) => (
// //           <Grid item xs={1.71} key={`empty-${i}`} />
// //         ))}

// //         {/* יצירת הימים בחודש */}
// //         {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
// //           const date = startOfMonth.add(dayIndex, "day");
// //           const dateKey = date.format("YYYY-MM-DD");
// //           const warranties = warrantiesByDate[dateKey] || [];

// //           return (
// //             <Grid item xs={1.71} key={dateKey}>
// //               <Paper sx={{ p: 1, minHeight: 80, textAlign: "center", backgroundColor: "#f9f9f9" }}>
// //                 <Typography variant="subtitle2">{date.format("D")}</Typography>
// //                 {warranties.map((record) => (
// //                   <Link
// //                     key={record.id}
// //                     onClick={() => navigate(`/record/${record.id}`)}
// //                     sx={{ display: "block", color: "primary.main", cursor: "pointer" }}
// //                   >
// //                     {record.warranty.nameProduct}
// //                   </Link>
// //                 ))}
// //               </Paper>
// //             </Grid>
// //           );
// //         })}
// //       </Grid>
// //     </Box>
// //   );
// // };

// // export default Dashboard;
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Box, Typography, Button, Paper, Grid, Card, CardContent, IconButton } from "@mui/material";
// import { ArrowBack, ArrowForward, EventNote } from "@mui/icons-material";
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
//   const daysInMonth = currentMonth.daysInMonth();
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
//       <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
//         <Button onClick={handlePrevMonth} startIcon={<ArrowBack />} variant="contained" color="primary">
//           Previous
//         </Button>
//         <Typography variant="h5" sx={{ fontWeight: "bold", color: "secondary.dark" }}>
//           {currentMonth.format("MMMM YYYY")}
//         </Typography>
//         <Button onClick={handleNextMonth} endIcon={<ArrowForward />} variant="contained" color="primary">
//           Next
//         </Button>
//       </Box>

//       {/* הצגת לוח השנה */}
//       <Grid container spacing={1} sx={{ mt: 2 }}>
//         {/* שמות ימות השבוע */}
//         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//           <Grid item xs={1.71} key={day}>
//             <Typography variant="subtitle1" sx={{ fontWeight: "bold", textAlign: "center", color: "gray" }}>
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
//               <Card
//                 sx={{
//                   p: 1,
//                   minHeight: 90,
//                   textAlign: "center",
//                   backgroundColor: warranties.length > 0 ? "#fff8e1" : "#f9f9f9",
//                   boxShadow: warranties.length > 0 ? "0px 4px 10px rgba(0,0,0,0.2)" : "none",
//                   transition: "0.3s",
//                   "&:hover": {
//                     transform: "scale(1.02)",
//                     boxShadow: "0px 6px 15px rgba(0,0,0,0.3)",
//                   },
//                 }}
//               >
//                 <CardContent>
//                   <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
//                     {date.format("D")}
//                   </Typography>
//                   {warranties.map((record) => (
//                     <Box
//                       key={record.id}
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         backgroundColor: "primary.light",
//                         borderRadius: "8px",
//                         p: 1,
//                         mb: 0.5,
//                         cursor: "pointer",
//                         transition: "0.2s",
//                         "&:hover": {
//                           backgroundColor: "primary.main",
//                           color: "white",
//                         },
//                       }}
//                       onClick={() => navigate(`/record/${record.id}`)}
//                     >
//                       <IconButton size="small" color="inherit">
//                         <EventNote />
//                       </IconButton>
//                       <Typography variant="body2" sx={{ fontWeight: "bold", ml: 1 }}>
//                         {record.warranty.nameProduct}
//                       </Typography>
//                     </Box>
//                   ))}
//                 </CardContent>
//               </Card>
//             </Grid>
//           );
//         })}
//       </Grid>
//     </Box>
//   );
// };

// export default Dashboard;
"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Box, Typography, Paper, Grid, Card, IconButton, alpha, Tooltip, Skeleton, useTheme, Fade } from "@mui/material"
import { Calendar, ChevronLeft, ChevronRight, Info, Shield } from "lucide-react"
import dayjs from "dayjs"
import { getRecords } from "../redux/recordSlice"
import type { AddDispatch, StoreType } from "../redux/store"
import { motion } from "framer-motion"

const MotionPaper = motion(Paper)
const MotionCard = motion(Card)

const Dashboard = () => {
  const dispatch: AddDispatch = useDispatch()
  const navigate = useNavigate()
  const { records, loading } = useSelector((state: StoreType) => state.records)
  const { user, token } = useSelector((state: StoreType) => state.auth)
  const theme = useTheme()

  const [currentMonth, setCurrentMonth] = useState(dayjs())
  const [hoveredDay, setHoveredDay] = useState<string | null>(null)

  useEffect(() => {
    if (user && token) dispatch(getRecords({ token, userId: user.id }))
  }, [dispatch, user, token])

  const handlePrevMonth = () => setCurrentMonth((prev) => prev.subtract(1, "month"))
  const handleNextMonth = () => setCurrentMonth((prev) => prev.add(1, "month"))

  // Get calendar data
  const startOfMonth = currentMonth.startOf("month")
  const daysInMonth = currentMonth.daysInMonth()
  const firstDayOfWeek = startOfMonth.day() // 0 = Sunday, 6 = Saturday

  // Map warranties by expiration date
  const warrantiesByDate: { [key: string]: any[] } = {}
  records.forEach((record) => {
    const dateKey = dayjs(record.warranty.expirationDate).format("YYYY-MM-DD")
    if (!warrantiesByDate[dateKey]) warrantiesByDate[dateKey] = []
    warrantiesByDate[dateKey].push(record)
  })

  // Get today's date for highlighting
  const today = dayjs().format("YYYY-MM-DD")

  // Count total warranties expiring this month
  const currentMonthWarranties = Object.keys(warrantiesByDate)
    .filter((date) => dayjs(date).month() === currentMonth.month() && dayjs(date).year() === currentMonth.year())
    .reduce((count, date) => count + warrantiesByDate[date].length, 0)

  return (
    <MotionPaper
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      elevation={0}
      sx={{
        p: 0,
        borderRadius: 3,
        overflow: "hidden",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 3,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Calendar size={24} color={theme.palette.primary.main} />
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Warranty Expiration Calendar
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            p: 2,
            borderRadius: 2,
            bgcolor: (theme) => alpha(theme.palette.info.main, 0.1),
            color: "info.main",
          }}
        >
          <Info size={20} />
          <Typography variant="body2">
            This calendar shows when your warranty documents expire.
            {currentMonthWarranties > 0 &&
              ` You have ${currentMonthWarranties} ${currentMonthWarranties === 1 ? "warranty" : "warranties"} expiring this month.`}
          </Typography>
        </Box>
      </Box>

      {/* Month Navigation */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 3,
          pb: 2,
        }}
      >
        <IconButton
          onClick={handlePrevMonth}
          sx={{
            width: 40,
            height: 40,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            color: "primary.main",
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
            },
          }}
        >
          <ChevronLeft size={20} />
        </IconButton>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          {currentMonth.format("MMMM YYYY")}
        </Typography>

        <IconButton
          onClick={handleNextMonth}
          sx={{
            width: 40,
            height: 40,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
            color: "primary.main",
            "&:hover": {
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
            },
          }}
        >
          <ChevronRight size={20} />
        </IconButton>
      </Box>

      {/* Calendar Grid */}
      <Box sx={{ px: 3, pb: 3 }}>
        {loading ? (
          <Grid container spacing={1}>
            {/* Weekday headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <Grid item xs={12 / 7} key={day}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    textAlign: "center",
                    color: "text.secondary",
                    py: 1,
                  }}
                >
                  {day}
                </Typography>
              </Grid>
            ))}

            {/* Skeleton days */}
            {Array.from({ length: 35 }).map((_, i) => (
              <Grid item xs={12 / 7} key={`skeleton-${i}`}>
                <Skeleton variant="rounded" height={90} sx={{ borderRadius: 2 }} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={1}>
            {/* Weekday headers */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <Grid item xs={12 / 7} key={day}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    textAlign: "center",
                    color: "text.secondary",
                    py: 1,
                  }}
                >
                  {day}
                </Typography>
              </Grid>
            ))}

            {/* Empty cells for days before the start of month */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <Grid item xs={12 / 7} key={`empty-${i}`}>
                <Box
                  sx={{
                    height: 90,
                    borderRadius: 2,
                    bgcolor: (theme) => alpha(theme.palette.background.default, 0.5),
                    border: "1px dashed",
                    borderColor: "divider",
                  }}
                />
              </Grid>
            ))}

            {/* Calendar days */}
            {Array.from({ length: daysInMonth }).map((_, dayIndex) => {
              const date = startOfMonth.add(dayIndex, "day")
              const dateKey = date.format("YYYY-MM-DD")
              const warranties = warrantiesByDate[dateKey] || []
              const isToday = dateKey === today
              const isHovered = dateKey === hoveredDay

              return (
                <Grid item xs={12 / 7} key={dateKey}>
                  <MotionCard
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      boxShadow: warranties.length > 0 || isToday ? "0px 4px 12px rgba(0, 0, 0, 0.08)" : "none",
                    }}
                    transition={{ duration: 0.3, delay: dayIndex * 0.01 }}
                    onMouseEnter={() => setHoveredDay(dateKey)}
                    onMouseLeave={() => setHoveredDay(null)}
                    sx={{
                      height: 90,
                      p: 1,
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 2,
                      border: "1px solid",
                      borderColor: isToday
                        ? "primary.main"
                        : warranties.length > 0
                          ? (theme) => alpha(theme.palette.warning.main, 0.3)
                          : "divider",
                      bgcolor: isToday
                        ? (theme) => alpha(theme.palette.primary.main, 0.05)
                        : warranties.length > 0
                          ? (theme) => alpha(theme.palette.warning.main, 0.05)
                          : "background.paper",
                      transition: "all 0.2s ease",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        borderColor:
                          warranties.length > 0
                            ? "warning.main"
                            : isToday
                              ? "primary.main"
                              : (theme) => alpha(theme.palette.primary.main, 0.3),
                        transform: "translateY(-2px)",
                        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    {/* Day number */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: isToday ? 700 : 500,
                          color: isToday ? "primary.main" : "text.primary",
                          width: 24,
                          height: 24,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          bgcolor: isToday ? (theme) => alpha(theme.palette.primary.main, 0.1) : "transparent",
                        }}
                      >
                        {date.format("D")}
                      </Typography>

                      {warranties.length > 0 && (
                        <Tooltip
                          title={`${warranties.length} ${warranties.length === 1 ? "warranty" : "warranties"} expiring`}
                        >
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              bgcolor: "warning.main",
                              color: "white",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                            }}
                          >
                            {warranties.length}
                          </Box>
                        </Tooltip>
                      )}
                    </Box>

                    {/* Warranty items */}
                    <Box
                      sx={{
                        flex: 1,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                      }}
                    >
                      {warranties.length > 0
                        ? warranties.slice(0, 2).map((record, index) => (
                            <Tooltip
                              key={record.id}
                              title={`${record.warranty.nameProduct} - ${record.warranty.company}`}
                            >
                              <Box
                                onClick={() => navigate(`/record/${record.id}`)}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.5,
                                  p: "3px 6px",
                                  borderRadius: 1,
                                  bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1),
                                  color: "warning.dark",
                                  cursor: "pointer",
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  transition: "all 0.2s ease",
                                  "&:hover": {
                                    bgcolor: "warning.main",
                                    color: "white",
                                  },
                                }}
                              >
                                <Shield size={12} />
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontWeight: 500,
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {record.warranty.nameProduct}
                                </Typography>
                              </Box>
                            </Tooltip>
                          ))
                        : isHovered && (
                            <Fade in={isHovered}>
                              <Box
                                sx={{
                                  height: "100%",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: "text.secondary",
                                    fontStyle: "italic",
                                  }}
                                >
                                  No warranties
                                </Typography>
                              </Box>
                            </Fade>
                          )}

                      {warranties.length > 2 && (
                        <Box
                          onClick={() => {
                            // Navigate to a filtered view or show a modal with all warranties for this date
                            // For now, just navigate to the first one
                            navigate(`/record/${warranties[0].id}`)
                          }}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            p: "2px 6px",
                            borderRadius: 1,
                            bgcolor: (theme) => alpha(theme.palette.warning.main, 0.05),
                            color: "warning.dark",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            "&:hover": {
                              bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1),
                            },
                          }}
                        >
                          <Typography variant="caption" sx={{ fontWeight: 500 }}>
                            +{warranties.length - 2} more
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </MotionCard>
                </Grid>
              )
            })}
          </Grid>
        )}
      </Box>
    </MotionPaper>
  )
}

export default Dashboard

