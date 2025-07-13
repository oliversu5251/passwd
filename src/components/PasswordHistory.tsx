import React from 'react'
import { Password } from '../App'

interface PasswordHistoryProps {
  passwords: Password[]
  onClear: () => void
}

const PasswordHistory: React.FC<PasswordHistoryProps> = ({ passwords, onClear }) => {
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    if (diff < 60000) return '刚刚'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
    return date.toLocaleDateString()
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'random': return '随机'
      case 'memorable': return '易记'
      case 'pin': return 'PIN'
      case 'letters': return '字母'
      default: return type
    }
  }

  if (passwords.length === 0) {
    return (
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            历史记录
          </h3>
        </div>
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>暂无历史记录</p>
          <p className="text-sm">生成的密码将显示在这里</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          历史记录 ({passwords.length})
        </h3>
        <button
          onClick={onClear}
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          清除
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {passwords.map((pwd) => (
          <div
            key={pwd.id}
            className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
          >
            <div className="flex items-start justify-between space-x-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded">
                    {getTypeLabel(pwd.type)}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTime(pwd.timestamp)}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <code className="flex-1 text-sm font-mono text-gray-900 dark:text-gray-100 break-all">
                    {pwd.value}
                  </code>
                  <button
                    onClick={() => copyToClipboard(pwd.value)}
                    className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    title="复制密码"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>

                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {pwd.value.length}位
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">强度:</span>
                    <div className={`w-2 h-2 rounded-full ${
                      pwd.strength === 'weak' ? 'bg-danger-500' :
                      pwd.strength === 'medium' ? 'bg-warning-500' :
                      pwd.strength === 'strong' ? 'bg-success-500' :
                      'bg-success-600'
                    }`} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PasswordHistory
