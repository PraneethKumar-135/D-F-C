import React, { useEffect, useRef } from 'react';

const HotelInformation = () => {

  return (
    <div className='flex flex-col gap-5'>
      <header className='border border-black rounded-lg p-3 text-xl bg-data-blue'>
        <h1 className='font-medium text-data-text'>Hotel Information</h1>
      </header>

      <div className='border border-black rounded-lg px-10 py-3'>
        <aside className='flex flex-col py-2'>
          <label className="font-medium pb-1">Name of the Hotel<span className='text-red-600 ml-1'>*</span></label>
          <input placeholder="Enter Hotel Name" className='border h-9 rounded-lg p-2' />
        </aside>
        <aside className='flex flex-col py-2'>
          <label className="font-medium pb-1">MARSHA Code<span className='text-red-600 ml-1'>*</span></label>
          <input placeholder="Enter MARSHA Code" className='border h-9 rounded-lg p-2' />
        </aside>

        <section className='flex flex-col py-2'>
          <p className='font-medium py-1'>This vendor process is intended for managed hotels only. Please check this box to confirm you're at a managed hotel</p>
          <div className='flex gap-8 py-1 font-medium'>
            <p>Is the Hotel</p>
            <p className='flex items-center'><span>Managed</span><input className='relative top-[2px] h-4 w-5 ml-5' type='checkbox' /></p>
            <p className='flex items-center'>Franchise<input className='relative top-[2px] h-4 w-5 ml-5' type='checkbox'  /></p>
          </div>
        </section>

        <section className='flex gap-10 py-2'>
          <p className='font-medium'>Location<span className='text-red-600 ml-1'>*</span></p>
          <div className='w-full'>
            <section className='flex items-center gap-5 py-2'>
              <aside className='flex flex-col w-[50%]'>
                <label className="font-medium pb-1">Country <span className='text-red-600 ml-1'>*</span></label>
                <select className='border h-9 rounded-lg'></select>
              </aside>
              <aside className='flex flex-col w-[50%]'>
                <label className="font-medium pb-1">State <span className='text-red-600 ml-1'>*</span></label>
                <select className='border h-9 rounded-lg'></select>
              </aside>
            </section>
            <section className='flex items-center gap-5 py-2'>
              <aside className='flex flex-col w-[50%]'>
                <label className="font-medium pb-1">City <span className='text-red-600 ml-1'>*</span></label>
                <input placeholder="Enter City" className='border h-9 rounded-lg p-2' />
              </aside>
              <aside className='flex flex-col w-[50%]'>
                <label className="font-medium pb-1">Zip Code <span className='text-red-600 ml-1'>*</span></label>
                <input placeholder="Enter Zip Code" className='border h-9 rounded-lg p-2' />
              </aside>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HotelInformation;
