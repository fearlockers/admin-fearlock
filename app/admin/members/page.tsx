'use client'

import { useState } from 'react'
import MainLayout from '@/components/Layout/MainLayout'
import DataTable, { Column } from '@/components/Table/DataTable'
import AddModal from '@/components/Modals/AddModal'
import { Plus, Edit, Search, Shield, Mail, Trash2 } from 'lucide-react'

interface Admin {
  id: string
  name: string
  email: string
  role: string
  permissions: string[]
  status: string
  lastLogin: string
  createdAt: string
}

const adminsData: Admin[] = [
  {
    id: 'ADMIN001',
    name: '管理者太郎',
    email: 'admin@fearlock.com',
    role: 'スーパー管理者',
    permissions: ['全権限'],
    status: 'アクティブ',
    lastLogin: '2024/11/12 10:30',
    createdAt: '2024/01/01',
  },
  {
    id: 'ADMIN002',
    name: '運用花子',
    email: 'operator@fearlock.com',
    role: '運用管理者',
    permissions: ['法人管理', 'メンバー管理', 'プラン管理'],
    status: 'アクティブ',
    lastLogin: '2024/11/12 09:15',
    createdAt: '2024/02/01',
  },
  {
    id: 'ADMIN003',
    name: 'サポート次郎',
    email: 'support@fearlock.com',
    role: 'サポート',
    permissions: ['閲覧のみ', 'サポート対応'],
    status: 'アクティブ',
    lastLogin: '2024/11/11 16:45',
    createdAt: '2024/03/15',
  },
  {
    id: 'ADMIN004',
    name: '開発三郎',
    email: 'dev@fearlock.com',
    role: '開発者',
    permissions: ['バージョン管理', '設定管理'],
    status: 'アクティブ',
    lastLogin: '2024/11/10 14:20',
    createdAt: '2024/04/01',
  },
  {
    id: 'ADMIN005',
    name: '退職者',
    email: 'former@fearlock.com',
    role: '運用管理者',
    permissions: ['法人管理'],
    status: '無効',
    lastLogin: '2024/09/30 18:00',
    createdAt: '2024/01/15',
  },
]

const columns: Column<Admin>[] = [
  {
    key: 'id',
    label: '管理者ID',
    sortable: true,
  },
  {
    key: 'name',
    label: '氏名',
    sortable: true,
  },
  {
    key: 'email',
    label: 'メールアドレス',
    sortable: true,
  },
  {
    key: 'role',
    label: '役割',
    sortable: true,
    render: (row) => {
      let colorClass = 'bg-gray-100 text-gray-800'
      if (row.role === 'スーパー管理者') colorClass = 'bg-red-100 text-red-800'
      if (row.role === '運用管理者') colorClass = 'bg-purple-100 text-purple-800'
      if (row.role === '開発者') colorClass = 'bg-blue-100 text-blue-800'
      
      return (
        <span className={`px-2 py-1 text-xs rounded-full ${colorClass}`}>
          {row.role}
        </span>
      )
    },
  },
  {
    key: 'permissions',
    label: '権限',
    render: (row) => (
      <div className="flex flex-wrap gap-1">
        {row.permissions.slice(0, 2).map((perm, idx) => (
          <span key={idx} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
            {perm}
          </span>
        ))}
        {row.permissions.length > 2 && (
          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
            +{row.permissions.length - 2}
          </span>
        )}
      </div>
    ),
  },
  {
    key: 'status',
    label: 'ステータス',
    sortable: true,
    render: (row) => (
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          row.status === 'アクティブ'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: 'lastLogin',
    label: '最終ログイン',
    sortable: true,
  },
]

export default function MembersPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)

  const breadcrumbs = [
    { label: 'Home', href: '/admin/home' },
    { label: 'メンバー管理' },
  ]

  return (
    <>
    <AddModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="管理者追加">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">氏名 *</label>
          <input
            type="text"
            placeholder="山田太郎"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス *</label>
          <input
            type="email"
            placeholder="admin@fearlock.com"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">役割 *</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">選択してください</option>
            <option value="super">スーパー管理者</option>
            <option value="operator">運用管理者</option>
            <option value="developer">開発者</option>
            <option value="support">サポート</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">権限</label>
          <div className="space-y-2">
            {['法人管理', 'メンバー管理', 'プラン管理', '配信管理', 'バージョン管理', '設定管理'].map((perm) => (
              <label key={perm} className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 text-primary rounded" />
                <span className="text-sm">{perm}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </AddModal>
    
    <AddModal isOpen={showInviteModal} onClose={() => setShowInviteModal(false)} title="招待メール送信">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">招待先メールアドレス *</label>
          <input
            type="email"
            placeholder="newadmin@fearlock.com"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">役割 *</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">選択してください</option>
            <option value="super">スーパー管理者</option>
            <option value="operator">運用管理者</option>
            <option value="developer">開発者</option>
            <option value="support">サポート</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">メッセージ（任意）</label>
          <textarea
            rows={4}
            placeholder="招待メールに含めるメッセージを入力してください"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            招待メールには、アカウント作成用の専用リンクが含まれます。リンクの有効期限は7日間です。
          </p>
        </div>
      </div>
    </AddModal>
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 sm:p-6">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 flex items-center justify-center">
              <Shield className="text-primary" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-medium text-gray-800">メンバー管理</h1>
              <p className="text-sm text-gray-600 mt-1">この管理画面にアクセスできるアカウントを管理します</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">総アカウント数</p>
              <p className="text-2xl font-bold text-gray-800">{adminsData.length}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">アクティブ</p>
              <p className="text-2xl font-bold text-green-600">
                {adminsData.filter(a => a.status === 'アクティブ').length}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">無効</p>
              <p className="text-2xl font-bold text-red-600">
                {adminsData.filter(a => a.status === '無効').length}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">スーパー管理者</p>
              <p className="text-2xl font-bold text-purple-600">
                {adminsData.filter(a => a.role === 'スーパー管理者').length}
              </p>
            </div>
          </div>

          {/* Action Buttons and Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex gap-3">
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
              >
                <Plus size={18} />
                <span>管理者追加</span>
              </button>
              <button 
                onClick={() => setShowInviteModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                <Mail size={18} />
                <span>招待送信</span>
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="管理者名で検索"
                className="flex-1 sm:flex-initial px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Role Legend */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-blue-900 mb-2">役割について</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
              <span><strong>スーパー管理者:</strong> すべての機能にアクセス可能</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
              <span><strong>運用管理者:</strong> 法人・メンバー・プラン管理が可能</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span><strong>開発者:</strong> バージョン・設定管理が可能</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
              <span><strong>サポート:</strong> 閲覧とサポート対応のみ</span>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <DataTable columns={columns} data={adminsData} />
      </div>
    </MainLayout>
    </>
  )
}

