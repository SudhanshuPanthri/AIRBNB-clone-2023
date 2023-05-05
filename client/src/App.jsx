import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homePage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import AccountPage from './pages/AccountPage'
import AccommodationPage from './pages/AccommodationPage'
import PlacePage from './pages/PlacePage'
import BookingsPage from './pages/BookingsPage'
import SingleBookingPage from './pages/SingleBookingPage'

axios.defaults.baseURL = 'http://127.0.0.1:3000';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account/:subpage?' element={<AccountPage />} />
          <Route path='/account/:subpage/:action' element={<AccountPage />} />
          <Route path='/account/:subpage/:id' element={<AccountPage />} />
          <Route path='/place/:id' element={<PlacePage />} />
          <Route path='/account/bookings' element={<BookingsPage />} />
          {/* <Route path='/account/bookings/:id' element={<SingleBookingPage />} /> */}
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
