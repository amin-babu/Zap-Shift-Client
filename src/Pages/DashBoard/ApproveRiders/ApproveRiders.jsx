import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiUserCheck } from 'react-icons/fi';
import { IoPersonRemoveOutline } from 'react-icons/io5';
import { GoTrash } from "react-icons/go";
import Swal from 'sweetalert2';

const ApproveRiders = () => {

  const axiosSecure = useAxiosSecure();

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ['riders', 'pending'],
    queryFn: async () => {
      const res = await axiosSecure.get('/riders');
      return res.data;
    }
  });


  const updateRiderStatus = (rider, status) => {
    const updatedInfo = { status: status, email: rider.email };

    axiosSecure.patch(`/riders/${rider._id}`, updatedInfo)
      .then(res => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Riders is set to ${status}.`,
            showConfirmButton: false,
            timer: 2500
          });
        }
      });
  };

  const handleApproval = rider => {
    updateRiderStatus(rider, 'approved');
  };

  const handleRejection = rider => {
    updateRiderStatus(rider, 'Rejected')
  };

  return (
    <div>
      <h2 className='text-4xl text-secondary'>Riders Pending Approvel: {riders.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Status</th>
              <th>Actios</th>
            </tr>
          </thead>
          <tbody>
            {
              riders.map((rider, i) => (
                <tr key={rider._id}>
                  <th>{i + 1}</th>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.district}, {rider.address}</td>
                  <td>
                    {
                      rider.status === 'pending' ?
                        <div className="badge badge-soft badge-warning border border-[#fdd265]">Pending</div> :
                        (
                          rider.status !== 'Rejected' ?
                          <div className="badge badge-soft badge-success border border-[#68E5BC]">Approved</div> :
                          <div className="badge badge-soft badge-error border border-[#F88084]">Rejected</div>
                        )
                    }
                  </td>
                  <td className='space-x-2'>
                    <button onClick={() => handleApproval(rider)} className='btn btn-square'><FiUserCheck size={18} /></button>
                    <button onClick={() => handleRejection(rider)} className='btn btn-square'><IoPersonRemoveOutline size={18} /></button>
                    <button className='btn btn-square'><GoTrash size={18} /></button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApproveRiders;