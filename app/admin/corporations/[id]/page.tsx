'use client'

import { useState } from 'react'
import MainLayout from '@/components/Layout/MainLayout'
import DataTable, { Column } from '@/components/Table/DataTable'
import AddModal from '@/components/Modals/AddModal'
import { ArrowLeft, Plus, Edit, Search, Users, Mail, Building, Package } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

interface CorporationMember {
  id: string
  name: string
  email: string
  role: string
  department: string
  status: string
  lastLogin: string
  joinedAt: string
}

// サンプルデータ（実際はAPIから取得）
const corporationsData: { [key: string]: any } = {
  'CORP001': {
    id: 'CORP001',
    name: '株式会社テクノロジー',
    email: 'contact@technology.co.jp',
    plan: 'エンタープライズ',
    status: 'アクティブ',
    createdAt: '2024/01/15',
    address: '東京都渋谷区渋谷1-1-1',
    phone: '03-1234-5678',
    members: [
      {
        id: 'MEM001',
        name: '山田太郎',
        email: 'yamada@technology.co.jp',
        role: '管理者',
        department: '開発部',
        status: 'アクティブ',
        lastLogin: '2024/11/12 10:30',
        joinedAt: '2024/01/15',
      },
      {
        id: 'MEM005',
        name: '高橋次郎',
        email: 'takahashi@technology.co.jp',
        role: 'メンバー',
        department: '営業部',
        status: 'アクティブ',
        lastLogin: '2024/11/11 14:20',
        joinedAt: '2024/02/01',
      },
      {
        id: 'MEM006',
        name: '伊藤花子',
        email: 'ito@technology.co.jp',
        role: 'メンバー',
        department: '人事部',
        status: 'アクティブ',
        lastLogin: '2024/11/10 09:15',
        joinedAt: '2024/03/15',
      },
    ],
  },
  'CORP002': {
    id: 'CORP002',
    name: '株式会社イノベーション',
    email: 'info@innovation.co.jp',
    plan: 'ビジネス',
    status: 'アクティブ',
    createdAt: '2024/02/20',
    address: '大阪府大阪市北区梅田2-2-2',
    phone: '06-2345-6789',
    members: [
      {
        id: 'MEM002',
        name: '佐藤花子',
        email: 'sato@innovation.co.jp',
        role: '管理者',
        department: '企画部',
        status: 'アクティブ',
        lastLogin: '2024/11/11 15:20',
        joinedAt: '2024/02/20',
      },
    ],
  },
  'CORP003': {
    id: 'CORP003',
    name: '株式会社フューチャー',
    email: 'hello@future.co.jp',
    plan: 'スタンダード',
    status: 'アクティブ',
    createdAt: '2024/03/10',
    address: '名古屋市中区栄3-3-3',
    phone: '052-3456-7890',
    members: [
      {
        id: 'MEM003',
        name: '鈴木一郎',
        email: 'suzuki@future.co.jp',
        role: '管理者',
        department: '総務部',
        status: 'アクティブ',
        lastLogin: '2024/11/10 09:15',
        joinedAt: '2024/03/10',
      },
    ],
  },
  'CORP004': {
    id: 'CORP004',
    name: '株式会社デジタル',
    email: 'support@digital.co.jp',
    plan: 'ビジネス',
    status: '停止中',
    createdAt: '2024/01/05',
    address: '福岡市博多区博多駅前4-4-4',
    phone: '092-4567-8901',
    members: [
      {
        id: 'MEM004',
        name: '田中美咲',
        email: 'tanaka@digital.co.jp',
        role: '管理者',
        department: '管理部',
        status: '休止中',
        lastLogin: '2024/10/30 14:45',
        joinedAt: '2024/01/05',
      },
    ],
  },
}

const columns: Column<CorporationMember>[] = [
  {
    key: 'id',
    label: 'メンバーID',
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
    key: 'department',
    label: '部署',
    sortable: true,
  },
  {
    key: 'role',
    label: '役割',
    sortable: true,
    render: (row) => (
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          row.role === '管理者'
            ? 'bg-purple-100 text-purple-800'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {row.role}
      </span>
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
            : 'bg-yellow-100 text-yellow-800'
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

export default function CorporationDetailPage() {
  const params = useParams()
  const router = useRouter()
  const corporationId = params.id as string
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  
  const corporation = corporationsData[corporationId]
  
  if (!corporation) {
    return (
      <MainLayout breadcrumbs={[{ label: 'Home', href: '/admin/home' }, { label: '法人管理', href: '/admin/corporations' }, { label: '法人が見つかりません' }]}>
        <div className="p-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-gray-600">指定された法人が見つかりませんでした。</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  const breadcrumbs = [
    { label: 'Home', href: '/admin/home' },
    { label: '法人管理', href: '/admin/corporations' },
    { label: corporation.name },
  ]

  return (
    <>
    <AddModal isOpen={showAddMemberModal} onClose={() => setShowAddMemberModal(false)} title="メンバー追加" />
    <AddModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="法人情報編集" />
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 sm:p-6">
        {/* Back Button */}
        <button
          onClick={() => router.push('/admin/corporations')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary mb-4 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>法人一覧に戻る</span>
        </button>

        {/* Corporation Info Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                <Building className="text-primary" size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-1">{corporation.name}</h1>
                <p className="text-gray-600 mb-2">{corporation.id}</p>
                <span
                  className={`inline-block px-3 py-1 text-sm rounded-full ${
                    corporation.status === 'アクティブ'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {corporation.status}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setShowEditModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              <Edit size={18} />
              <span>編集</span>
            </button>
          </div>

          {/* Corporation Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">メールアドレス</p>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-gray-400" />
                  <p className="text-gray-800">{corporation.email}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">電話番号</p>
                <p className="text-gray-800">{corporation.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">住所</p>
                <p className="text-gray-800">{corporation.address}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">プラン</p>
                <div className="flex items-center gap-2">
                  <Package size={16} className="text-gray-400" />
                  <p className="font-medium text-gray-800">{corporation.plan}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">メンバー数</p>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-gray-400" />
                  <p className="text-gray-800">{corporation.members.length}名</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">登録日</p>
                <p className="text-gray-800">{corporation.createdAt}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Members Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Users className="text-primary" size={24} />
              <h2 className="text-xl font-medium text-gray-800">メンバー管理</h2>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowAddMemberModal(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
              >
                <Plus size={18} />
                <span>メンバー追加</span>
              </button>
            </div>
          </div>

          {/* Members Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">総メンバー数</p>
              <p className="text-2xl font-bold text-gray-800">{corporation.members.length}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">アクティブ</p>
              <p className="text-2xl font-bold text-green-600">
                {corporation.members.filter((m: CorporationMember) => m.status === 'アクティブ').length}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">休止中</p>
              <p className="text-2xl font-bold text-yellow-600">
                {corporation.members.filter((m: CorporationMember) => m.status === '休止中').length}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">管理者</p>
              <p className="text-2xl font-bold text-purple-600">
                {corporation.members.filter((m: CorporationMember) => m.role === '管理者').length}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              placeholder="メンバー名で検索"
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Members Table */}
        <DataTable columns={columns} data={corporation.members} />
      </div>
    </MainLayout>
    </>
  )
}

