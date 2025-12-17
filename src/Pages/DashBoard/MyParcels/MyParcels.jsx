import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiEdit } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ['myParcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    }
  });

  const handelParcelDelete = id => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axiosSecure.delete(`/parcels/${id}`)
          .then(res => {
            console.log(res.data);
            if (res.data.deletedCount) {
              refetch(); // refresh the data
              Swal.fire({
                title: "Deleted!",
                text: "Your parcel has been deleted.",
                icon: "success"
              });
            }
          })

      }
    });
  };

  const handlePayment = async parcel => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      percelName: parcel.percelName
    };

    const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);
    console.log(res.data.url);
    window.location.assign(res.data.url);
  };

  // console.log(parcels);

  return (
    <div>
      <h2>all of our parcels here: {parcels.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Tracking Id</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <th>{index + 1}</th>
                  <td>{parcel.percelName}</td>
                  <td>{parcel.cost}</td>
                  <td>
                    {
                      parcel.paymentStatus === 'paid' ?
                        <div className="badge badge-soft badge-success border border-[#68E5BC]">Paid</div> :
                        <button onClick={() => handlePayment(parcel)} className="btn btn-sm btn-primary text-secondary">Pay</button>
                    }
                  </td>
                  <td>{parcel.trackingId}</td>
                  <td>{parcel.deliveryStatus}</td>
                  <td className='space-x-2'>
                    <button className='btn btn-square hover:bg-primary'>
                      <FaMagnifyingGlass />
                    </button>
                    <button className='btn btn-square hover:bg-primary'>
                      <FiEdit />
                    </button>
                    <button onClick={() => handelParcelDelete(parcel._id)} className='btn btn-square hover:bg-primary'>
                      <FaRegTrashAlt />
                    </button>
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

export default MyParcels;