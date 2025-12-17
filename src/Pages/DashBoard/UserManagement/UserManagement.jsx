import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserMinus, FaUserPlus, FaUserShield } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import Swal from 'sweetalert2';

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    }
  });

  const handleMakeAdmin = user => {
    const roleInfo = {
      role: 'admin'
    };

    axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
      .then(res => {
        if (res.data.modifiedCount) {
          console.log(res.data);
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${user?.displayName} marked as admin.`,
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
  };

  const handleRemoveAdmin = user => {
    const roleInfo = {
      role: 'user'
    };

    // must ask for confirmation before proceed
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
      .then(res => {
        if (res.data.modifiedCount) {
          console.log(res.data);
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${user?.displayName} removed from admin.`,
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
  };

  return (
    <div>
      <h2 className='text-4xl font-semibold text-secondary'>Manage Users: {users.length}</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Users</th>
              <th>Email</th>
              <th>Role</th>
              <th className='text-center'>Admin Actions</th>
              <th>Other Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user?.photoURL}
                            alt={user?.displayName} />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user?.displayName}</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user?.email}
                  </td>
                  <td>{user?.role}</td>
                  <td className='flex gap-2 justify-center'>
                    {
                      user?.role === 'admin' ?
                        <button onClick={() => handleRemoveAdmin(user)} className="btn btn-error btn-sm flex items-center gap-2"> <FaUserShield size={18} /> </button>
                        :
                        <button onClick={() => handleMakeAdmin(user)} className="btn btn-success btn-sm flex items-center gap-2"> <MdAdminPanelSettings size={18} /> </button>
                    }
                  </td>
                  <th>

                  </th>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;