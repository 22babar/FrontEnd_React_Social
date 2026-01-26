import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Swal from 'sweetalert2';
// import 'ag-grid-community/styles/ag-grid.css';           // core grid CSS (required)
import 'ag-grid-community/styles/ag-theme-quartz.css'; // quartz theme
import axios from 'axios';

const PostGrid = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columnDefs = [
    {
      headerName: 'ID',
      field: 'id',
      width: 90,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'User ID',
      field: 'userID',
      editable: true,
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'Created At',
      field: 'created_at',
      editable: true,
      floatingFilter: true,
    },
    {
      headerName: 'Post Title',
      field: 'PostTitle',
      editable: true,
      floatingFilter: true,
    },
    {
      headerName: 'PostDescrip',
      field: 'PostDescrip',
      editable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Likes',
      field: 'Likes',
      editable: true,
      floatingFilter: true,
    },
    {
      headerName: 'Comment',
      field: 'Comment',
      editable: true,
      floatingFilter: true,
    },
    {
      headerName: 'Share',
      field: 'Share',
      editable: true,
      floatingFilter: true,
    },
    {
      headerName: 'HashTags',
      field: 'HashTags',
      editable: true,
      floatingFilter: true,
    }, // ← fixed typo
    {
      headerName: 'Actions',
      cellRenderer: (params) => (
        <button
          onClick={() => handleDelete(params.data.id)}
          style={{ color: '#dc3545', fontWeight: 'bold' }}
        >
          Delete
        </button>
      ),
      width: 120,
      filter: false,
      sortable: false,
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3001/api/posts');
      setRowData(res.data || []);
    } catch (err) {
      console.error('Fetch users failed:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load users.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this! This employee will be permanently deleted.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33', // red for delete
      cancelButtonColor: '#3085d6', // blue for cancel
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true, // puts Delete button on the right
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(`http://localhost:3001/api/posts/${id}`);

          // Show success message
          Swal.fire({
            title: 'Deleted!',
            text: 'Employee has been successfully deleted.',
            icon: 'success',
            timer: 1800, // auto close after 1.8 seconds
            showConfirmButton: false,
          });

          // Refresh the list
          fetchData();
        } catch (error) {
          // Show error message if delete fails
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete employee. Please try again.',
            icon: 'error',
            confirmButtonColor: '#3085d6',
          });
          console.error('Delete failed:', error);
        }
      }
    });
  };

  const onCellValueChanged = async (event) => {
    const { data } = event;
    try {
      await axios.put(`http://localhost:3001/api/posts/${data.id}`, data);
      // Optional: success toast / mini notification
      // Swal.fire({ icon: 'success', title: 'Updated', timer: 1200, showConfirmButton: false });
    } catch (err) {
      console.error('Update failed:', err);
      Swal.fire({
        icon: 'error',
        title: 'Update failed',
        text: 'Could not save changes.',
      });
    }
  };

  if (loading)
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        Loading users...
      </div>
    );

  return (
    <div style={{ padding: '20px' }}>
      <h2>Posts (React + AG Grid + Express + MySQL)</h2>

      <button
        onClick={fetchData}
        style={{
          marginBottom: 16,
          padding: '8px 16px',
          background: '#0d6efd',
          color: 'white',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
        }}
      >
        Refresh Data
      </button>

      <div
        className='ag-theme-quartz-dark'
        style={{ height: 750, width: '100%' }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            flex: 1,
            minWidth: 130,
            resizable: true,
            sortable: true,
            filter: true,
          }}
          pagination={true}
          paginationPageSize={15}
          paginationPageSizeSelector={[10, 15, 25, 50]}
          animateRows={true}
          editType='fullRow'
          onCellValueChanged={onCellValueChanged}
        />
      </div>
    </div>
  );
};

export default PostGrid;
