import { Route, Routes } from 'react-router-dom'

import AppLayout from '../components/layout/AppLayout'
import AuthLayout from '../components/layout/AuthLayout'
import CategoriesPage from '../pages/Categories'
import DashboardPage from '../pages/Dashboard'
import HomePage from '../pages/Home'
import JobsPage from '../pages/Jobs'
import LoginPage from '../pages/Login'
import ProfilePage from '../pages/Profile'
import RegisterPage from '../pages/Register'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  )
}