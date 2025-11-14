'use client'

import { useState } from 'react'
import MainLayout from '@/components/Layout/MainLayout'
import AddModal from '@/components/Modals/AddModal'
import { Plus, Edit, Search, Building, Mail, Package } from 'lucide-react'

interface Corporation {
  id: string
  name: string
  email: string
  plan: string
  members: number
  status: string
  createdAt: string
}

const corporationsData: Corporation[] = [
  {
    id: 'CORP001',
    name: '株式会社テクノロジー',
    email: 'contact@technology.co.jp',
    plan: 'エンタープライズ',
    members: 150,
    status: 'アクティブ',
    createdAt: '2024/01/15',
  },
  {
    id: 'CORP002',
    name: '株式会社イノベーション',
    email: 'info@innovation.co.jp',
    plan: 'ビジネス',
    members: 85,
    status: 'アクティブ',
    createdAt: '2024/02/20',
  },
  {
    id: 'CORP003',
    name: '株式会社フューチャー',
    email: 'hello@future.co.jp',
    plan: 'スタンダード',
    members: 45,
    status: 'アクティブ',
    createdAt: '2024/03/10',
  },
  {
    id: 'CORP004',
    name: '株式会社デジタル',
    email: 'support@digital.co.jp',
    plan: 'ビジネス',
    members: 120,
    status: '停止中',
    createdAt: '2024/01/05',
  },
]

const columns: Column<Corporation>[] = [
  {
    key: 'id',
    label: '法人ID',
    sortable: true,
  },
  {
    key: 'name',
    label: '法人名',
    sortable: true,
  },
  {
    key: 'email',
    label: 'メールアドレス',
    sortable: true,
  },
  {
    key: 'plan',
    label: 'プラン',
    sortable: true,
  },
  {
    key: 'members',
    label: 'メンバー数',
    sortable: true,
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
    key: 'createdAt',
    label: '登録日',
    sortable: true,
  },
]

export default function CorporationsPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const breadcrumbs = [
    { label: 'Home', href: '/admin/home' },
    { label: '法人管理' },
  ]

  const filteredCorporations = corporationsData.filter(corp =>
    corp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    corp.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
    <AddModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="新規法人登録">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">法人名 *</label>
          <input
            type="text"
            placeholder="株式会社○○"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス *</label>
          <input
            type="email"
            placeholder="contact@company.co.jp"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">電話番号</label>
          <input
            type="tel"
            placeholder="03-1234-5678"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">住所</label>
          <input
            type="text"
            placeholder="東京都..."
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">プラン *</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">選択してください</option>
            <option value="standard">スタンダード</option>
            <option value="business">ビジネス</option>
            <option value="enterprise">エンタープライズ</option>
          </select>
        </div>
      </div>
    </AddModal>
    
    <AddModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="法人情報編集">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">法人名 *</label>
          <input
            type="text"
            defaultValue="株式会社テクノロジー"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス *</label>
          <input
            type="email"
            defaultValue="contact@technology.co.jp"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">プラン</label>
          <select defaultValue="enterprise" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="standard">スタンダード</option>
            <option value="business">ビジネス</option>
            <option value="enterprise">エンタープライズ</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ステータス</label>
          <select defaultValue="active" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="active">アクティブ</option>
            <option value="suspended">停止中</option>
          </select>
        </div>
      </div>
    </AddModal>
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 sm:p-6">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 flex items-center justify-center">
              <Building className="text-primary" size={24} />
            </div>
            <h1 className="text-xl font-medium text-gray-800">法人管理</h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">総法人数</p>
              <p className="text-2xl font-bold text-gray-800">128</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">アクティブ</p>
              <p className="text-2xl font-bold text-green-600">115</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">停止中</p>
              <p className="text-2xl font-bold text-red-600">13</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">今月追加</p>
              <p className="text-2xl font-bold text-blue-600">8</p>
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
                <span>新規登録</span>
              </button>
              <button 
                onClick={() => setShowEditModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors"
              >
                <Edit size={18} />
                <span>編集</span>
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="法人名で検索"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 sm:flex-initial px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Corporations Grid/List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCorporations.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">検索結果が見つかりませんでした</p>
            </div>
          ) : (
            filteredCorporations.map((corp) => (
            <a
              key={corp.id}
              href={`/admin/corporations/${corp.id}`}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-primary"
            >
              {/* Corporation Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{corp.name}</h3>
                  <p className="text-sm text-gray-600">{corp.id}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full flex-shrink-0 ${
                    corp.status === 'アクティブ'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {corp.status}
                </span>
              </div>

              {/* Corporation Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={16} className="text-gray-400" />
                  <span className="truncate">{corp.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Package size={16} className="text-gray-400" />
                  <span>{corp.plan}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-600 mb-1">メンバー数</p>
                  <p className="text-xl font-bold text-gray-800">{corp.members}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">登録日</p>
                  <p className="text-sm font-medium text-gray-800">{corp.createdAt}</p>
                </div>
              </div>
            </a>
          )))}
        </div>
      </div>
    </MainLayout>
    </>
  )
}

