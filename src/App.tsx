import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import PasswordGenerator from './components/PasswordGenerator'
import PasswordHistory from './components/PasswordHistory'
import ThemeToggle from './components/ThemeToggle'

export interface Password {
  id: string
  value: string
  strength: 'weak' | 'medium' | 'strong' | 'very-strong'
  timestamp: number
  type: string
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [passwordHistory, setPasswordHistory] = useState<Password[]>([])

  // 初始化主题
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  // 切换主题
  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)

    if (newTheme) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  // 添加密码到历史记录
  const addToHistory = (password: Omit<Password, 'id' | 'timestamp'>) => {
    const newPassword: Password = {
      ...password,
      id: Date.now().toString(),
      timestamp: Date.now()
    }

    setPasswordHistory(prev => [newPassword, ...prev.slice(0, 9)]) // 只保留最近10个
  }

  // 清除历史记录
  const clearHistory = () => {
    setPasswordHistory([])
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* 主生成器区域 */}
          <div className="lg:col-span-2">
            <PasswordGenerator onPasswordGenerated={addToHistory} />
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  主题设置
                </h3>
              </div>
              <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
            </div>

            <PasswordHistory
              passwords={passwordHistory}
              onClear={clearHistory}
            />
          </div>
        </div>
      </main>

      <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2025 SecurePass Generator. 所有密码生成均在本地完成，确保您的隐私安全。</p>
        </div>
      </footer>
    </div>
  )
}

export default App
