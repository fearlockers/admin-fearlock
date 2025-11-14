'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Home, 
  BookOpen, 
  Users, 
  Building, 
  Shield, 
  Settings, 
  LogOut,
  ChevronDown,
  ChevronRight
} from 'lucide-react'

interface MenuItem {
  title: string
  icon: React.ReactNode
  href?: string
  subItems?: { title: string; href: string }[]
}

const menuItems: MenuItem[] = [
  {
    title: 'HOME',
    icon: <Home size={20} />,
    href: '/admin/home',
  },
  {
    title: '法人管理',
    icon: <Building size={20} />,
    href: '/admin/corporations',
  },
  {
    title: 'メンバー管理',
    icon: <Users size={20} />,
    href: '/admin/members',
  },
  {
    title: 'プラン管理',
    icon: <BookOpen size={20} />,
    href: '/admin/plans',
  },
  {
    title: '配信管理',
    icon: <Shield size={20} />,
    href: '/admin/distributions',
  },
  {
    title: 'バージョン管理',
    icon: <Settings size={20} />,
    href: '/admin/versions',
  },
  {
    title: '設定',
    icon: <Settings size={20} />,
    href: '/admin/settings',
  },
]

export default function Sidebar() {
  const router = useRouter()
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({})
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  const toggleMenu = (title: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const handleLogout = () => {
    setShowLogoutDialog(false)
    router.push('/login')
  }

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      <aside className={`w-72 bg-primary text-white h-screen fixed left-0 top-0 flex flex-col z-30 transform transition-transform lg:transform-none ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <span className="text-primary text-xl font-bold">F</span>
        </div>
        <span className="text-2xl font-light">Fearlock</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.title}>
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary-dark rounded transition-colors"
                  >
                    {item.icon}
                    <span className="flex-1 text-left text-sm">{item.title}</span>
                    {expandedMenus[item.title] ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                  {expandedMenus[item.title] && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.href}>
                          <Link
                            href={subItem.href}
                            className="block px-8 py-2 text-sm hover:bg-primary-dark rounded transition-colors"
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <Link
                  href={item.href || '#'}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-primary-dark rounded transition-colors"
                >
                  {item.icon}
                  <span className="text-sm">{item.title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-primary-light">
        <button 
          onClick={() => setShowLogoutDialog(true)}
          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary-dark rounded transition-colors"
        >
          <LogOut size={20} />
          <span className="text-sm">ログアウト</span>
        </button>
      </div>
    </aside>

    {/* Logout Confirmation Dialog */}
    {showLogoutDialog && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-lg font-bold text-gray-800 mb-2">ログアウトしますか？</h3>
          <p className="text-gray-600 mb-6">
            ログアウトすると、再度ログインが必要になります。
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setShowLogoutDialog(false)}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              ログアウト
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

