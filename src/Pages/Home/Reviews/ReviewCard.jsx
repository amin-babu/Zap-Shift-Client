import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  const {userName, review: testimonial, user_photoURL} = review;
  return (
    <div className="max-w-sm p-6 bg-white rounded-2xl shadow-md">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-[#C3DFE2] text-3xl mb-4" />

      {/* Text */}
      <p className=" mb-4">
       {testimonial}
      </p>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-300 my-4"></div>

      {/* Profile */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-teal-700">
          <img src={user_photoURL} className='rounded-full' alt="" />
        </div>
        <div>
          <h3 className="font-semibold text-[#03373D]">{userName}</h3>
          <p className="text-sm text-gray-500">Senior Product Designer</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;