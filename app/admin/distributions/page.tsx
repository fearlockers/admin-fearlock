'use client'

import { useState } from 'react'
import MainLayout from '@/components/Layout/MainLayout'
import DataTable, { Column } from '@/components/Table/DataTable'
import AddModal from '@/components/Modals/AddModal'
import { Plus, Radio, Search, Play, Pause } from 'lucide-react'

interface Distribution {
  id: string
  title: string
  type: string
  target: string
  status: string
  scheduled: string
  sent: number
  total: number
}

const distributionsData: Distribution[] = [
  {
    id: 'DIST001',
    title: '新機能リリースのお知らせ',
    type: 'メール',
    target: '全法人',
    status: '配信完了',
    scheduled: '2024/11/10 10:00',
    sent: 128,
    total: 128,
  },
  {
    id: 'DIST002',
    title: 'メンテナンス通知',
    type: 'プッシュ通知',
    target: 'アクティブユーザー',
    status: '配信中',
    scheduled: '2024/11/12 09:00',
    sent: 856,
    total: 1425,
  },
  {
    id: 'DIST003',
    title: '料金改定のご案内',
    type: 'メール',
    target: 'エンタープライズプラン',
    status: '予約済み',
    scheduled: '2024/11/15 14:00',
    sent: 0,
    total: 45,
  },
  {
    id: 'DIST004',
    title: '新プラン案内',
    type: 'メール + プッシュ',
    target: 'ビジネスプラン',
    status: '下書き',
    scheduled: '未設定',
    sent: 0,
    total: 83,
  },
]

const columns: Column<Distribution>[] = [
  {
    key: 'id',
    label: '配信ID',
    sortable: true,
  },
  {
    key: 'title',
    label: '件名',
    sortable: true,
  },
  {
    key: 'type',
    label: '配信タイプ',
    sortable: true,
    render: (row) => (
      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
        {row.type}
      </span>
    ),
  },
  {
    key: 'target',
    label: '配信対象',
    sortable: true,
  },
  {
    key: 'status',
    label: 'ステータス',
    sortable: true,
    render: (row) => {
      let colorClass = 'bg-gray-100 text-gray-800'
      if (row.status === '配信完了') colorClass = 'bg-green-100 text-green-800'
      if (row.status === '配信中') colorClass = 'bg-yellow-100 text-yellow-800'
      if (row.status === '予約済み') colorClass = 'bg-blue-100 text-blue-800'
      
      return (
        <span className={`px-2 py-1 text-xs rounded-full ${colorClass}`}>
          {row.status}
        </span>
      )
    },
  },
  {
    key: 'scheduled',
    label: '配信予定日時',
    sortable: true,
  },
  {
    key: 'progress',
    label: '進捗',
    render: (row) => (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-700">
          {row.sent}/{row.total}
        </span>
        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary"
            style={{ width: `${(row.sent / row.total) * 100}%` }}
          ></div>
        </div>
      </div>
    ),
  },
]

export default function DistributionsPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showSendModal, setShowSendModal] = useState(false)

  const breadcrumbs = [
    { label: 'Home', href: '/admin/home' },
    { label: '配信管理' },
  ]

  return (
    <>
    <AddModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="新規配信作成">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">件名 *</label>
          <input
            type="text"
            placeholder="お知らせのタイトル"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">配信タイプ *</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">選択してください</option>
            <option value="email">メール</option>
            <option value="push">プッシュ通知</option>
            <option value="both">メール + プッシュ</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">配信対象 *</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">選択してください</option>
            <option value="all">全法人</option>
            <option value="active">アクティブユーザー</option>
            <option value="standard">スタンダードプラン</option>
            <option value="business">ビジネスプラン</option>
            <option value="enterprise">エンタープライズプラン</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">本文 *</label>
          <textarea
            rows={6}
            placeholder="配信する内容を入力してください"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">配信予定日時</label>
          <input
            type="datetime-local"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </AddModal>
    
    <AddModal isOpen={showSendModal} onClose={() => setShowSendModal(false)} title="即時配信">
      <div className="space-y-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800 font-medium">
            ⚠️ この配信はすぐに送信されます。内容を確認してください。
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">件名 *</label>
          <input
            type="text"
            placeholder="緊急のお知らせ"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">配信タイプ *</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="email">メール</option>
            <option value="push">プッシュ通知</option>
            <option value="both">メール + プッシュ</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">配信対象 *</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="all">全法人</option>
            <option value="active">アクティブユーザー</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">本文 *</label>
          <textarea
            rows={4}
            placeholder="緊急のお知らせ内容"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
      </div>
    </AddModal>
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 sm:p-6">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 flex items-center justify-center">
              <Radio className="text-primary" size={24} />
            </div>
            <h1 className="text-xl font-medium text-gray-800">配信管理</h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">総配信数</p>
              <p className="text-2xl font-bold text-gray-800">245</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">配信中</p>
              <p className="text-2xl font-bold text-yellow-600">1</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">予約済み</p>
              <p className="text-2xl font-bold text-blue-600">3</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">今月配信</p>
              <p className="text-2xl font-bold text-green-600">12</p>
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
                <span>新規配信</span>
              </button>
              <button 
                onClick={() => setShowSendModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                <Play size={18} />
                <span>即時配信</span>
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="配信を検索"
                className="flex-1 sm:flex-initial px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <DataTable columns={columns} data={distributionsData} />
      </div>
    </MainLayout>
    </>
  )
}

