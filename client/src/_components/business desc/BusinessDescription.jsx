import React from "react";

function BusinessDescription({ business }) {
  return (
    <div>
      <h2 className="font-bold text-[25px]">Description</h2>
      <p className="mt-4 text-lg text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi maxime
        fuga eum mollitia ipsum, est temporibus rerum doloribus consectetur,
        eius quos? Cum modi, fugit aut rem numquam voluptate dolorem!
        Accusantium!. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Rerum, maiores labore iste facere consequuntur ipsam vel officiis,
        minima doloremque rem iusto similique, recusandae dolores obcaecati quia
        nesciunt pariatur nam impedit.
      </p>
      <h2 className="font-bold text-[25px] mt-8">Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        <img src="https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="img" width={700} height={200} className="rounded-lg" />
        <img src="https://images.pexels.com/photos/6039245/pexels-photo-6039245.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="img" width={700} height={200} className="rounded-lg" />
        <img src="https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="img" width={700} height={200} className="rounded-lg" />
      </div>
    </div>
  );
}

export default BusinessDescription;
