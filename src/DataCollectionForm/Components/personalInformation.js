import React, { useState } from 'react';
import { Country } from 'country-state-city';
import { updatePersonalInformation } from '../../Redux/Slice/PersonalInfoSlice';
import { useDispatch, useSelector } from 'react-redux';

const PersonalInformation = ({ Border }) => {
  const dispatch = useDispatch();
  const sliceData = useSelector((state) => state.personalInformation.PersonalInfoData);
  const PersonalInfoError = useSelector((state) => state.personalInformation.PersonalInfoError);
  const PersonalInfoErrorMessage = useSelector((state) => state.personalInformation.PersonalInfoErrorMessage);
  const [selectedCountryIso, setSelectedCountryIso] = useState('');
  const [countries, setcountries] = useState(Country.getAllCountries());
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
    // Update local state
    const updatedData = {
      ...Personaldata,
      [name]: value,
    };
    setPersonalData(updatedData);

    // Dispatch individual field update to Redux
    dispatch(updatePersonalInformation({
      field: name,
      value: value
    }));
  };

  const handlecountriesCodeChange = (isoCode) => {
    const selectedCountry = countries.find((c) => c.isoCode === isoCode);
    const countryCode = `+${selectedCountry.phonecode}`;
    
    // Update local state
    const updatedData = {
      ...Personaldata,
      CountryCode: countryCode
    };
    setPersonalData(updatedData);
    setSelectedCountryIso(isoCode);

    // Dispatch country code update to Redux
    dispatch(updatePersonalInformation({
      field: 'CountryCode',
      value: countryCode
    }));
  };

  // Load initial data from Redux store
  React.useEffect(() => {
    setPersonalData(sliceData);
    const country = countries.find(c => `+${c.phonecode}` === sliceData.CountryCode?.toString());
    if (country) {
      setSelectedCountryIso(country.isoCode);
    }
  }, [sliceData, countries]);


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
            <label htmlFor='FirstName' className="pb-1">First Name <span className="text-red-600 ml-1">*</span></label>
            <input
              id="FirstName"
              name="FirstName"
              value={Personaldata.FirstName || ""}
              onChange={handlePersonalData}
              placeholder="Enter Your First Name"
              className={` h-9 rounded-lg p-2 ${PersonalInfoError.FirstName ? "border-2 border-red-500" : "border border-gray-300"}`}
            />
            {PersonalInfoError.FirstName && <span className='text-red-600 font-light text-sm pl-2'>{PersonalInfoErrorMessage.FirstName}</span>}
          </aside>
          <aside className='flex flex-col w-[50%]'>
            <label htmlFor='LastName' className="pb-1">Last Name <span className='text-red-600 ml-1'>*</span></label>
            <input
              id='LastName'
              name="LastName"
              value={Personaldata.LastName || ""}
              onChange={handlePersonalData}
              placeholder="Enter Your Last Name"
              className={` h-9 rounded-lg p-2 ${PersonalInfoError.LastName ? "border-2 border-red-500" : "border border-gray-300"}`}
            />
            {PersonalInfoError.LastName && <span className='text-red-600 font-light text-sm pl-2'>{PersonalInfoErrorMessage.LastName}</span>}
          </aside>
        </section>

        <section className='flex items-center gap-5 py-2'>
          <aside className='flex flex-col w-[50%]'>
            <label htmlFor='Title' className="pb-1">Title <span className='text-red-600 ml-1'>*</span></label>
            <input
              id='Title'
              name="Title"
              value={Personaldata.Title || ""}
              onChange={handlePersonalData}
              placeholder="Enter Your Title"
              className={` h-9 rounded-lg p-2 ${PersonalInfoError.Title ? "border-2 border-red-500 " : "border border-gray-300"}`}
            />
            {PersonalInfoError.Eid && <span className='text-red-600 font-light text-sm pl-2'>{PersonalInfoErrorMessage.Title}</span>}
          </aside>
          <aside className='flex flex-col w-[50%]'>
            <label htmlFor='Email' className="pb-1">Email <span className='text-red-600 ml-1'>*</span></label>
            <input
              id='Email'
              name="Email"
              type='email'
              value={Personaldata.Email || ""}
              onChange={handlePersonalData}
              placeholder="Enter Your Email"
              className={` h-9 rounded-lg p-2 ${PersonalInfoError.Email ? "border-2 border-red-500" : "border border-gray-300"}`}
            />
            {PersonalInfoError.Email && <span className='text-red-600 font-light text-sm pl-2'>{PersonalInfoErrorMessage.Email}</span>}
          </aside>
        </section>

        <section className='flex flex-col w-[50%] py-2'>
          <label htmlFor='Eid' className="pb-1">EID <span className='text-red-600 ml-1'>*</span></label>
          <input
            id='Eid'
            name="Eid"
            type='text'
            value={Personaldata.Eid || ""}
            onChange={handlePersonalData}
            placeholder="Enter Employee ID"
            className={` h-9 rounded-lg p-2 ${PersonalInfoError.Eid ? "border-2 border-red-500" : "border border-gray-300"}`}
          />
          {PersonalInfoError.Eid && <span className='text-red-600 font-light text-sm pl-2'>{PersonalInfoErrorMessage.Eid}</span>}
        </section>

        <section className='flex gap-5 py-2'>
          <aside className='flex flex-col w-[15%]'>
            <label className="pb-1">Country Code <span className='text-red-600 ml-1'>*</span></label>
            <select
              value={sliceData.CountryCode ? selectedCountryIso : sliceData.CountryCode}
              className='border h-9 rounded-lg pl-1'
              onChange={(e) => handlecountriesCodeChange(e.target.value)}
            >
              <option value="">Select country</option>
              {countries.map((data) => (
                <option key={data.isoCode} value={data.isoCode}>
                  {data.name} +{data.phonecode}
                </option>
              ))}
            </select>
          </aside>
          <aside className='flex flex-col w-[85%]'>
            <label htmlFor='PhoneNumber' className="pb-1">Phone <span className='text-red-600 ml-1'>*</span></label>
            <input
              id='PhoneNumber'
              name="PhoneNumber"
              type='number'
              maxLength={10}
              value={Personaldata.PhoneNumber || ""}
              onChange={handlePersonalData}
              placeholder="Enter Your Phone Number"
              className={` h-9 rounded-lg p-2 ${PersonalInfoError.PhoneNumber ? "border-2 border-red-500" : "border border-gray-300"}`}
            />
            {PersonalInfoError.PhoneNumber && <span className='text-red-600 font-light text-sm pl-2'>{PersonalInfoErrorMessage.PhoneNumber}</span>}
          </aside>
        </section>
      </div>
    </div>
  );
};

export default PersonalInformation;
