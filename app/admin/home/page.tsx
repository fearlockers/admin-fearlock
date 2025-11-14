'use client'

import MainLayout from '@/components/Layout/MainLayout'
import { Users, Building, Package, Radio, GitBranch, TrendingUp } from 'lucide-react'

interface StatCard {
  title: string
  value: string
  icon: React.ReactNode
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
}

const stats: StatCard[] = [
  {
    title: '総法人数',
    value: '128',
    icon: <Building size={24} />,
    change: '+12%',
    changeType: 'positive',
  },
  {
    title: '総メンバー数',
    value: '1,547',
    icon: <Users size={24} />,
    change: '+8%',
    changeType: 'positive',
  },
  {
    title: 'アクティブプラン',
    value: '89',
    icon: <Package size={24} />,
    change: '+5%',
    changeType: 'positive',
  },
  {
    title: '配信中',
    value: '23',
    icon: <Radio size={24} />,
    change: '0%',
    changeType: 'neutral',
  },
  {
    title: '最新バージョン',
    value: 'v2.4.6',
    icon: <GitBranch size={24} />,
    change: '最新',
    changeType: 'neutral',
  },
  {
    title: '今月の成長率',
    value: '15.3%',
    icon: <TrendingUp size={24} />,
    change: '+3.2%',
    changeType: 'positive',
  },
]

export default function HomePage() {
  const breadcrumbs = [
    { label: 'Home' },
  ]

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 sm:p-6">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-2xl font-medium text-gray-800 mb-2">ダッシュボード</h1>
          <p className="text-gray-600">管理画面へようこそ。システムの概要を確認できます。</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  {stat.icon}
                </div>
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === 'positive'
                      ? 'text-green-600'
                      : stat.changeType === 'negative'
                      ? 'text-red-600'
                      : 'text-gray-600'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Updates */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">最近の更新</h2>
            <div className="space-y-3">
              {[
                { text: '新規法人「株式会社テクノロジー」が追加されました', time: '2時間前' },
                { text: 'プラン「エンタープライズ」が更新されました', time: '4時間前' },
                { text: 'メンバー「山田太郎」が登録されました', time: '6時間前' },
                { text: 'バージョン v2.4.6 がリリースされました', time: '1日前' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{activity.text}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">クイックアクション</h2>
            <div className="space-y-3">
              <a href="/admin/corporations" className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Building size={20} className="text-primary" />
                <span className="text-sm text-gray-800">新規法人を追加</span>
              </a>
              <a href="/admin/members" className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Users size={20} className="text-primary" />
                <span className="text-sm text-gray-800">管理者を招待</span>
              </a>
              <a href="/admin/plans" className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Package size={20} className="text-primary" />
                <span className="text-sm text-gray-800">プランを作成</span>
              </a>
              <a href="/admin/distributions" className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                <Radio size={20} className="text-primary" />
                <span className="text-sm text-gray-800">配信を開始</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

