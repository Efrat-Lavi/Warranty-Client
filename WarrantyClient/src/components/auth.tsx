// import { useState } from 'react';
// import { TextField, Button, Container, Typography, Paper } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { login } from '../redux/userSlice';
// import { useNavigate } from 'react-router-dom';

// function Auth() {
//   const [name, setName] = useState('');
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     if (name.trim()) {
//       dispatch(login({ name }));
//       navigate('/');
//     }
//   };

//   return (
//     <Container maxWidth="xs">
//       <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', mt: 5 }}>
//         <Typography variant="h5" gutterBottom>Login / Sign Up</Typography>
//         <TextField 
//           label="Enter your name" 
//           variant="outlined" 
//           fullWidth 
//           value={name} 
//           onChange={(e) => setName(e.target.value)} 
//           sx={{ mb: 2 }}
//         />
//         <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>
//           Continue
//         </Button>
//       </Paper>
//     </Container>
//   );
// }

// export default Auth;
