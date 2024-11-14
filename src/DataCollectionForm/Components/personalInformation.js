import React, { useEffect, useState } from 'react';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en';
import PropTypes from 'prop-types';
import { updatedCurrentPage, updateinputs, updatePersonalInformation } from '../../Redux/Slice/PersonalInfoSlice';
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

const PersonalInformation = () => {
  const dispatch = useDispatch();
  const sliceData = useSelector((state) => state.personalInformation.PersonalInfoData)
  // const mainPageToogle = useSelector((state) => state.personalInformation.mainPageToogle)
  const [Personaldata, setPersonalData] = useState({
    FirstName: "",
    LastName: "",
    Title: "",
    Email: "",
    Eid: "",
    CountryCode: "",
    PhoneNumber: "",
  });

  const isFormComplete = (data) => {
    return (
      data.FirstName &&
      data.LastName &&
      data.Title &&
      data.Email &&
      data.Eid &&
      data.CountryCode &&
      data.PhoneNumber
    )
  }

  const handlePersonalData = (e) => {
    const { name, value } = e.target;
    const updatedData = {
      ...Personaldata,
      [name]: value, // This ensures the correct field is updated in the state
    };

    setPersonalData(updatedData);

    if (isFormComplete(updatedData)) {
      dispatch(updatePersonalInformation(updatedData)); // Use updatedData instead of Personaldata
      dispatch(updatedCurrentPage(2));
    }
  };


  const handleCountryCodeChange = (callingCode) => {
    setPersonalData((prevData) => ({
      ...prevData,
      CountryCode: `+${callingCode}`,
    }));
  };

  useEffect(() => {
    setPersonalData(sliceData)
  }, [sliceData])

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
            <label className="pb-1">First Name <span className='text-red-600 ml-1'>*</span></label>
            <input
              name="FirstName"
              value={Personaldata.FirstName || ""}
              onChange={handlePersonalData}
              placeholder="Enter Your First Name"
              className='border h-9 rounded-lg p-2'
            />
            {/* {errorInputs && <span className='text-red-500 pl-1'>Enter First Name</span>} */}
          </aside>
          <aside className='flex flex-col w-[50%]'>
            <label className="pb-1">Last Name <span className='text-red-600 ml-1'>*</span></label>
            <input
              name="LastName"
              value={Personaldata.LastName || ""}
              onChange={handlePersonalData}
              placeholder="Enter Your Last Name"
              className='border h-9 rounded-lg p-2'
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
              className='border h-9 rounded-lg p-2'
            />
          </aside>
          <aside className='flex flex-col w-[50%]'>
            <label className="pb-1">Email <span className='text-red-600 ml-1'>*</span></label>
            <input
              name="Email"
              value={Personaldata.Email || ""}
              onChange={handlePersonalData}
              placeholder="Enter Your Email"
              className='border h-9 rounded-lg p-2'
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
            className='border h-9 rounded-lg p-2'
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
              value={Personaldata.PhoneNumber || ""}
              onChange={handlePersonalData}
              placeholder="Enter Your Phone Number"
              className='border h-9 rounded-lg p-2'
            />
          </aside>
        </section>
      </div>
    </div>
  );
};

export default PersonalInformation;
