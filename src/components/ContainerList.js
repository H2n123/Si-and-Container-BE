// src/componens/SiList.js
import React, { useState, useEffect } from 'react';
import containerService from '../services/container.service';

const ContainerList = () => {
  const [containerList, setContainerList] = useState([]);
  
  useEffect(() => {
    // Panggil fungsi untuk mendapatkan daftar Si
    containerService.getContainerList()
      .then((response) => {
        setContainerList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Container list:', error);
      });
  }, []); // Dependensi kosong agar efek hanya dijalankan sekali saat komponen dipasang

  return (
    <div>
      <div className='container-lg'>
      <h2>Container List</h2>
      <table className="table-info">
        <thead>
          <tr>
            <th>ID</th>
            <th>Container No</th>
            <th>Seal No</th>
            <th>Si No</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {containerList.map((container) => (
            <tr key={container.id}>
              <td>{container.id}</td>
              <td>{container.containerNo}</td>
              <td>{container.sealNo}</td>
              <td>{container.Si.siNo}</td>
              <td><button className='btn btn-warning'>edit</button>
              <button className='btn btn-danger'>delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ContainerList;
