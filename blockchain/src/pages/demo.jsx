// LiveChatIcon.js
import React, { useState, useRef, useEffect } from 'react';
import { styled } from '@mui/system';
import { IconButton, Popover, Typography, Input, Button, List, ListItem, ListItemText } from '@mui/material';
import { Chat as ChatIcon, Close as CloseIcon } from '@mui/icons-material';

const ChatIconButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

const ChatPopover = styled(Popover)(({ theme }) => ({
  padding: theme.spacing(2),
  minWidth: '300px', // Minimum width of the popover
  minHeight: '300px', // Minimum height of the popover
  display: 'flex',
  flexDirection: 'column',
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

const InputContainer = styled('div')({
  marginTop: 'auto', // Align the input field and button at the bottom
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

const ScrollableList = styled(List)(({ theme }) => ({
  overflowY: 'auto',
  flex: '1 1 auto',
  maxHeight: '300px', // Maximum height of the chat messages list
}));

const LiveChatIcon = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [chat, setChat] = useState('');
  const [messages, setMessages] = useState([]);
  const messageListRef = useRef(null);

  const handleSubmitChat = (e) => {
    setChat(e.target.value);
  }

  const handleSendMessage = () => {
    // Handle sending the message (submit action)
    if (chat.trim() !== '') {
      setMessages([...messages, chat]); // Add the new message to the array of messages
      setChat(''); // Clear the chat input after sending
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    // Scroll to the bottom of the message list when new messages are added
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  // Calculate popover position dynamically based on window size
  const getPopoverPosition = () => ({
    top: '10%',
    left: '40%',
    transform: 'translate(-10%, -50%)',
  });

  return (
    <div>
      <ChatIconButton
        color="primary"
        aria-label="chat"
        onClick={handleClick}
      >
        <ChatIcon />
      </ChatIconButton>
      <ChatPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{ style: { ...getPopoverPosition(), minWidth: '300px', minHeight: '300px' } }}
      >
        <CloseButton onClick={handleClose} aria-label="close">
          <CloseIcon />
        </CloseButton>
        <div>
          <Typography variant="h6" gutterBottom>
            Live Chat
          </Typography>
          <Typography variant="body1">
            This is the live chat window.
          </Typography>
        </div>
        <ScrollableList ref={messageListRef}>
          {messages.map((message, index) => (
            <ListItem key={index}>
              <ListItemText primary={message} />
            </ListItem>
          ))}
        </ScrollableList>
        <InputContainer>
          <Input value={chat} onChange={handleSubmitChat} placeholder="Type your message..." />
          <Button variant="contained" onClick={handleSendMessage} color="primary" sx={{ marginLeft: '20px' }}>
            Send
          </Button>
        </InputContainer>
      </ChatPopover>
    </div>
  );
};

export default LiveChatIcon;
