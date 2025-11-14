import Sidebar from './Sidebar'
import Header from './Header'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface MainLayoutProps {
  children: React.ReactNode
  breadcrumbs: BreadcrumbItem[]
}

export default function MainLayout({ children, breadcrumbs }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:ml-72">
        <Header breadcrumbs={breadcrumbs} />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-200 py-4 px-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              <a href="https://fearlock.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                Fearlock
              </a>{' '}
              © 2025
            </span>
            <span>Version 2.4.6</span>
          </div>
        </footer>
      </div>
    </div>
  )
}

