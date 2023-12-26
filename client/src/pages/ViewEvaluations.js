import { Box, alpha, CircularProgress, Paper, TableContainer, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useTheme } from '@mui/material/styles';
import NavBar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getEvaluations } from "../services/StudentService";
import { TableHeaderCell } from '../temp/theme/StyledComponents';

function ViewEvaluations() {
  const { classCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [evaluations, setEvaluations] = useState([]);
  const theme = useTheme();
  const [totalObtainedWeightage, setTotalObtainedWeightage] = useState(0);
  const [totalWeightage, setTotalWeightage] = useState(0);

  useEffect(() => {
    getEvaluations(classCode).then((data) => {
      const newTotalObtainedWeightage = data.data.reduce((sum, evaluation) => sum + evaluation.obtainedWeightage, 0);
      const newTotalWeightage = data.data.reduce((sum, evaluation) => sum + evaluation.totalWeightage, 0);
      setTotalObtainedWeightage(newTotalObtainedWeightage);
      setTotalWeightage(newTotalWeightage);
      setEvaluations(data.data);
      setLoading(false);
    });
  }, []);

  const BarchartTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: '#f5f5f5', padding: '10px', border: '1px solid #ccc' }}>
          <p style={{ color: theme.palette.primary.main }}>
            Evaluation: {payload[0].payload.title} <br></br>
            Obtained Marks: {payload[0].value}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <NavBar>
      <Container>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Your evaluations in this class</Typography>
        <Typography variant="body1" sx={{ marginBottom: '20px' }}>Evaluations appear here once your teacher marks them. The average, minimum and maximum marks are calculated based on the marks obtained by all students in this class.</Typography>
        {loading ?
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
          </Box>
          :
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Title</TableHeaderCell>
                    <TableHeaderCell>Total Marks</TableHeaderCell>
                    <TableHeaderCell>Obtained Marks</TableHeaderCell>
                    <TableHeaderCell>Total Weightage</TableHeaderCell>
                    <TableHeaderCell>Obt. Weightage</TableHeaderCell>
                    <TableHeaderCell>Average</TableHeaderCell>
                    <TableHeaderCell>Minimum</TableHeaderCell>
                    <TableHeaderCell>Maximum</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {evaluations.map((evaluation) => (
                    <TableRow key={evaluation._id}>
                      <TableCell>{evaluation.title}</TableCell>
                      <TableCell>{evaluation.totalMarks}</TableCell>
                      <TableCell>{evaluation.obtainedMarks}</TableCell>
                      <TableCell>{evaluation.totalWeightage}</TableCell>
                      <TableCell>{evaluation.obtainedWeightage}</TableCell>
                      <TableCell>{evaluation.averageMarks}</TableCell>
                      <TableCell>{evaluation.minMarks}</TableCell>
                      <TableCell>{evaluation.maxMarks}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.2) }}>
                    <TableCell sx={{ fontWeight: 'bold' }} colSpan={3}>Total</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{totalWeightage}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{totalObtainedWeightage}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} colSpan={3}></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="h5" sx={{ marginBottom: '20px', marginTop: '20px' }}>Performance Chart</Typography>
            <ResponsiveContainer width="80%" height={300}>
              <BarChart data={evaluations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip content={<BarchartTooltip />} />
                <Bar dataKey="obtainedMarks" fill={`${theme.palette.secondary.main}66`} />              </BarChart>
            </ResponsiveContainer>
          </>
        }
      </Container>
    </NavBar>
  );
}

export default ViewEvaluations;
