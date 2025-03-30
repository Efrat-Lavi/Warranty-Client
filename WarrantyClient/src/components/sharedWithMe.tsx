
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Card, Typography, Box, Skeleton, Chip, Divider, alpha, Stack, Fade } from "@mui/material"
import { CalendarClock, Building2, Shield, AlertCircle, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { AddDispatch, StoreType } from "../redux/store"
import { getRecords } from "../redux/recordSlice"

const MotionCard = motion(Card)

const RecordsList = () => {
  const dispatch = useDispatch<AddDispatch>()
  const navigate = useNavigate()

  const { user, token } = useSelector((state: StoreType) => state.auth)
  const { records, searchQuery, selectedCategory, loading, error } = useSelector((state: StoreType) => state.records)

  const [filteredRecords, setFilteredRecords] = useState(records)

  useEffect(() => {
    if (user && token) dispatch(getRecords({ token, userId: user.id }))
  }, [dispatch, user, token])

  useEffect(() => {
    const filtered = records.filter((record) => {
      const matchesSearch = record.warranty.nameProduct.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory ? record.warranty.category === selectedCategory : true
      return record.roleWarranty!="OWNER"&& matchesSearch && matchesCategory
    })
    setFilteredRecords(filtered)
  }, [records, searchQuery, selectedCategory])

  if (loading) {
    return (
      <Stack spacing={2} width="100%">
        {[1, 2, 3].map((i) => (
          <Fade key={i} in={true} timeout={300 * i}>
            <Card
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                border: "1px solid rgba(0, 0, 0, 0.06)",
              }}
            >
              <Skeleton variant="rectangular" width="50%" height={28} sx={{ mb: 1, borderRadius: 1 }} />
              <Skeleton variant="rectangular" width="70%" height={20} sx={{ mb: 1, borderRadius: 1 }} />
              <Skeleton variant="rectangular" width="40%" height={20} sx={{ borderRadius: 1 }} />
            </Card>
          </Fade>
        ))}
      </Stack>
    )
  }

  if (error) {
    return (
      <Box
        sx={{
          textAlign: "center",
          p: 4,
          bgcolor: alpha("#f44336", 0.08),
          borderRadius: 2,
          border: `1px solid ${alpha("#f44336", 0.2)}`,
        }}
      >
        <AlertCircle size={32} color="#f44336" style={{ marginBottom: 12 }} />
        <Typography color="error" variant="h6" sx={{ mb: 1 }}>
          Unable to Load Warranties
        </Typography>
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      </Box>
    )
  }

  if (!filteredRecords.length) {
    return (
      <Box
        sx={{
          textAlign: "center",
          p: 5,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
          borderRadius: 2,
          border: (theme) => `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
        }}
      >
        <Shield size={40} style={{ marginBottom: 16, opacity: 0.6 }} />
        <Typography variant="h6" sx={{ mb: 1, color: "text.primary" }}>
          No Warranty Shared Found
        </Typography>
      </Box>
    )
  }

  const isExpired = (date: string) => {
    return new Date(date) < new Date()
  }

  const getTimeRemaining = (expirationDate: string) => {
    const now = new Date()
    const expDate = new Date(expirationDate)
    const diffTime = expDate.getTime() - now.getTime()

    if (diffTime < 0) return "Expired"

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    if (diffDays > 365) {
      const years = Math.floor(diffDays / 365)
      return `${years} ${years === 1 ? "year" : "years"} left`
    } else if (diffDays > 30) {
      const months = Math.floor(diffDays / 30)
      return `${months} ${months === 1 ? "month" : "months"} left`
    } else {
      return `${diffDays} ${diffDays === 1 ? "day" : "days"} left`
    }
  }

  return (
    <Stack spacing={2} width="100%">
      {filteredRecords.map((record, index) => {
        const expired = isExpired(record.warranty.expirationDate)
        const timeRemaining = getTimeRemaining(record.warranty.expirationDate)

        return (
          <MotionCard
            key={record.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => navigate(`/record/${record.id}`)}
            sx={{
              p: 0,
              overflow: "hidden",
              cursor: "pointer",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              border: "1px solid rgba(0, 0, 0, 0.06)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.09)",
                "& .arrow-icon": {
                  transform: "translateX(4px)",
                  opacity: 1,
                },
              },
            }}
          >
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: "text.primary",
                    mb: 0.5,
                  }}
                >
                  {record.warranty.nameProduct}
                </Typography>

                <Chip
                  label={expired ? "Expired" : "Active"}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    px: 1,
                    backgroundColor: expired ? alpha("#f44336", 0.1) : alpha("#10a37f", 0.1),
                    color: expired ? "#f44336" : "#10a37f",
                    borderRadius: "6px",
                    height: "24px",
                    "& .MuiChip-label": {
                      px: 1,
                    },
                  }}
                />
              </Box>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 1.5 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Building2 size={16} style={{ marginRight: 8, opacity: 0.7 }} />
                  <Typography variant="body2" color="text.secondary">
                    {record.warranty.company}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CalendarClock size={16} style={{ marginRight: 8, opacity: 0.7 }} />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(record.warranty.expirationDate).toLocaleDateString()}
                    <Typography
                      component="span"
                      sx={{
                        ml: 0.5,
                        color: expired ? "#f44336" : "#10a37f",
                        fontWeight: 500,
                      }}
                    >
                      ({timeRemaining})
                    </Typography>
                  </Typography>
                </Box>
              </Stack>

              {record.warranty.category && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.disabled",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {record.warranty.category}
                </Typography>
              )}
            </Box>

            <Divider />

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                p: 1.5,
                bgcolor: (theme) => alpha(theme.palette.background.default, 0.7),
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "primary.main",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                View Details
                <ChevronRight
                  className="arrow-icon"
                  size={16}
                  style={{
                    marginLeft: 4,
                    transition: "all 0.2s ease",
                    opacity: 0.7,
                  }}
                />
              </Typography>
            </Box>
          </MotionCard>
        )
      })}
    </Stack>
  )
}

export default RecordsList

