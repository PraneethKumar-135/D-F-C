import React from 'react'
import MainPage from './DataCollectionForm/Main/MainPage'
import { Provider } from 'react-redux'
import store from './Redux/Store/Store'

const App = () => {

  return (
    <div>
      <Provider store={store}>
        <MainPage />
      </Provider>
    </div>
  )
}

export default App

