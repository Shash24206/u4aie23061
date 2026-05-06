import React from 'react';
import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Log } from '../../../logging_middleware/src/index.js';

const FilterBar = ({ currentFilter, onFilterChange }) => {
  const handleChange = async (event, newFilter) => {
    if (newFilter !== null) {
      onFilterChange(newFilter);
      await Log('frontend', 'info', 'component', `Filter changed to ${newFilter}`);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Filter by Type
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={currentFilter}
        exclusive
        onChange={handleChange}
        size="small"
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="placement">Placement</ToggleButton>
        <ToggleButton value="result">Result</ToggleButton>
        <ToggleButton value="event">Event</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default FilterBar;
