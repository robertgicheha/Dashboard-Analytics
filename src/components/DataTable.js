// src/components/DataTable.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_TABLE_DATA = gql`
  query GetTableData {
    tableData {
      id
      name
      value
    }
  }
`;

const DataTable = () => {
  const { data, loading, error } = useQuery(GET_TABLE_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading table data</p>;

  return (
    <div className="data-table">
      <h2>Data Table</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.tableData.map(row => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
