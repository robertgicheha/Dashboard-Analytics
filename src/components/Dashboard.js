// src/components/Dashboard.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Grid, Paper, Typography, Box, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import BarChart from './Barchart'; // Adjust the import path as necessary
import LineChart from './LineChart'; // Adjust the import path as necessary
import Sidebar from './Sidebar'; // Import the Sidebar component

const GET_DASHBOARD_DATA = gql`
  query {
    patientsSeen
    keyIssues {
      description
      count
    }
    monitoringPeriod {
      day
      week
      month
      year
    }
    stats {
      footfall
      patientSatisfaction
      revenue
      staffMetrics {
        name
        efficiency
        npsDelta
        reportedIssues
      }
    }
  }
`;

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_DASHBOARD_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Prepare data for charts
  const footfallData = {
    labels: ['Footfall'],
    datasets: [
      {
        label: 'Footfall',
        data: [data.stats.footfall],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const satisfactionData = {
    labels: ['Patient Satisfaction'],
    datasets: [
      {
        label: 'Patient Satisfaction',
        data: [data.stats.patientSatisfaction],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
    ],
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: '#f5f5f5', p: 3 }}
      >
        <Grid container spacing={3}>
          {/* Analytics Title */}
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Analytics Dashboard
            </Typography>
          </Grid>

          {/* Cards */}
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: '#e3f2fd' }}>
              <CardContent>
                <Typography variant="h6">Total Patients Seen</Typography>
                <Typography variant="h4">{data.patientsSeen}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: '#e3f2fd' }}>
              <CardContent>
                <Typography variant="h6">Footfall</Typography>
                <Typography variant="h4">{data.stats.footfall}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ bgcolor: '#e3f2fd' }}>
              <CardContent>
                <Typography variant="h6">Total Revenue</Typography>
                <Typography variant="h4">${data.stats.revenue}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2, bgcolor: '#ffffff' }}>
              <Typography variant="h6">Foot Fall</Typography>
              <BarChart data={footfallData} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2, bgcolor: '#ffffff' }}>
              <Typography variant="h6">Patient Satisfaction</Typography>
              <LineChart data={satisfactionData} />
            </Paper>
          </Grid>

          {/* Key Issues Table */}
          <Grid item xs={12}>
            <Paper sx={{ padding: 2, bgcolor: '#ffffff' }}>
              <Typography variant="h6">Key Issues</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Description</TableCell>
                      <TableCell align="right">Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.keyIssues.map((issue) => (
                      <TableRow key={issue.description}>
                        <TableCell component="th" scope="row">
                          {issue.description}
                        </TableCell>
                        <TableCell align="right">{issue.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Example Component */}
          <Grid item xs={12}>
            <Paper sx={{ padding: 2, bgcolor: '#ffffff' }}>
              <ExampleComponent />
            </Paper>
          </Grid>

          {/* Pie Chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2, bgcolor: '#ffffff' }}>
              <Typography variant="h6">Pie Chart</Typography>
              <PieChart /> {/* Implement the PieChart component */}
            </Paper>
          </Grid>

          {/* Gantt Chart */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2, bgcolor: '#ffffff' }}>
              <Typography variant="h6">Gantt Chart</Typography>
              <GanttChart /> {/* Implement the GanttChart component */}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
