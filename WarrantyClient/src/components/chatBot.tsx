// import React, { useState, useRef, useEffect } from 'react';
// import {
//   Fab,
//   Drawer,
//   Box,
//   TextField,
//   IconButton,
//   Typography,
//   Paper,
//   Divider,
// } from '@mui/material';
// import ChatIcon from '@mui/icons-material/Chat';
// import SendIcon from '@mui/icons-material/Send';
// import CloseIcon from '@mui/icons-material/Close';
// import { styled } from '@mui/material/styles';

// // עיצובים מותאמים אישית עם styled
// const ChatContainer = styled(Box)(({ theme }) => ({
//   width: 350,
//   height: '80vh',
//   display: 'flex',
//   flexDirection: 'column',
//   backgroundColor: theme.palette.background.default,
// }));

// const MessagesContainer = styled(Box)({
//   flexGrow: 1,
//   overflowY: 'auto',
//   padding: '16px',
// });

// const MessageBubble = styled(Paper)(({ theme, owner }) => ({
//   padding: '8px 12px',
//   borderRadius: '20px',
//   maxWidth: '80%',
//   marginBottom: '8px',
//   wordBreak: 'break-word',
//   ...(owner === 'user' && {
//     alignSelf: 'flex-end',
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.primary.contrastText,
//     borderBottomRightRadius: 0,
//   }),
//   ...(owner === 'bot' && {
//     alignSelf: 'flex-start',
//     backgroundColor: theme.palette.grey[300],
//     color: theme.palette.text.primary,
//     borderBottomLeftRadius: 0,
//   }),
// }));

// interface Message {
//   text: string;
//   owner: 'user' | 'bot';
// }

// interface ChatbotProps {
//   onSendMessage: (message: string) => Promise<string>; // פונקציה לשליחת הודעה לשרת
// }

// const Chatbot: React.FC<ChatbotProps> = ({ onSendMessage }) => {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([
//     { text: 'שלום! איך אוכל לעזור לך היום?', owner: 'bot' },
//   ]);
//   const [input, setInput] = useState('');
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleToggleDrawer = () => {
//     setOpen(!open);
//   };

//   const handleSendMessage = async () => {
//     if (input.trim() === '') return;

//     const userMessage: Message = { text: input, owner: 'user' };
//     setMessages((prevMessages) => [...prevMessages, userMessage]);
//     setInput('');

//     try {
//       const botResponse = await onSendMessage(input); // שליחת הודעה לשרת
//       const botMessage: Message = { text: botResponse, owner: 'bot' };
//       setMessages((prevMessages) => [...prevMessages, botMessage]);
//     } catch (error) {
//       console.error('Error sending message to bot:', error);
//       const errorMessage: Message = {
//         text: 'אירעה שגיאה. נסה שוב מאוחר יותר.',
//         owner: 'bot',
//       };
//       setMessages((prevMessages) => [...prevMessages, errorMessage]);
//     }
//   };

//   const handleKeyDown = (event: React.KeyboardEvent) => {
//     if (event.key === 'Enter') {
//       handleSendMessage();
//     }
//   };

//   return (
//     <>
//       <Fab
//         color="primary"
//         aria-label="chat"
//         onClick={handleToggleDrawer}
//         sx={{ position: 'fixed', bottom: 16, right: 16 }}
//       >
//         <ChatIcon />
//       </Fab>
//       <Drawer anchor="right" open={open} onClose={handleToggleDrawer}>
//         <ChatContainer>
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               padding: '16px',
//               backgroundColor: (theme) => theme.palette.primary.main,
//               color: (theme) => theme.palette.primary.contrastText,
//             }}
//           >
//             <Typography variant="h6">צ'אט בוט</Typography>
//             <IconButton color="inherit" onClick={handleToggleDrawer}>
//               <CloseIcon />
//             </IconButton>
//           </Box>
//           <Divider />
//           <MessagesContainer>
//             {messages.map((msg, index) => (
//               <MessageBubble key={index} owner={msg.owner}>
//                 <Typography variant="body2">{msg.text}</Typography>
//               </MessageBubble>
//             ))}
//             <div ref={messagesEndRef} />
//           </MessagesContainer>
//           <Box sx={{ padding: '16px', display: 'flex', alignItems: 'center' }}>
//             <TextField
//               fullWidth
//               variant="outlined"
//               placeholder="הקלד את הודעתך..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleKeyDown}
//               size="small"
//             />
//             <IconButton
//               color="primary"
//               onClick={handleSendMessage}
//               sx={{ marginLeft: '8px' }}
//             >
//               <SendIcon />
//             </IconButton>
//           </Box>
//         </ChatContainer>
//       </Drawer>
//     </>
//   );
// };

// export default Chatbot;