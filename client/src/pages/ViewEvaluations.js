import { Container, Typography } from "@mui/material";
import NavBar from "../components/Navbar";
import { useEffect } from "react";
import { useParams } from "react-router";
import { getEvaluations } from '../services/StudentService';

function ViewEvaluations() {
    const { classCode } = useParams();

    useEffect(() => {  
        getEvaluations(classCode)
        .then((data) => {
            console.log(data.data);
        });
    },[])

    return (
        <NavBar>
            <Container>
                <Typography variant="h5">
                    Your evaluations in this class
                </Typography>
            </Container>
        </NavBar>
    )
}

export default ViewEvaluations;