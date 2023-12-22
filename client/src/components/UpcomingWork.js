import React from 'react';
import { Box, Typography } from '@mui/material';
import { getTodos } from '../services/StudentService';

function UpcomingWork({ classCode }) {
    const [todos, setTodos] = React.useState([]);
    const [todosFetched, setTodosFetched] = React.useState(false); //To check if  fetched or not

    React.useEffect(() => {
        getTodos(classCode).then((data) => {
            if (data.error) {
                console.log(data.error);
                alert(data.error);
                setTodosFetched(true);
            } else {
                setTodos(data.data);
                console.log("TODOS " , data.data);
                setTodosFetched(true);
            }
        });
    }, []);


    return (
        <Box sx={{ border: '1px solid gray',width: '100%', borderRadius: '5px', mt: '10px',pt: '-20px', pb: '20px', pl: '20px', pr: '20px' }}>
            <Typography variant="h6" color="text.secondary" bgcolor="white" display="inline-block"  sx= {{ mt: '-40px'}}>
                Upcoming Work
            </Typography>
            {/* <Typography variant="body2" color="text.secondary" my={1}>
                Assignment 1
            </Typography>
            <Typography variant="body2" color="text.secondary" >
                Due: 10/10/2021
            </Typography> */}
            { todos.length === 0 ? 
                <Typography variant="body2" color="text.secondary" my={1}>
                No work due soon
                </Typography>
                :
                todos.map((todo) => <Typography variant="body2" color="text.secondary" my={1}>
                {todo.text}
                </Typography>)
                }
        </Box>
    )
}

export default UpcomingWork;