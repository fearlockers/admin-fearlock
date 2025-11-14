'use client'

import { Menu, User, Settings, Lock, Shield, Mail, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface HeaderProps {
  breadcrumbs: BreadcrumbItem[]
}

export default function Header({ breadcrumbs }: HeaderProps) {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showProfileDialog, setShowProfileDialog] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const handleLogout = () => {
    setShowProfileDialog(false)
    router.push('/login')
  }

  return (
    <>
      <header className="bg-white border-b border-gray-200 h-16 fixed top-0 left-0 lg:left-72 right-0 z-10">
        <div className="flex items-center justify-between h-full px-6">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded lg:hidden"
          >
            <Menu size={24} />
          </button>

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            {breadcrumbs.map((item, index) => (
              <span key={index} className="flex items-center gap-2">
                {index > 0 && <span>/</span>}
                {item.href ? (
                  <a href={item.href} className="text-blue-600 hover:underline">
                    {item.label}
                  </a>
                ) : (
                  <span>{item.label}</span>
                )}
              </span>
            ))}
          </nav>

          {/* User Icon */}
          <button 
            onClick={() => setShowProfileDialog(true)}
            className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors"
          >
            <User size={20} className="text-white" />
          </button>
        </div>
      </header>

      {/* Profile Dialog */}
      {showProfileDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">プロフィール設定</h2>
              <button
                onClick={() => setShowProfileDialog(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="flex">
              {/* Sidebar */}
              <div className="w-48 border-r border-gray-200 p-4">
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm ${
                      activeTab === 'profile' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <User size={16} />
                    <span>基本情報</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('password')}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm ${
                      activeTab === 'password' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Lock size={16} />
                    <span>パスワード</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('2fa')}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm ${
                      activeTab === '2fa' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Shield size={16} />
                    <span>二段階認証</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('notification')}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm ${
                      activeTab === 'notification' ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Mail size={16} />
                    <span>通知設定</span>
                  </button>
                </nav>
              </div>

              {/* Content */}
              <div className="flex-1 p-6">
                {activeTab === 'profile' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">基本情報</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">氏名</label>
                      <input
                        type="text"
                        defaultValue="管理者太郎"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>
                      <input
                        type="email"
                        defaultValue="admin@fearlock.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">役割</label>
                      <input
                        type="text"
                        value="スーパー管理者"
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100 text-gray-600"
                      />
                    </div>
                    <button className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors">
                      保存
                    </button>
                  </div>
                )}

                {activeTab === 'password' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">パスワード変更</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">現在のパスワード</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">新しいパスワード</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">新しいパスワード（確認）</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <button className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors">
                      パスワード更新
                    </button>
                  </div>
                )}

                {activeTab === '2fa' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">二段階認証</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-blue-800">
                        二段階認証を有効にすると、ログイン時にパスワードに加えて認証コードが必要になります。
                      </p>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded">
                      <div>
                        <p className="font-medium text-gray-800">二段階認証</p>
                        <p className="text-sm text-gray-600">現在: 無効</p>
                      </div>
                      <button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors">
                        有効化
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'notification' && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">通知設定</h3>
                    {[
                      { label: 'システムアラート', checked: true },
                      { label: '新規法人登録', checked: true },
                      { label: 'メンバー追加', checked: false },
                      { label: '配信完了通知', checked: true },
                    ].map((item, index) => (
                      <label key={index} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          defaultChecked={item.checked}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <span className="text-sm text-gray-700">{item.label}</span>
                      </label>
                    ))}
                    <button className="px-6 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors mt-4">
                      保存
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 hover:text-red-700"
              >
                <LogOut size={16} />
                <span>ログアウト</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

