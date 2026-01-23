import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-theme-quartz.css';
// import 'ag-grid-community/styles/ag-grid.css';
import axios from 'axios';

// import './App.css';

const UserGrid = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);

  // "id": 1,
  // "FirstName": "Jerrome",
  // "LastName": "Paget",
  // "City": "Morgantown",
  // "Country": "United States",
  // "Email": "jerrome.paget@aol.com",
  // "PhoneNo": "(304) 711-6",
  // "Password": "A!D&*!a#*J$T",
  // "UserName": "jpaget47955",
  // "Created_At": "2024-11-14T19:00:00.000Z",
  // "Updated_At": null

  const columnDefs = [
    {
      headerName: 'ID',
      field: 'id',
      width: 90,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'FirstName',
      field: 'FirstName',
      editable: true,
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'LastName',
      field: 'LastName',
      editable: true,
      floatingFilter: true,
    },
    { headerName: 'City', field: 'City', editable: true, floatingFilter: true },
    {
      headerName: 'Country',
      field: 'Country',
      editable: true,
       filter: true,
      floatingFilter: true
    },
    {
      headerName: 'Email',
      field: 'Email',
      editable: true,
      floatingFilter: true,
    },
    {
      headerName: 'PhoneNo',
      field: 'PhoneNo',
      editable: true,
      floatingFilter: true,
    },
    {
      headerName: 'Password',
      field: 'Password',
      editable: true,
      floatingFilter: true,
    },
    {
      headerName: 'UserName',
      field: 'EmUserNameail',
      editable: true,
      floatingFilter: true,
    },
    {
      headerName: 'Created_At',
      field: 'Created_At',
      editable: true,
      floatingFilter: true,
    },
    {
      headerName: 'Updated_At',
      field: 'Updated_At',
      editable: true,
      floatingFilter: true,
    },
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <button onClick={() => handleDelete(params.data.id)}>Delete</button>
      ),
      width: 120,
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3001/api/users');
      setRowData(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    await axios.delete(`http://localhost:3001/api/users/${id}`);
    fetchData();
  };

  const onCellValueChanged = async (event) => {
    const { data } = event;
    await axios.put(`http://localhost:3001/api/users/${data.id}`, data);
    // Optional: show toast notification
  };

  if (loading) return <div>Loading employees...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>User (React + AG Grid + Express + MySQL)</h2>
      <button onClick={fetchData} style={{ marginBottom: 12 }}>
        Refresh
      </button>

      <div
        className='ag-theme-quartz-dark'
        style={{ height: 600, width: '100%' }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            flex: 1,
            minWidth: 120,
            resizable: true,
            sortable: true,
            filter: true,
          }}
          pagination={true}
          paginationPageSize={15}
          animateRows={true}
          editType='fullRow'
          // better editing experience
          onCellValueChanged={onCellValueChanged}
        />
      </div>
    </div>
  );
};

export default UserGrid;
