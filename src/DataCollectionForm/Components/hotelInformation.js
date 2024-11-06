import React, { useEffect, useState } from 'react';
import { getCountries } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en';
import PropTypes from 'prop-types';
import countries from 'i18n-iso-countries';
import { useDispatch } from 'react-redux';
import { updateHotelInformation } from '../../Redux/Slice/HotelInfoSlice';

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
const CountrySelect = ({ onChange, labels, ...rest }) => (
  <select
    {...rest}
    className='border h-9 rounded-lg'
    onChange={(event) => {
      const selectedCountry = event.target.value || undefined;
      const countryName = selectedCountry ? countries.getName(selectedCountry, "en") : '';
      onChange(countryName);
    }}
  >
    <option value="">{labels['ZZ']}</option>
    {getCountries().map((country) => (
      <option key={country} value={country}>
        {labels[country]}
      </option>
    ))}
  </select>
);

CountrySelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  labels: PropTypes.objectOf(PropTypes.string).isRequired,
};
const HotelInformation = () => {
  const dispatch = useDispatch()
  const [HotelInfoData, SetHotelInfoData] = useState({
    HotelName: '',
    MarshaCode: '',
    ManagedHotel: false,
    FranchiseHotel: false,
    Country: "",
    State: "",
    City: "",
    ZipCode: ""
  })
  useEffect(()=>{
    dispatch(updateHotelInformation(HotelInfoData))
  })
  const handleHoteInfoData = (e) => {
    const { name, value } = e.target;
    SetHotelInfoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleCountryCodeChange = (countryName) => {
    SetHotelInfoData((prevData) => ({
      ...prevData,
      Country: countryName,
    }));
  };
  const handleCheckboxChange = (data) => {
    SetHotelInfoData((prevData) => ({
      ...prevData,
      ManagedHotel: data === 'Managed' ? !prevData.ManagedHotel : prevData.ManagedHotel,
      FranchiseHotel: data === 'Franchise' ? !prevData.FranchiseHotel : prevData.FranchiseHotel,
    }));
  }
  console.log(HotelInfoData);


  return (
    <div className='flex flex-col gap-5'>
      <header className='border border-black rounded-lg p-3 text-xl bg-data-blue'>
      <div className='flex items-center justify-between px-5'>
          <img width={100} src="https://assets.website-files.com/611cbbfb9a41092654f24228/616e52b7d8fc6451b604d39f_logo.png" alt='' />
          <img width={100} className='' src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Marriott_Logo.svg/1024px-Marriott_Logo.svg.png" alt='' />
        </div>
        <h1 className='font-medium text-data-text text-center'>Hotel Information</h1>
      </header>

      <div className='border border-black rounded-lg px-10 py-3'>
        <aside className='flex flex-col py-2'>
          <label className="font-medium pb-1">Name of the Hotel<span className='text-red-600 ml-1'>*</span></label>
          <input name='HotelName' value={HotelInfoData.HotelName} onChange={handleHoteInfoData} placeholder="Enter Hotel Name" className='border h-9 rounded-lg p-2' />
        </aside>
        <aside className='flex flex-col py-2'>
          <label className="font-medium pb-1">MARSHA Code<span className='text-red-600 ml-1'>*</span></label>
          <input name='MarshaCode' value={HotelInfoData.MarshaCode} onChange={handleHoteInfoData} placeholder="Enter MARSHA Code" className='border h-9 rounded-lg p-2' />
        </aside>

        <section className='flex flex-col py-2'>
          <p className='font-medium py-1'>This vendor process is intended for managed hotels only. Please check this box to confirm you're at a managed hotel</p>
          <div className='flex gap-8 py-1 font-medium'>
            <p>Is the Hotel</p>
            <p className='flex items-center'>
              <span>Managed</span>
              <input
                className='relative top-[2px] h-4 w-5 ml-5'
                id='Managed'
                name='Managed'
                type='checkbox'
                checked={HotelInfoData.ManagedHotel}
                onChange={() => handleCheckboxChange('Managed')}
              />
            </p>
            <p className='flex items-center'>
              Franchise
              <input
                className='relative top-[2px] h-4 w-5 ml-5'
                id='Franchise'
                name='Franchise'
                type='checkbox'
                checked={HotelInfoData.FranchiseHotel}
                onChange={() => handleCheckboxChange('Franchise')}
              />
            </p>
          </div>
        </section>

        <section className='flex gap-10 py-2'>
          <p className='font-medium'>Location<span className='text-red-600 ml-1'>*</span></p>
          <div className='w-full'>
            <section className='flex items-center gap-5 py-2'>
              <aside className='flex flex-col w-[50%]'>
                <label className="font-medium pb-1">Country <span className='text-red-600 ml-1'>*</span></label>
                <CountrySelect
                  labels={en}
                  onChange={handleCountryCodeChange}
                />
              </aside>
              <aside className='flex flex-col w-[50%]'>
                <label className="font-medium pb-1">State <span className='text-red-600 ml-1'>*</span></label>
                <input name='State' value={HotelInfoData.State} onChange={handleHoteInfoData} placeholder="Enter State" className='border h-9 rounded-lg p-2' />
              </aside>
            </section>
            <section className='flex items-center gap-5 py-2'>
              <aside className='flex flex-col w-[50%]'>
                <label className="font-medium pb-1">City <span className='text-red-600 ml-1'>*</span></label>
                <input name='City' value={HotelInfoData.City} onChange={handleHoteInfoData} placeholder="Enter City" className='border h-9 rounded-lg p-2' />
              </aside>
              <aside className='flex flex-col w-[50%]'>
                <label className="font-medium pb-1">Zip Code <span className='text-red-600 ml-1'>*</span></label>
                <input name='ZipCode' value={HotelInfoData.ZipCode} onChange={handleHoteInfoData} placeholder="Enter Zip Code" className='border h-9 rounded-lg p-2' />
              </aside>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HotelInformation;
