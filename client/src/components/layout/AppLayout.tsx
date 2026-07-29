import { Outlet } from 'react-router-dom'

import PageContainer from './PageContainer'
import Navbar from './Navbar'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />

      <main>
        <PageContainer>
          <Outlet />
        </PageContainer>
      </main>
    </div>
  )
}