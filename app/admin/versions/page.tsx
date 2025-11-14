'use client'

import { useState } from 'react'
import MainLayout from '@/components/Layout/MainLayout'
import AddModal from '@/components/Modals/AddModal'
import { Plus, GitBranch, Download, CheckCircle, AlertCircle } from 'lucide-react'

interface Version {
  version: string
  releaseDate: string
  status: string
  downloads: number
  changes: string[]
  type: 'major' | 'minor' | 'patch'
}

const versionsData: Version[] = [
  {
    version: 'v2.4.6',
    releaseDate: '2024/11/01',
    status: '最新',
    downloads: 128,
    type: 'patch',
    changes: [
      'セキュリティパッチの適用',
      'メンバー管理画面のUI改善',
      '配信機能のバグ修正',
    ],
  },
  {
    version: 'v2.4.5',
    releaseDate: '2024/10/15',
    status: '安定版',
    downloads: 256,
    type: 'patch',
    changes: [
      'パフォーマンスの最適化',
      '通知機能の改善',
    ],
  },
  {
    version: 'v2.4.0',
    releaseDate: '2024/09/20',
    status: '安定版',
    downloads: 512,
    type: 'minor',
    changes: [
      '新しいダッシュボード機能',
      'プラン管理の追加',
      'レポート機能の強化',
    ],
  },
  {
    version: 'v2.3.8',
    releaseDate: '2024/08/10',
    status: '廃止予定',
    downloads: 89,
    type: 'patch',
    changes: [
      'バグ修正',
      'マイナーアップデート',
    ],
  },
]

export default function VersionsPage() {
  const [showAddModal, setShowAddModal] = useState(false)

  const breadcrumbs = [
    { label: 'Home', href: '/admin/home' },
    { label: 'バージョン管理' },
  ]

  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null)

  const handleDetail = (version: Version) => {
    setSelectedVersion(version)
    setShowDetailModal(true)
  }

  const handleDownload = (version: Version) => {
    alert(`バージョン ${version.version} をダウンロードします（デモ）`)
  }

  return (
    <>
    <AddModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="新規バージョン作成">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">バージョン番号 *</label>
          <input
            type="text"
            placeholder="v2.5.0"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">バージョンタイプ *</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">選択してください</option>
            <option value="major">Major（大規模変更）</option>
            <option value="minor">Minor（機能追加）</option>
            <option value="patch">Patch（バグ修正）</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">リリース日</label>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">変更内容 *</label>
          <textarea
            rows={6}
            placeholder="変更内容を1行ずつ入力してください"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ファイルアップロード</label>
          <input
            type="file"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
    </AddModal>

    <AddModal isOpen={showDetailModal} onClose={() => setShowDetailModal(false)} title={`バージョン詳細 - ${selectedVersion?.version}`}>
      {selectedVersion && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">バージョン</label>
            <p className="text-lg font-bold text-gray-800">{selectedVersion.version}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">タイプ</label>
            <span className={`px-3 py-1 text-sm rounded-full ${
              selectedVersion.type === 'major' ? 'bg-red-100 text-red-800' :
              selectedVersion.type === 'minor' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {selectedVersion.type.toUpperCase()}
            </span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">リリース日</label>
            <p className="text-gray-800">{selectedVersion.releaseDate}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ダウンロード数</label>
            <p className="text-gray-800">{selectedVersion.downloads} DL</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">変更内容</label>
            <ul className="space-y-1">
              {selectedVersion.changes.map((change, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-primary mt-1">•</span>
                  <span>{change}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </AddModal>
    <MainLayout breadcrumbs={breadcrumbs}>
      <div className="p-4 sm:p-6">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <GitBranch className="text-primary" size={24} />
              </div>
              <h1 className="text-xl font-medium text-gray-800">バージョン管理</h1>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors"
            >
              <Plus size={18} />
              <span>新規バージョン</span>
            </button>
          </div>

          {/* Current Version Info */}
          <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">現在のバージョン</p>
                <h2 className="text-3xl font-bold">v2.4.6</h2>
                <p className="text-sm opacity-90 mt-2">リリース日: 2024/11/01</p>
              </div>
              <div className="text-right">
                <div className="bg-white/20 rounded-lg p-4">
                  <p className="text-sm opacity-90 mb-1">総ダウンロード数</p>
                  <p className="text-2xl font-bold">985</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-600 mb-1">総バージョン数</p>
            <p className="text-2xl font-bold text-gray-800">24</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-600 mb-1">アクティブ</p>
            <p className="text-2xl font-bold text-green-600">3</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-600 mb-1">廃止予定</p>
            <p className="text-2xl font-bold text-yellow-600">1</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <p className="text-sm text-gray-600 mb-1">今月リリース</p>
            <p className="text-2xl font-bold text-blue-600">1</p>
          </div>
        </div>

        {/* Versions List */}
        <div className="space-y-4">
          {versionsData.map((version, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <GitBranch className="text-primary" size={24} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-800">{version.version}</h3>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          version.type === 'major'
                            ? 'bg-red-100 text-red-800'
                            : version.type === 'minor'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {version.type.toUpperCase()}
                      </span>
                      {version.status === '最新' && (
                        <CheckCircle size={18} className="text-green-600" />
                      )}
                      {version.status === '廃止予定' && (
                        <AlertCircle size={18} className="text-yellow-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">リリース日: {version.releaseDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 text-sm rounded-full ${
                        version.status === '最新'
                          ? 'bg-green-100 text-green-800'
                          : version.status === '廃止予定'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {version.status}
                    </span>
                    <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
                      <Download size={14} />
                      <span>{version.downloads} DL</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Changes */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">変更内容:</h4>
                <ul className="space-y-1">
                  {version.changes.map((change, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-primary mt-1">•</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <button 
                  onClick={() => handleDetail(version)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  詳細を見る
                </button>
                <button 
                  onClick={() => handleDownload(version)}
                  className="px-4 py-2 text-sm border border-primary text-primary rounded hover:bg-primary/5 transition-colors"
                >
                  ダウンロード
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
    </>
  )
}

