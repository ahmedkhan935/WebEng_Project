import { Box, Typography, Button, Container } from "@mui/material";
import ClassesList from "../components/ClassesList";
import NavBar from "../components/Navbar";

function OldClasses() {

    return (
        <NavBar>
            <Container
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <ClassesList isFullList={true} oldList={true} />

            </Container>
        </NavBar>
    );
}

export default OldClasses;
