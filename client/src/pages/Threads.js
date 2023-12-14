//page to view all threads
import React from "react";


function ThreadCard() {
    return (
        <Card sx={{ width: '100%', bgcolor: 'primary.main', color: 'white', padding: '20px', marginBottom: '20px' }}>
            <CardContent>
                <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                    <CheckCircleOutlineIcon />
                    <Typography variant="h5" component="div" color="white" align={isSmallScreen ? 'center' : 'inherit'}>
                   Thread Title
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}

function Threads() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', marginBottom: '20px'}}>
            <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h5" sx={{ width: '100%', marginBottom: '10px' }}>
                    Threads You Are Subscribed To
                </Typography>            
                <ThreadCard> </ThreadCard>
                <ThreadCard> </ThreadCard>
                <ThreadCard> </ThreadCard>
            </Container>
        </Box>
    )
}