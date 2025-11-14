'use client'

import MainLayout from '@/components/Layout/MainLayout'
import DataTable, { Column } from '@/components/Table/DataTable'
import { Plus, Edit, Search } from 'lucide-react'

interface Manager {
  email: string
  name: string
  group: string
  createdAt: string
  updatedAt: string
}

const managersData: Manager[] = [
  {
    email: 'itra@manaable.com',
    name: '伊虎太郎',
    group: 'C法人',
    createdAt: '2021/07/30',
    updatedAt: '2021/07/30',
  },
  {
    email: 'itra+3@manaable.com',
    name: '田中次郎',
    group: 'B部署',
    createdAt: '2021/07/30',
    updatedAt: '2021/07/30',
  },
  {
    email: 'itra+1@itra.co.jp',
    name: '佐藤義信',
    group: 'B部署',
    createdAt: '2021/07/30',
    updatedAt: '2021/07/30',
  },
  {
    email: 'admin@manaable.com',
    name: '鈴木智子',
    group: 'A支部',
    createdAt: '2021/07/30',
    updatedAt: '2021/07/30',
  },
]

const columns: Column<Manager>[] = [
  {
    key: 'email',
    label: '登録者',
    sortable: true,
  },
  {
    key: 'name',
    label: '管理者名',
    sortable: true,
  },
  {
    key: 'group',
    label: '管理者グループ',
    sortable: true,
  },
  {
    key: 'createdAt',
    label: '作成日',
    sortable: true,
  },
  {
    key: 'updatedAt',
    label: '変更日',
    sortable: true,
  },
]

export default function ManagersPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/admin/home' },
    { label: '管理者管理' },
    { label: '一覧' },
  ]

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 sm:p-6">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-gray-400 rounded"></div>
            </div>
            <h1 className="text-xl font-medium text-gray-800">管理者一覧</h1>
          </div>

          {/* Action Buttons and Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors">
                <Plus size={18} />
                <span>登録</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors">
                <Edit size={18} />
                <span>変更</span>
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="検索"
                className="flex-1 sm:flex-initial px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <DataTable columns={columns} data={managersData} />
      </div>
    </MainLayout>
  )
}

