import React, { useEffect, useState } from 'react';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en';
import PropTypes from 'prop-types';
import { updatebuttonClick, updatedCurrentPage, updateinputs, updatePersonalInformation } from '../../Redux/Slice/PersonalInfoSlice';
import { useDispatch, useSelector } from 'react-redux';

const CountrySelect = ({ onChange, labels, ...rest }) => (
  <select
    {...rest}
    className='border h-9 rounded-lg'
    onChange={(event) => {
      const selectedCountry = event.target.value || undefined;
      const callingCode = selectedCountry ? getCountryCallingCode(selectedCountry) : '';
      onChange(callingCode);
    }}
  >
    <option value="">{labels['ZZ']}</option>
    {getCountries().map((country) => (
      <option key={country} value={country}>
        {labels[country]} +{getCountryCallingCode(country)}
      </option>
    ))}
  </select>
);

CountrySelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  labels: PropTypes.objectOf(PropTypes.string).isRequired,
};

const PersonalInformation = ({ Border }) => {
  const dispatch = useDispatch();
  const sliceData = useSelector((state) => state.personalInformation.PersonalInfoData)
  const PersonalInfoError = useSelector((state) => state.personalInformation.PersonalInfoError)
  const [Personaldata, setPersonalData] = useState({
    FirstName: "",
    LastName: "",
    Title: "",
    Email: "",
    Eid: "",
    CountryCode: "",
    PhoneNumber: "",
  });




  const handlePersonalData = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...Personaldata,
      [name]: value,
    };
    // console.log("Updated", updatedData);
    setPersonalData(updatedData);
    dispatch(updatePersonalInformation(updatedData));
  };

  const handleCountryCodeChange = (callingCode) => {
    const updatedData = {
      ...Personaldata,
      CountryCode: `+${callingCode}`
    }
    setPersonalData(updatedData);
    dispatch(updatePersonalInformation(updatedData));
  };


  // console.log("PersonalInfo", sliceData);


  useEffect(() => { setPersonalData(sliceData) }, [dispatch, sliceData,]);


  return (
    <div className='flex flex-col gap-4 pb-5'>
      {/* Data Collection Form */}
      <header className='border border-black py-1 rounded-lg bg-data-blue'>
        <div className='flex items-center justify-between px-5'>
          <img width={100} src="https://assets.website-files.com/611cbbfb9a41092654f24228/616e52b7d8fc6451b604d39f_logo.png" alt='' />
          <img width={100} className='' src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Marriott_Logo.svg/1024px-Marriott_Logo.svg.png" alt='' />
        </div>
        <h1 className='text-center font-semibold text-3xl  text-data-text'>DATA COLLECTION FORM</h1>
        <p className='text-end pr-3 text-data-text'>FAQ</p>
      </header>

      {/* Personal Information */}
      <header className='border border-black rounded-lg p-3 text-xl bg-data-blue'>
        <h1 className='font-medium text-2xl text-data-text text-center'>Personal Information</h1>
      </header>

      {/* Personal Information Data */}
      <div className='border border-black rounded-lg px-10 py-3'>
        <section className='flex items-center gap-5 py-2'>
          <aside className='flex flex-col w-[50%]'>
            <label className="pb-1">First Name <span className="text-red-600 ml-1">*</span></label>
            <input
              name="FirstName"
              value={Personaldata.FirstName || ""}
              onChange={handlePersonalData}
              placeholder="Enter Your First Name"
              className={` h-9 rounded-lg p-2 ${PersonalInfoError.FirstName ? "border-2 border-red-500" : "border border-gray-300"}`}
            />
          </aside>
          <aside className='flex flex-col w-[50%]'>
            <label className="pb-1">Last Name <span className='text-red-600 ml-1'>*</span></label>
            <input
              name="LastName"
              value={Personaldata.LastName || ""}
              onChange={handlePersonalData}
              placeholder="Enter Your Last Name"
              className={` h-9 rounded-lg p-2 ${PersonalInfoError.LastName ? "border-2 border-red-500" : "border border-gray-300"}`}
            />
          </aside>
        </section>

        <section className='flex items-center gap-5 py-2'>
          <aside className='flex flex-col w-[50%]'>
            <label className="pb-1">Title <span className='text-red-600 ml-1'>*</span></label>
            <input
              name="Title"
              value={Personaldata.Title || ""}
              onChange={handlePersonalData}
              placeholder="Enter Your Title"
              className={` h-9 rounded-lg p-2 ${PersonalInfoError.Title ? "border-2 border-red-500" : "border border-gray-300"}`}
            />
          </aside>
          <aside className='flex flex-col w-[50%]'>
            <label className="pb-1">Email <span className='text-red-600 ml-1'>*</span></label>
            <input
              name="Email"
              type='email'
              value={Personaldata.Email || ""}
              onChange={handlePersonalData}
              placeholder="Enter Your Email"
              className={` h-9 rounded-lg p-2 ${PersonalInfoError.Email ? "border-2 border-red-500" : "border border-gray-300"}`}
            />
          </aside>
        </section>

        <section className='flex flex-col w-[50%] py-2'>
          <label className="pb-1">EID <span className='text-red-600 ml-1'>*</span></label>
          <input
            name="Eid"
            value={Personaldata.Eid || ""}
            onChange={handlePersonalData}
            placeholder="Enter Employee ID"
            className={` h-9 rounded-lg p-2 ${PersonalInfoError.Eid ? "border-2 border-red-500" : "border border-gray-300"}`}
          />
        </section>

        <section className='flex gap-5 py-2'>
          <aside className='flex flex-col w-[15%]'>
            <label className="pb-1">Country Code <span className='text-red-600 ml-1'>*</span></label>
            <CountrySelect
              labels={en}
              onChange={handleCountryCodeChange}
            />
          </aside>
          <aside className='flex flex-col w-[85%]'>
            <label className="pb-1">Phone <span className='text-red-600 ml-1'>*</span></label>
            <input
              name="PhoneNumber"
              type='number'
              value={Personaldata.PhoneNumber || ""}
              onChange={handlePersonalData}
              placeholder="Enter Your Phone Number"
              className={` h-9 rounded-lg p-2 ${PersonalInfoError.PhoneNumber ? "border-2 border-red-500" : "border border-gray-300"}`}
            />
          </aside>
        </section>
      </div>
    </div>
  );
};

export default PersonalInformation;
