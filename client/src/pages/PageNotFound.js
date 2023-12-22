import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, CssBaseline } from '@mui/material';
import notFoundImage from '../assets/images/pagenotfound.gif';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <>
      <CssBaseline />
      <Container
        disableGutters
        maxWidth={false}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          bgcolor: '#aff0e4',
          overflow: 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }}
      >
        <img
          src={notFoundImage}
          alt="Page not found"
          sx={{
            maxWidth: '100%',
          }}
        />
        <Typography
          variant="h4"
          sx={{
            color: 'primary.main',
            fontWeight: 'bold',
            marginBottom: 2,
            marginTop: 1,
          }}
        >
          Oops, couldn't find that page.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </Container>
    </>
  );
}

export default PageNotFound;