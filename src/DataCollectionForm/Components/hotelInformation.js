import React, { useEffect, useState } from 'react';
import { getCountries } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en';
import PropTypes from 'prop-types';
import countries from 'i18n-iso-countries';
import { useDispatch, useSelector } from 'react-redux';
import { updateHotelInformation, updateHotelPageToggle } from '../../Redux/Slice/HotelInfoSlice';
import { updatebuttonClick, updatedCurrentPage } from '../../Redux/Slice/PersonalInfoSlice';

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
const CountrySelect = ({ values, onChange, labels, ...rest }) => (
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
  const dispatch = useDispatch();
  const sliceData = useSelector((state) => state.hotelInformation.HotelData);
  const PersonalInfoError = useSelector((state) => state.hotelInformation.PersonalInfoError);
  const HotelPageToggle = useSelector((state) => state.hotelInformation.HotelPageToggle);
  const PageToogle = useSelector((state) => state.personalInformation.PageToogle);
  const [HotelInfoData, SetHotelInfoData] = useState({
    HotelName: '',
    MarshaCode: '',
    isTheHotel: '',
    Country: "",
    State: "",
    City: "",
    ZipCode: ""
  });



  const handleHoteInfoData = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...HotelInfoData,
      [name]: value, // This ensures the correct field is updated in the state
    };
    SetHotelInfoData(updatedData);
    dispatch(updateHotelInformation(updatedData))
  }


  const handleCountryCodeChange = (countryName) => {
    const updatedData = {
      ...HotelInfoData,
      Country: countryName,
    }
    SetHotelInfoData(updatedData);
    dispatch(updateHotelInformation(updatedData))
  };

  const handleCheckboxChange = (type) => {
    const updatedData = { ...HotelInfoData, isTheHotel: type === HotelInfoData.isTheHotel ? '' : type };
    SetHotelInfoData(updatedData);
  };

  const hasErrors = Object.values(PersonalInfoError).some((error) => error === true);
  const ValueData = Object.values(HotelInfoData).some((value) => value !== "");


  useEffect(() => {

    if (ValueData && hasErrors) {
      dispatch(updateHotelInformation({ ...HotelInfoData, ButtonClick: false, CurrentPage: 2 }));
    } else if (ValueData) {
      dispatch(updateHotelInformation({ ...HotelInfoData, ButtonClick: true, CurrentPage: 3 }));
    }
  }, [HotelInfoData, ValueData, dispatch, hasErrors]);


  useEffect(() => {
    // if (!sliceData.hasErrors) {
    console.log("SliceData");
    SetHotelInfoData(sliceData);
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!sliceData.hasErrors]);


  console.log("HotelInfoData", sliceData);
  // console.log("PersonalInfoError", hasErrors);


  return (
    <div className='flex flex-col gap-4'>
      <header className='border border-black rounded-lg p-2 text-xl bg-data-blue flex items-center justify-between px-5'>
        <img width={100} src="https://assets.website-files.com/611cbbfb9a41092654f24228/616e52b7d8fc6451b604d39f_logo.png" alt='' />
        <h1 className='font-medium text-2xl text-data-text'>Hotel Information</h1>
        <img width={100} className='' src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Marriott_Logo.svg/1024px-Marriott_Logo.svg.png" alt='' />
      </header>

      <div className='border border-black rounded-lg px-10 py-2'>
        <aside className='flex flex-col py-1'>
          <label className="pb-1">Name of the Hotel<span className='text-red-600 ml-1'>*</span></label>
          <input
            onChange={handleHoteInfoData}
            value={HotelInfoData.HotelName || ""}
            name='HotelName'
            placeholder="Enter Hotel Name"
            className={` h-9 rounded-lg p-2 ${PersonalInfoError.HotelName ? "border-2 border-red-500" : "border border-gray-300"}`} />
        </aside>
        <aside className='flex flex-col py-1'>
          <label className="pb-1">MARSHA Code<span className='text-red-600 ml-1'>*</span></label>
          <input name='MarshaCode' value={HotelInfoData.MarshaCode || ""} onChange={handleHoteInfoData} placeholder="Enter MARSHA Code" className={` h-9 rounded-lg p-2 ${PersonalInfoError.MarshaCode ? "border-2 border-red-500" : "border border-gray-300"}`} />
        </aside>

        <section className='flex flex-col py-1'>
          <p className='py-1'>This vendor process is intended for managed hotels only. Please check this box to confirm you're at a managed hotel</p>
          <div className='flex gap-8 py-1'>
            <p>Is the Hotel</p>
            <p className='flex items-center'>
              <span>Managed</span>
              <input
                className='relative top-[2px] h-4 w-5 ml-5'
                id='Managed'
                name='Managed'
                type='checkbox'
                checked={HotelInfoData.isTheHotel === 'Managed'}
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
                checked={HotelInfoData.isTheHotel === 'Franchise'}
                onChange={() => handleCheckboxChange('Franchise')}
              />
            </p>
          </div>
        </section>

        <section className='flex gap-10 py-1'>
          <p >Location<span className='text-red-600 ml-1'>*</span></p>
          <div className='w-full'>
            <section className='flex items-center gap-5 py-2'>
              <aside className='flex flex-col w-[50%]'>
                <label className="pb-1">Country <span className='text-red-600 ml-1'>*</span></label>
                <CountrySelect
                  labels={en}
                  onChange={handleCountryCodeChange}
                />
              </aside>
              <aside className='flex flex-col w-[50%]'>
                <label className="pb-1">State <span className='text-red-600 ml-1'>*</span></label>
                <input name='State' value={HotelInfoData.State || ""} onChange={handleHoteInfoData} placeholder="Enter State" className={` h-9 rounded-lg p-2 ${PersonalInfoError.State ? "border-2 border-red-500" : "border border-gray-300"}`} />
              </aside>
            </section>
            <section className='flex items-center gap-5 py-2'>
              <aside className='flex flex-col w-[50%]'>
                <label className="pb-1">City <span className='text-red-600 ml-1'>*</span></label>
                <input name='City' value={HotelInfoData.City || ""} onChange={handleHoteInfoData} placeholder="Enter City" className={` h-9 rounded-lg p-2 ${PersonalInfoError.City ? "border-2 border-red-500" : "border border-gray-300"}`} />
              </aside>
              <aside className='flex flex-col w-[50%]'>
                <label className="pb-1">Zip Code <span className='text-red-600 ml-1'>*</span></label>
                <input name='ZipCode' value={HotelInfoData.ZipCode || ""} onChange={handleHoteInfoData} placeholder="Enter Zip Code" className={` h-9 rounded-lg p-2 ${PersonalInfoError.ZipCode ? "border-2 border-red-500" : "border border-gray-300"}`} />
              </aside>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HotelInformation;
