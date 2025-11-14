'use client'

import { X } from 'lucide-react'

interface AddModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children?: React.ReactNode
  onSave?: () => void
}

export default function AddModal({ isOpen, onClose, title, children, onSave }: AddModalProps) {
  if (!isOpen) return null

  const handleSave = () => {
    if (onSave) {
      onSave()
    } else {
      alert('保存しました（デモ）')
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children || (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">この機能は準備中です</p>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                閉じる
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {children && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              保存
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

