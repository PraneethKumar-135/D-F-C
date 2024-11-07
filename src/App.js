import React from 'react'
import MainPage from './DataCollectionForm/Main/MainPage'
import PersonalInformation from './DataCollectionForm/Components/personalInformation'
import HotelInformation from './DataCollectionForm/Components/hotelInformation'
import SocialMediaInfo from './DataCollectionForm/Components/SocialMediaInfo'
import SocialMediaInfo2 from './DataCollectionForm/Components/SocialMediaInfo2'
import { Provider } from 'react-redux'
import store from './Redux/Store/Store'
import AllData from './DataCollectionForm/Main/AllData'

const App = () => {
 
  return (
    <div>
      <Provider store={store}>
        <MainPage />
        {/* < PersonalInformation/> */}
        {/* < HotelInformation/> */}
        {/* < SocialMediaInfo/> */}
        {/* <SocialMediaInfo2/> */}
        {/* <AllData/> */}
      </Provider>
    </div>
  )
}

export default App

