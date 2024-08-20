// src/components/ExampleComponent.js
import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Box, Typography, Paper, Grid, List, ListItem, IconButton, Divider } from '@mui/material';
import BarChart from './components/Barchart'; // Adjust the import path as necessary
import LineChart from './components/LineChart'; // Adjust the import path as necessary
import Sidebar from './components/Sidebar'; // Import the Sidebar component
import MenuIcon from '@mui/icons-material/Menu'; // Icon for the menu toggle

const EXAMPLE_QUERY = gql`
  query ExampleQuery {
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

const ExampleComponent = () => {
  const { loading, error, data } = useQuery(EXAMPLE_QUERY);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

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

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar open={sidebarOpen} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#f5f5f5',
          p: 3,
          transition: 'margin 0.3s',
          marginLeft: { sm: sidebarOpen ? '240px' : '60px', xs: 0 },
        }}
      >
        <IconButton
          sx={{ display: { xs: 'block', sm: 'none' }, mb: 2 }}
          onClick={handleSidebarToggle}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" gutterBottom>
          Analytics Dashboard
        </Typography>
        <Grid container spacing={3}>
          {/* Charts */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2, bgcolor: '#ffffff', boxShadow: 3 }}>
              <Typography variant="h6">Footfall</Typography>
              <BarChart data={footfallData} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2, bgcolor: '#ffffff', boxShadow: 3 }}>
              <Typography variant="h6">Patient Satisfaction</Typography>
              <LineChart data={satisfactionData} />
            </Paper>
          </Grid>
          {/* Key Issues Table */}
          <Grid item xs={12}>
            <Paper sx={{ padding: 2, bgcolor: '#ffffff', boxShadow: 3 }}>
              <Typography variant="h6">Key Issues</Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {data.keyIssues.map(issue => (
                  <ListItem key={issue.description} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body1">{issue.description}</Typography>
                    <Typography variant="body1" color="textSecondary">{issue.count}</Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          {/* Monitoring Period */}
          <Grid item xs={12}>
            <Paper sx={{ padding: 2, bgcolor: '#ffffff', boxShadow: 3 }}>
              <Typography variant="h6">Monitoring Period</Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1">Day: {data.monitoringPeriod.day}</Typography>
              <Typography variant="body1">Week: {data.monitoringPeriod.week}</Typography>
              <Typography variant="body1">Month: {data.monitoringPeriod.month}</Typography>
              <Typography variant="body1">Year: {data.monitoringPeriod.year}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ExampleComponent;
