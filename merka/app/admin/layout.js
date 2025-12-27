import AdminLayout from './components/AdminLayout'
import './admin.css'

export const metadata = {
  title: 'Admin Panel - Merka Architecture',
  description: 'Merka Architecture Admin Panel',
}

export default function Layout({ children }) {
  return <AdminLayout>{children}</AdminLayout>
}
