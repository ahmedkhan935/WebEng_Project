import React, { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import IconButton from '@mui/material/IconButton';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import { useNavigate } from 'react-router-dom';

//a component that will be rendered when an error is caught.
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDevClick = () => {
    setOpen(!open);
  };

  return (
    <Container>
      <Typography variant="h1">Something went wrong.</Typography>
      <IconButton onClick={handleDevClick}>
        <DeveloperModeIcon />
      </IconButton>
      <IconButton onClick={() => navigate(-1)}>
        <ArrowBackIcon />
      </IconButton>
      <Collapse in={open}>
        <Typography variant="body1">{error.message}</Typography>
      </Collapse>
    </Container>
  );
};

const ErrBoundary = ({ children }) => {
    //FallbackComponent is a prop that takes a component to render in case of an error
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrBoundary;