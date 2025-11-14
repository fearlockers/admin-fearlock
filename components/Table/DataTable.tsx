'use client'

import { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'

export interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  render?: (row: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  onSort?: (key: string, direction: 'asc' | 'desc') => void
}

export default function DataTable<T extends Record<string, any>>({ 
  columns, 
  data,
  onSort 
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  const handleSort = (key: string) => {
    const newDirection = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc'
    setSortKey(key)
    setSortDirection(newDirection)
    onSort?.(key, newDirection)
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full min-w-max">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
              >
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">{column.label}</span>
                  {column.sortable && (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <ArrowUpDown size={16} />
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-colors"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

