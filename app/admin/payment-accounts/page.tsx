'use client'

import MainLayout from '@/components/Layout/MainLayout'

export default function PaymentAccountsPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/admin/home' },
    { label: '管理者管理' },
    { label: '売上入金先一覧' },
  ]

  return (
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-xl font-medium text-gray-800 mb-4">売上入金先一覧</h1>
          <p className="text-gray-600">このページは準備中です。</p>
        </div>
      </div>
    </MainLayout>
  )
}

