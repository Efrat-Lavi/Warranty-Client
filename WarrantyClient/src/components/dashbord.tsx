
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
                        ? warranties.slice(0, 2).map((record) => (
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

