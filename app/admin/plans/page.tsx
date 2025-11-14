'use client'

import { useState } from 'react'
import MainLayout from '@/components/Layout/MainLayout'
import AddModal from '@/components/Modals/AddModal'
import { Plus, Edit, Package, Check } from 'lucide-react'

interface Plan {
  name: string
  price: string
  features: string[]
  users: number
  status: string
  color: string
}

const plansData: Plan[] = [
  {
    name: 'スタンダード',
    price: '¥5,000',
    features: [
      'メンバー数: 最大50名',
      'ストレージ: 10GB',
      '基本機能',
      'メールサポート',
    ],
    users: 45,
    status: 'アクティブ',
    color: 'blue',
  },
  {
    name: 'ビジネス',
    price: '¥15,000',
    features: [
      'メンバー数: 最大200名',
      'ストレージ: 50GB',
      '全機能利用可能',
      '優先サポート',
      'カスタムブランディング',
    ],
    users: 205,
    status: 'アクティブ',
    color: 'purple',
  },
  {
    name: 'エンタープライズ',
    price: '¥50,000',
    features: [
      'メンバー数: 無制限',
      'ストレージ: 無制限',
      '全機能利用可能',
      '24/7サポート',
      'カスタムブランディング',
      '専任担当者',
      'SLA保証',
    ],
    users: 150,
    status: 'アクティブ',
    color: 'green',
  },
]

export default function PlansPage() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const breadcrumbs = [
    { label: 'Home', href: '/admin/home' },
    { label: 'プラン管理' },
  ]

  return (
    <>
    <AddModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="新規プラン作成">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">プラン名 *</label>
          <input
            type="text"
            placeholder="プレミアム"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">月額料金 *</label>
          <div className="flex items-center gap-2">
            <span>¥</span>
            <input
              type="number"
              placeholder="10000"
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">メンバー数上限</label>
          <input
            type="number"
            placeholder="100"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ストレージ容量</label>
          <input
            type="text"
            placeholder="50GB"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">機能</label>
          <div className="space-y-2">
            {['基本機能', '優先サポート', 'カスタムブランディング', 'API利用', '専任担当者'].map((feature) => (
              <label key={feature} className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 text-primary rounded" />
                <span className="text-sm">{feature}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </AddModal>
    
    <AddModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="プラン編集">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">プラン名 *</label>
          <input
            type="text"
            defaultValue="エンタープライズ"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">月額料金 *</label>
          <div className="flex items-center gap-2">
            <span>¥</span>
            <input
              type="number"
              defaultValue="50000"
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ステータス</label>
          <select defaultValue="active" className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="active">アクティブ</option>
            <option value="inactive">非アクティブ</option>
          </select>
        </div>
      </div>
    </AddModal>
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 sm:p-6">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <Package className="text-primary" size={24} />
              </div>
              <h1 className="text-xl font-medium text-gray-800">プラン管理</h1>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
            >
              <Plus size={18} />
              <span>新規プラン</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">総プラン数</p>
              <p className="text-2xl font-bold text-gray-800">3</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">利用法人数</p>
              <p className="text-2xl font-bold text-green-600">128</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">月間収益</p>
              <p className="text-2xl font-bold text-blue-600">¥2.1M</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">人気プラン</p>
              <p className="text-2xl font-bold text-purple-600">ビジネス</p>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plansData.map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border-t-4"
              style={{
                borderTopColor:
                  plan.color === 'blue'
                    ? '#3b82f6'
                    : plan.color === 'purple'
                    ? '#a855f7'
                    : '#10b981',
              }}
            >
              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-800">{plan.price}</span>
                  <span className="text-gray-600">/月</span>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats */}
              <div className="mb-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">利用法人数</span>
                  <span className="font-bold text-gray-800">{plan.users}社</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  {plan.status}
                </span>
              </div>

              {/* Actions */}
              <button 
                onClick={() => setShowEditModal(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                <Edit size={16} />
                <span>編集</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
    </>
  )
}

