import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLoaderData } from 'react-router';
import bike from '../../assets/agent-pending.png'
import Swal from 'sweetalert2';

const Rider = () => {
  const { register, handleSubmit, control } = useForm();
  const serviceCenters = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const regionsDupicate = serviceCenters.map(c => c.region);
  const regions = [...new Set(regionsDupicate)];
  const riderRegion = useWatch({ control, name: "region" });

  const handleRiderApp = data => {
    console.log(data);
    axiosSecure.post('/riders', data)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your application has been submitted.",
            showConfirmButton: false,
            timer: 5500
          });
        }
      })
  };

  const dictrictsByRegion = region => {
    const regionDistrics = serviceCenters.filter(c => c.region === region);
    const districts = regionDistrics.map(d => d.district);
    return districts;
  };

  return (
    <div>
      <h2 className='text-4xl font-bold text-secondary'>Be a Rider</h2>
      <form onSubmit={handleSubmit(handleRiderApp)} className='mt-12 p-4 text-secondary'>

        {/* two column */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
          {/* Rider Details */}
          <fieldset className="fieldset">
            <h2 className="text-2xl font-bold text-secondary">Rider Details</h2>

            {/* rider name */}
            <label className="label text-[13px] font-semibold text-secondary">Name</label>
            <input type="text" {...register('name')} defaultValue={user?.displayName} className="input w-full" placeholder="rider Name" />

            {/* rider email */}
            <label className="label text-[13px] font-semibold text-secondary">Email</label>
            <input type="email" {...register('email')} defaultValue={user?.email} className="input w-full" placeholder="rider Email" />

            {/* rider region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-[13px] font-semibold text-secondary">Region</legend>
              <select {...register('region')} defaultValue="Pick a browser" className="select w-full">
                <option>Pick a Region</option>
                {
                  regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                }
              </select>
            </fieldset>

            {/* rider districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-[13px] font-semibold text-secondary">Districts</legend>
              <select {...register('district')} defaultValue="Pick a district" className="select w-full">
                <option>Pick a district</option>
                {
                  dictrictsByRegion(riderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                }
              </select>
            </fieldset>

            {/* rider address */}
            <label className="label mt-4 text-[13px] font-semibold text-secondary">Your Address</label>
            <input type="text" {...register('address')} className="input w-full" placeholder="rider Address" />

            {/* receiver name */}
            <label className="label text-[13px] font-semibold text-secondary">Driving Licence</label>
            <input type="text" {...register('license')} className="input w-full" placeholder="Driving Licence" />

            {/* receiver email */}
            <label className="label text-[13px] font-semibold text-secondary">NID</label>
            <input type="number" {...register('nid')} className="input w-full" placeholder="National ID No" />

            {/* Bike Info */}
            <label className="label mt-4 text-[13px] font-semibold text-secondary">Bike Info</label>
            <input type="text" {...register('bike')} className="input w-full" placeholder="Bike Information" />

          </fieldset>

          {/* Bike Image */}
          <img src={bike} alt="" />


        </div>
        <div className='flex justify-center'>
          <input type="submit" className='btn btn-primary text-secondary' value="Apply" />
        </div>
      </form>
    </div>
  );
};

export default Rider;