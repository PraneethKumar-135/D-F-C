import React, { useEffect, useState } from 'react';
import { getCountries } from 'react-phone-number-input';
import PropTypes from 'prop-types';
import countries from 'i18n-iso-countries';
import { useDispatch, useSelector } from 'react-redux';
import { updateHotelInformation } from '../../Redux/Slice/HotelInfoSlice';
import { Country, State } from 'country-state-city';

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
  const HotelInfoError = useSelector((state) => state.hotelInformation.HotelInfoError);
  const HotelInfoErrorMessage = useSelector((state) => state.hotelInformation.HotelInfoErrorMessage);
  const [HotelInfoData, SetHotelInfoData] = useState({
    HotelName: '',
    MarshaCode: '',
    isTheHotel: '',
    Country: "",
    State: "",
    City: "",
    ZipCode: ""
  });
  const [countries, setcountries] = useState(Country.getAllCountries());
  const [states, setstates] = useState([]);
  const [selectedcountries, setSelectedcountries] = useState(null);
  const [selectedstate, setSelectedstate] = useState(null);

  const [selectedCountryIso, setSelectedCountryIso] = useState('');
  const [selectedStateIso, setSelectedStateIso] = useState('');


  const handlecountriesCodeChange = (isoCode) => {
    const selectedCountry = countries.find((c) => c.isoCode === isoCode);
    setSelectedcountries(selectedCountry.name);
    setSelectedCountryIso(isoCode);
    setstates(State.getStatesOfCountry(selectedCountry.isoCode));
    const updatedData = {
      ...HotelInfoData,
      Country: selectedCountry.name,
    }
    SetHotelInfoData(updatedData);
    dispatch(updateHotelInformation(updatedData))
  };

  const handlestateChange = (isoCode) => {
    const selectedstates = states.find((c) => c.isoCode === isoCode);
    setSelectedstate(selectedstates.name);
    setSelectedStateIso(isoCode);
    const updatedData = {
      ...HotelInfoData,
      State: selectedstates.name,
    }
    SetHotelInfoData(updatedData);
    dispatch(updateHotelInformation(updatedData))
  }

  const handleHoteInfoData = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...HotelInfoData,
      [name]: value,
    };
    SetHotelInfoData(updatedData);
    dispatch(updateHotelInformation(updatedData))
  }

  const handleCheckboxChange = (type) => {
    const updatedData = { ...HotelInfoData, isTheHotel: type === HotelInfoData.isTheHotel ? '' : type };
    SetHotelInfoData(updatedData);
  };

  const areAllFieldsFilled = () => {
    const requiredFields = [
      'HotelName',
      'MarshaCode',
      'Country',
      'State',
      'City',
      'ZipCode',
      'isTheHotel'
    ];

    return requiredFields.every(field =>
      HotelInfoData[field] &&
      HotelInfoData[field].toString().trim() !== ''
    );
  };

  const hasErrors = Object.values(HotelInfoError).some((error) => error === true);
  const allFieldsFilled = areAllFieldsFilled();

  useEffect(() => {
    if (allFieldsFilled && !hasErrors) {
      dispatch(updateHotelInformation({
        ...HotelInfoData,
        ButtonClick: true,
        CurrentPage: 3
      }));
    } else {
      dispatch(updateHotelInformation({
        ...HotelInfoData,
        ButtonClick: false,
        CurrentPage: 2
      }));
    }
  }, [HotelInfoData, hasErrors, dispatch, allFieldsFilled]);

  useEffect(() => {
    if (sliceData?.Country) {
      const country = countries.find(c => c.name === sliceData.Country);
      if (country) {
        setSelectedCountryIso(country);
        const countryStates = State.getStatesOfCountry(country.isoCode);
        setstates(countryStates);

        if (sliceData.State) {
          const state = countryStates.find(s => s.name === sliceData.State);
          if (state) {
            setSelectedStateIso(state);
          }
        }
      }
    }
    SetHotelInfoData(sliceData);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!sliceData.hasErrors, countries]);


  return (
    <div className='flex flex-col gap-4'>
      <header className='border border-black rounded-lg p-2 text-xl bg-data-blue flex items-center justify-between px-5'>
        <img width={100} src="https://assets.website-files.com/611cbbfb9a41092654f24228/616e52b7d8fc6451b604d39f_logo.png" alt='' />
        <h1 className='font-medium text-2xl text-data-text'>Hotel Information</h1>
        <img width={100} className='' src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Marriott_Logo.svg/1024px-Marriott_Logo.svg.png" alt='' />
      </header>

      <div className='border border-black rounded-lg px-10 py-2'>
        <aside className='flex flex-col py-1'>
          <label htmlFor='HotelName' className="pb-1">Name of the Hotel<span className='text-red-600 ml-1'>*</span></label>
          <input
            id='HotelName'
            name='HotelName'
            placeholder="Enter Hotel Name"
            value={HotelInfoData.HotelName || ""}
            onChange={handleHoteInfoData}
            className={` h-9 rounded-lg p-2 ${HotelInfoError.HotelName ? "border-2 border-red-500" : "border border-gray-300"}`}
          />
          {HotelInfoError.HotelName && <span className='text-red-600 font-light text-sm pl-2'>{HotelInfoErrorMessage.HotelName}</span>}

        </aside>
        <aside className='flex flex-col py-1'>
          <label htmlFor='MarshaCode' className="pb-1">MARSHA Code<span className='text-red-600 ml-1'>*</span></label>
          <input
            id='MarshaCode'
            name='MarshaCode'
            value={HotelInfoData.MarshaCode || ""}
            onChange={handleHoteInfoData}
            placeholder="Enter MARSHA Code"
            className={` h-9 rounded-lg p-2 ${HotelInfoError.MarshaCode ? "border-2 border-red-500" : "border border-gray-300"}`}
          />
          {HotelInfoError.MarshaCode && <span className='text-red-600 font-light text-sm pl-2'>{HotelInfoErrorMessage.MarshaCode}</span>}

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
                <select
                  value={sliceData.Country ? selectedCountryIso?.isoCode : sliceData.Country}
                  className="border h-9 rounded-lg pl-2"
                  onChange={(e) => handlecountriesCodeChange(e.target.value)}
                >
                  <option value="">Select countries</option>
                  {countries.map((data) => (
                    <option key={data.isoCode} value={data.isoCode}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </aside>
              <aside className='flex flex-col w-[50%]'>
                <label htmlFor='state' className="pb-1">State <span className='text-red-600 ml-1'>*</span></label>
                <select
                  value={sliceData.State ? selectedStateIso?.isoCode : sliceData.state}
                  className="border h-9 rounded-lg pl-2"
                  onChange={(e) => handlestateChange(e.target.value)}
                >
                  <option value="">Select State</option>
                  {states.map((data) => (
                    <option key={data.isoCode} value={data.isoCode}>
                      {data.name}
                    </option>
                  ))}
                </select>
                {HotelInfoError.State && <span className='text-red-600 font-light text-sm pl-2'>{HotelInfoErrorMessage.State}</span>}

              </aside>
            </section>
            <section className='flex items-center gap-5 py-2'>
              <aside className='flex flex-col w-[50%]'>
                <label htmlFor='City' className="pb-1">City <span className='text-red-600 ml-1'>*</span></label>
                <input id='City' name='City' value={HotelInfoData.City || ""} onChange={handleHoteInfoData} placeholder="Enter City" className={` h-9 rounded-lg p-2 ${HotelInfoError.City ? "border-2 border-red-500" : "border border-gray-300"}`} />
                {HotelInfoError.City && <span className='text-red-600 font-light text-sm pl-2'>{HotelInfoErrorMessage.City}</span>}
              </aside>
              <aside className='flex flex-col w-[50%]'>
                <label htmlFor='ZipCode' className="pb-1">Zip Code <span className='text-red-600 ml-1'>*</span></label>
                <input id='ZipCode' name='ZipCode' value={HotelInfoData.ZipCode || ""} type='number' onChange={handleHoteInfoData} placeholder="Enter Zip Code" className={` h-9 rounded-lg p-2 ${HotelInfoError.ZipCode ? "border-2 border-red-500" : "border border-gray-300"}`} />
                {HotelInfoError.ZipCode && <span className='text-red-600 font-light text-sm pl-2'>{HotelInfoErrorMessage.ZipCode}</span>}
              </aside>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HotelInformation;
