import React, { useEffect, useState } from "react";
import { getAllAttendance } from "../services/StudentService";
import NavBar from "../components/Navbar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, LabelList } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { Typography,Box, Container } from "@mui/material";

const ATTENDANCE_THRESHOLD = 80;
const green = '#7cbf6b';
const red = '#b83d30';

function ViewAllAttendance() {
    const [attendance, setAttendance] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllAttendance().then(data => {
            const attendanceData = data.data.map(item => {
                const totalLectures = item.lectures.length;
                const totalPresents = item.lectures.filter(lecture => lecture.status === 'P').length;
                const presentPercentage = (totalPresents / totalLectures) * 100;

                return {
                    classCode: item.classCode,
                    presentPercentage,
                };
            });

            setAttendance(attendanceData);
        });
    }, []);

    function BarchartLabel(props) {
        const { x, y, value, width, height } = props;
        const onClick = () => {
            navigate(`/student/classes/${value}/attendance`);
        };

        return (
            <foreignObject x={x + width / 2 - 50} y={y + height} width={100} height={30}>
                <div onClick={onClick} style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    color: 'primary',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    padding: '10px',
                    textDecoration: 'underline',
                }}>
                    {value}
                </div>
            </foreignObject>
        );
    }

    function BarchartTooltip({ payload, active }) {
        if (active && payload && payload.length) {
            return (
                <div style={{ backgroundColor: '#fff', border: '1px solid #999', margin: 0, padding: 10 }}>
                    <p>{`Present Percentage: ${payload[0].value.toFixed(2)}%`}</p>
                </div>
            );
        }

        return null;
    }

    return (
        <NavBar>
            <Container>
                <Typography variant="h5" sx={{ marginTop: '20px', marginBottom: '20px' }}>
                    Attendance Summary for all classes
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '20px' }}>
                    Click on the classcode to view detailed attendance records and insights.
                </Typography>
                <Box sx={{ display: 'flex', marginBottom: '20px' }}>
                    <Box sx={{ width: 20, height: 20, backgroundColor: green, marginRight: '10px' }} />
                    <Typography variant="subtitle" color="text.secondary">Sufficient attendance (80% or over)</Typography>
                </Box>
                <Box sx={{ display: 'flex', marginBottom: '20px' }}>
                    <Box sx={{ width: 20, height: 20, backgroundColor: red, marginRight: '10px' }} />
                    <Typography variant="subtitle" color="text.secondary">Attendance falling short</Typography>
                </Box>
                <BarChart width={500} height={300} data={attendance}>
                    <XAxis dataKey="classCode" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip content={<BarchartTooltip />} />
                    <Bar dataKey="presentPercentage" fill={green}>
                        {attendance.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.presentPercentage >= ATTENDANCE_THRESHOLD ? green : red} />
                        ))}
                        <LabelList dataKey="classCode" content={BarchartLabel} />
                    </Bar>
                </BarChart>
            </Container>
        </NavBar>
    );
}

export default ViewAllAttendance;