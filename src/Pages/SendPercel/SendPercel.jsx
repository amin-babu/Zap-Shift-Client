import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const SendPercel = () => {

  const { register, handleSubmit, control } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const serviceCenters = useLoaderData();

  const regionsDupicate = serviceCenters.map(c => c.region);
  const regions = [...new Set(regionsDupicate)];

  // explore useMemo callBack
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  // console.log(regions);

  const dictrictsByRegion = region => {
    const regionDistrics = serviceCenters.filter(c => c.region === region);
    const districts = regionDistrics.map(d => d.district);
    return districts;
  };

  const handleSendPercel = data => {
    const isDocument = data.parcelType === 'document';
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.percelWeight);
    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    }
    else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      }
      else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    };

    console.log('cost', cost);
    data.cost = cost;

    Swal.fire({
      title: "Please confiem the cost",
      text: `You will be charged ${cost} tk`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm and continue payment."
    }).then((result) => {
      if (result.isConfirmed) {
        // save the info in db
        axiosSecure.post('/parcels', data)
          .then(res => {
            console.log('after saving parcel', res.data);
            if (res.data.insertedId) {
              navigate('/dashboard/my-parcels')
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Parcel has created, please pay.",
                showConfirmButton: false,
                timer: 2500
              });
            }
          })
      }
    });
  };

  return (
    <div>
      <h2 className="text-5xl font-bold">Send a percel</h2>
      <form onSubmit={handleSubmit(handleSendPercel)} className='mt-12 p-4 text-secondary'>
        {/* percel type */}
        <div>
          <label className='label mr-4'>
            <input type="radio" {...register('parcelType')} value="document" className="radio radio-neutral" defaultChecked />
            Document
          </label>

          <label className='label'>
            <input type="radio" {...register('parcelType')} value="non-document" className="radio radio-neutral" />
            Non-Document
          </label>
        </div>

        {/* percel info: name, weight */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
          <fieldset className="fieldset">
            <label className="label text-[13px] font-semibold text-secondary">Percel Name</label>
            <input type="text" {...register('percelName')} className="input w-full" placeholder="Percel Name" />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label text-[13px] font-semibold text-secondary">Percel Weight</label>
            <input type="number" {...register('percelWeight')} className="input w-full" placeholder="Percel Weight (KG)" />
          </fieldset>
        </div>

        {/* two column */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
          {/* Sender Details */}
          <fieldset className="fieldset">
            <h2 className="text-2xl font-bold text-secondary">Sender Details</h2>

            {/* sender name */}
            <label className="label text-[13px] font-semibold text-secondary">Sender Name</label>
            <input type="text" {...register('senderName')} defaultValue={user?.displayName} className="input w-full" placeholder="Sender Name" />

            {/* sender email */}
            <label className="label text-[13px] font-semibold text-secondary">Sender Email</label>
            <input type="email" {...register('senderEmail')} defaultValue={user?.email} className="input w-full" placeholder="Sender Email" />

            {/* sender region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-[13px] font-semibold text-secondary">Sender Region</legend>
              <select {...register('senderRegion')} defaultValue="Pick a browser" className="select w-full">
                <option>Pick a Region</option>
                {
                  regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                }
              </select>
            </fieldset>

            {/* sender districts */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-[13px] font-semibold text-secondary">Sender Districts</legend>
              <select {...register('senderDistrict')} defaultValue="Pick a district" className="select w-full">
                <option>Pick a district</option>
                {
                  dictrictsByRegion(senderRegion).map((r, i) => <option key={i} value={r}>{r}</option>)
                }
              </select>
            </fieldset>

            {/* sender address */}
            <label className="label mt-4 text-[13px] font-semibold text-secondary">Sender Address</label>
            <input type="text" {...register('senderAddress')} className="input w-full" placeholder="Sender Address" />

          </fieldset>

          {/* receiver Details */}
          <fieldset className="fieldset">
            <h2 className="text-2xl font-bold text-secondary">Receiver Details</h2>

            {/* receiver name */}
            <label className="label text-[13px] font-semibold text-secondary">Receiver Name</label>
            <input type="text" {...register('receiverName')} className="input w-full" placeholder="Receiver Name" />

            {/* receiver email */}
            <label className="label text-[13px] font-semibold text-secondary">Receiver Email</label>
            <input type="email" {...register('receiverEmail')} className="input w-full" placeholder="Receiver Email" />

            {/* receiver region */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-[13px] font-semibold text-secondary">Receiver Region</legend>
              <select {...register('receiverRegion')} defaultValue="Pick a browser" className="select w-full">
                <option>Pick a Region</option>
                {
                  regions.map((r, i) => <option key={i} value={r}>{r}</option>)
                }
              </select>
            </fieldset>

            {/* receiver district */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-[13px] font-semibold text-secondary">Receiver District</legend>
              <select {...register('receiverDistrict')} defaultValue="Pick a browser" className="select w-full">
                <option>Pick a Region</option>
                {
                  dictrictsByRegion(receiverRegion).map((d, i) => <option key={i} value={d}>{d}</option>)
                }
              </select>
            </fieldset>

            {/* receiver address */}
            <label className="label mt-4 text-[13px] font-semibold text-secondary">Receiver Address</label>
            <input type="text" {...register('receiverAddress')} className="input w-full" placeholder="Receiver Address" />

          </fieldset>

        </div>
        <div className='flex justify-center'>
          <input type="submit" className='btn btn-primary text-secondary' value="Send Parcel" />
        </div>
      </form>
    </div>
  );
};

export default SendPercel;