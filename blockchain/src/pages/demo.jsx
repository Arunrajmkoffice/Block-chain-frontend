// LiveChatIcon.js
import React, { useState } from 'react';
import { styled } from '@mui/system';
import { IconButton, Popover, Typography } from '@mui/material';
import { Chat as ChatIcon, Close as CloseIcon } from '@mui/icons-material';

const ChatIconButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

const ChatPopover = styled(Popover)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

const LiveChatIcon = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
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
      </ChatPopover>
    </div>
  );
};

export default LiveChatIcon;
