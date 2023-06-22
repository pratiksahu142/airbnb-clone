import './App.css'
import {Route, Routes} from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import {UserContextProvider} from "./UserContext";
import AccountPage from "./pages/AccountPage";
import PlacesPage from "./pages/PlacesPage";
import PlacePage from "./pages/PlacePage";
import PlacesFormPage from "./pages/PlacesFormPage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";
import SearchAPIPage from "./pages/SearchAPIPage";
import SearchAPIDetailPage from "./pages/SearchAPIDetailPage";
import AuthGuard from "./AuthGuard";
import PublicProfile from "./PublicProfile";
import AdminLoginPage from "./admin-pages/AdminLoginPage";
import UsersPage from './admin-pages/UsersPage';
import AdminBookingsPage from './admin-pages/AdminBookingsPage';
import NewUserPage from './admin-pages/NewUserPage';

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {

  return (
      <UserContextProvider>
        <Routes>
          {/*<Route path="/" element={<Layout/>}>*/}
            <Route index element={<IndexPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/a/login" element={<AdminLoginPage />} />
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/profile/:id" element={<PublicProfile/>} />
            <Route path="/account/:subpage?" element={<AccountPage/>} />
            <Route path="/account/places" element={
                  <AuthGuard allowedUserTypes={["business", "admin"]}>
                    <PlacesPage/>
                  </AuthGuard>
                }
            />
            <Route path="/account/places/new" element={
                  <AuthGuard allowedUserTypes={["business", "admin"]}>
                    <PlacesFormPage/>
                  </AuthGuard>
                }
            />
            <Route path="/account/places/:id" element={<PlacesFormPage/>}/>
            <Route path="/place/:id" element={<PlacePage/>}/>
            <Route path="/account/bookings" element={<BookingsPage/>}/>
            <Route path="/account/bookings/:id" element={<BookingPage/>}/>
            <Route path="/search/api" element={<SearchAPIPage/>}/>
            <Route path="/search/api/detail/:id" element={<SearchAPIDetailPage/>}/>
            <Route
                path="/a/users"
                element={
                  <AuthGuard allowedUserTypes={["admin"]}>
                    <UsersPage/>
                  </AuthGuard>
                }
            />
            <Route
                path="/a/users/new"
                element={
                  <AuthGuard allowedUserTypes={["admin"]}>
                    <NewUserPage/>
                  </AuthGuard>
                }
            />
            <Route
                path="/a/bookings"
                element={
                  <AuthGuard allowedUserTypes={["admin"]}>
                    <AdminBookingsPage/>
                  </AuthGuard>
                }
            />
          {/*</Route>*/}
        </Routes>
      </UserContextProvider>
  )
}

export default App
