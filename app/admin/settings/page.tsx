'use client'

import { useState } from 'react'
import MainLayout from '@/components/Layout/MainLayout'
import { Settings as SettingsIcon, Save, Bell, Lock, Mail, Globe, Database, Shield } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      alert('設定を保存しました（デモ）')
      setIsSaving(false)
    }, 1000)
  }

  const breadcrumbs = [
    { label: 'Home', href: '/admin/home' },
    { label: '設定' },
  ]

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 sm:p-6">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <SettingsIcon className="text-primary" size={24} />
            </div>
            <h1 className="text-xl font-medium text-gray-800">システム設定</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <nav className="space-y-1">
                {[
                  { icon: <Globe size={18} />, label: 'システム設定', value: 'general' },
                  { icon: <Database size={18} />, label: 'データベース', value: 'database' },
                  { icon: <Shield size={18} />, label: 'セキュリティ', value: 'security' },
                  { icon: <Mail size={18} />, label: 'メール設定', value: 'email' },
                  { icon: <Bell size={18} />, label: '通知設定', value: 'notification' },
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(item.value)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-colors ${
                      activeTab === item.value
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'general' && (
              <>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-medium text-gray-800 mb-4">システム基本設定</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">システム名</label>
                      <input
                        type="text"
                        defaultValue="Fearlock Admin"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">デフォルトタイムゾーン</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>Asia/Tokyo (GMT+9)</option>
                        <option>America/New_York (GMT-5)</option>
                        <option>Europe/London (GMT+0)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">システム言語</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary">
                        <option>日本語</option>
                        <option>English</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">メンテナンスモード</label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" />
                        <span className="text-sm text-gray-700">メンテナンスモードを有効にする</span>
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'database' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">データベース設定</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">データベースホスト</label>
                    <input
                      type="text"
                      defaultValue="localhost"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">バックアップ頻度</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary">
                      <option>毎日</option>
                      <option>毎週</option>
                      <option>毎月</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">保持期間（日）</label>
                    <input
                      type="number"
                      defaultValue="30"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    今すぐバックアップ
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">セキュリティ設定</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">セッションタイムアウト（分）</label>
                    <input
                      type="number"
                      defaultValue="30"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">パスワード要件</label>
                    <div className="space-y-2">
                      {[
                        '最小8文字以上',
                        '大文字を含む',
                        '小文字を含む',
                        '数字を含む',
                        '特殊文字を含む',
                      ].map((req, index) => (
                        <label key={index} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <span className="text-sm text-gray-700">{req}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">IPアドレス制限を有効にする</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'email' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">メール設定</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTPサーバー</label>
                    <input
                      type="text"
                      defaultValue="smtp.fearlock.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ポート</label>
                    <input
                      type="number"
                      defaultValue="587"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">送信元メールアドレス</label>
                    <input
                      type="email"
                      defaultValue="noreply@fearlock.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">送信元名</label>
                    <input
                      type="text"
                      defaultValue="Fearlock"
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    テストメール送信
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notification' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">システム通知設定</h2>
                <div className="space-y-4">
                  {[
                    { label: '新規法人登録時に管理者に通知', checked: true },
                    { label: 'メンバー追加時に管理者に通知', checked: true },
                    { label: 'プラン変更時に管理者に通知', checked: false },
                    { label: 'エラー発生時に管理者に通知', checked: true },
                    { label: 'システムアラートを送信', checked: true },
                    { label: '日次レポートを送信', checked: true },
                    { label: '週次レポートを送信', checked: true },
                    { label: '月次レポートを送信', checked: false },
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
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>保存中...</span>
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    <span>設定を保存</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

