import React from 'react'
import MainPage from './DataCollectionForm/Main/MainPage'
// import SocialMediaInfo2 from './DataCollectionForm/Components/SocialMediaInfo2'
import { Provider } from 'react-redux'
import store from './Redux/Store/Store'
import AllData from './DataCollectionForm/Main/AllData'
import SocialMediaInfo from './DataCollectionForm/Components/SocialMediaInfo'
import SocialMediaAgency from './DataCollectionForm/Components/SocialMediaAgency'

const App = () => {
 
  return (
    <div>
      <Provider store={store}>
        {/* <MainPage /> */}
        {/* < PersonalInformation/> */}
        {/* < HotelInformation/> */}
        {/* < SocialMediaAgency/> */}
        {/* <SocialMediaInfo/> */}
        <AllData/>
      </Provider>
    </div>
  )
}

export default App

