// import { Button, Container, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { StoreType } from '../redux/store';

// function Home() {
//   const navigate = useNavigate();
//   const { list: usersList, loading, error } = useSelector((store: StoreType) => store.users);

//   const dispatch = useDispatch();

//   return (
//     <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
//       <Typography variant="h4" gutterBottom>Welcome to Warranty Keeper</Typography>
//       {user ? (
//         <>
//           <Typography variant="h6">Hello, {user.}!</Typography>
//           <Button 
//             variant="contained" 
//             color="secondary" 
//             onClick={() => dispatch(logout())} 
//             sx={{ mt: 2 }}
//           >
//             Logout
//           </Button>
//         </>
//       ) : (
//         <Button 
//           variant="contained" 
//           color="primary" 
//           onClick={() => navigate('/auth')} 
//           sx={{ mt: 2 }}
//         >
//           Login / Sign Up
//         </Button>
//       )}
//     </Container>
//   );
// }

// export default Home;
