import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const SalesDashboard = () => {
  // Sample data
  const salesData = [
    { month: 'January', sales: 3000 },
    { month: 'February', sales: 4000 },
    { month: 'March', sales: 5000 },
    { month: 'April', sales: 6000 },
    { month: 'May', sales: 7000 },
    { month: 'June', sales: 8000 },
    { month: 'July', sales: 9000 },
  ];

  const maxSaleMonthData = [
    { month: 'Month', sales: 9000 },
  ];

  const topProductsData = [
    { product: 'Product A', sales: 500 },
    { product: 'Product B', sales: 300 },
    { product: 'Product C', sales: 200 },
  ];

  const minStockProductsData = [
    { product: 'Product X', quantity: 10 },
    { product: 'Product Y', quantity: 15 },
  ];

  const promotionsData = [
    { promotion: 'Promotion A', value: 100 },
    { promotion: 'Promotion B', value: 200 },
  ];

  return (
    <Box sx={{ p: 0 }}>
      <Box sx={{ display: 'flex', gap: 2, width:'40%' }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Monthly Sales</Typography>
          <LineChart width={200} height={200} data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
          </LineChart>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Max Sale of the Month</Typography>
          <BarChart width={200} height={200} data={maxSaleMonthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#82ca9d" />
          </BarChart>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Top Sold Products</Typography>
          <PieChart width={200} height={200}>
            <Pie data={topProductsData} dataKey="sales" nameKey="product" fill="#8884d8" label />
            <Tooltip />
            <Legend />
          </PieChart>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Products with Minimum Quantity</Typography>
          <BarChart width={200} height={200} data={minStockProductsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="product" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" fill="#8884d8" />
          </BarChart>
        </Paper>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Promotions</Typography>
          <PieChart width={200} height={200}>
            <Pie data={promotionsData} dataKey="value" nameKey="promotion" fill="#82ca9d" label />
            <Tooltip />
            <Legend />
          </PieChart>
        </Paper>
      </Box>
    </Box>
  );
};

export default SalesDashboard;
