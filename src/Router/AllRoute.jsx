import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLogin from '../auth/userauth/login/UserLogin'
import UserRegister from '../auth/userauth/register/UserRegister'
import ResetPassword from '../auth/resetpassword/ResetPassword'
import Home from '../userscreens/home/Home'
import Profile from "../userscreens/profile/Profile";
import ChangePassword from "../userscreens/setting/ChangePassword";
import AboutUs from "../userscreens/aboutus/AboutUs";
import FAQ from "../userscreens/faq/FAQ";
import AudioBooks from '../userscreens/audiobook/AudioBooks'
import DashBoard from '../adminScreen/DashBoard/DashBoard'
import AdminUser from '../adminScreen/admin_user/AdminUser'
import AdminAudioBook from '../adminScreen/admin_audiobook/AdminAudioBook'
import AdminAudioBookDetails from '../adminScreen/admin_audiobook/view_audiobook/ViewAudiobook'
import ViewUser from '../adminScreen/admin_user/view_user/ViewUser'
import PageNotFound from '../pagenotfound/PageNotFound'
import AudioBookDetail from '../userscreens/audiobook/audioBookDetail/AudioBookDetail'
import AdminProfile from '../adminScreen/admin_profile/AdminProfile'
import AdminChangePassword from '../adminScreen/changepassword/AdminChangePassword'
import { Layout } from './Layout'

export default function AllRoute() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Auth Path */}
                <Route path="/login" element={<UserLogin />}></Route>
                <Route path="/register" element={<UserRegister />}></Route>
                <Route path="/reset-password" element={<ResetPassword />}></Route>

                <Route path='/' element={<Layout />}>
                    {/* User Path */}
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/audiobooks" element={<AudioBooks />}></Route>
                    <Route path="/audiobooks/detail/:id" element={<AudioBookDetail />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/change-password" element={<ChangePassword />}></Route>
                    <Route path="/aboutus" element={<AboutUs />}></Route>
                    <Route path="/faq" element={<FAQ />}></Route>

                    {/* Admin Path */}
                    <Route path='/admin/dashboard' element={<DashBoard />}></Route>
                    <Route path="/admin/user" element={<AdminUser />}></Route>
                    <Route path="/admin/audiobook" element={<AdminAudioBook />}></Route>
                    <Route path='/admin/audiobook_detail/:id' element={<AdminAudioBookDetails />}></Route>
                    <Route path='/admin/userdetails/:id' element={<ViewUser />}></Route>
                    <Route path='/admin/profile' element={<AdminProfile />}></Route>
                    <Route path="/admin/change-password" element={<AdminChangePassword />}></Route>

                    {/* PageNot found */}
                    <Route path='*' element={<PageNotFound />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}