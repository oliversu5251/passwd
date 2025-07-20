import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import PasswordGenerator from './components/PasswordGenerator'
import PasswordHistory from './components/PasswordHistory'
import ThemeToggle from './components/ThemeToggle'
import LanguageSelect from './components/LanguageSelect'
import { I18N, LANGUAGES, Lang } from './i18n'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export interface Password {
  id: string
  value: string
  strength: 'weak' | 'medium' | 'strong' | 'very-strong'
  timestamp: number
  type: string
}

function getDefaultLang(): Lang {
  const saved = localStorage.getItem('lang') as Lang | null
  if (saved && LANGUAGES[saved]) return saved
  const browser = navigator.language.toLowerCase()
  if (browser.startsWith('zh')) return 'zh'
  if (browser.startsWith('ja')) return 'ja'
  if (browser.startsWith('ko')) return 'ko'
  return 'en'
}

const SEO = {
  title: {
    zh: '安全密码生成器 | Secure Password Generator',
    en: 'Secure Password Generator | 安全密码生成器',
    ja: '安全なパスワードジェネレーター | Secure Password Generator',
    ko: '안전한 비밀번호 생성기 | Secure Password Generator',
  },
  desc: {
    zh: '安全、快速、支持多语言的在线密码生成器，帮助您创建强密码，保护账户安全。',
    en: 'A secure, fast, multi-language online password generator to help you create strong passwords and protect your accounts.',
    ja: '安全で高速、多言語対応のオンラインパスワードジェネレーター。強力なパスワードを簡単に作成。',
    ko: '안전하고 빠르며 다국어 지원 온라인 비밀번호 생성기. 강력한 비밀번호를 쉽게 생성하세요.',
  },
  keywords: '密码生成器, password generator, 强密码, 安全, 随机密码, online, secure, generator',
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [passwordHistory, setPasswordHistory] = useState<Password[]>([])
  const [lang, setLang] = useState<Lang>(getDefaultLang())

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

  // 切换语言
  const handleLangChange = (l: Lang) => {
    setLang(l)
    localStorage.setItem('lang', l)
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
    <HelmetProvider>
      <Helmet>
        <html lang={lang} />
        <title>{SEO.title[lang]}</title>
        <meta name="description" content={SEO.desc[lang]} />
        <meta name="keywords" content={SEO.keywords} />
        <meta property="og:title" content={SEO.title[lang]} />
        <meta property="og:description" content={SEO.desc[lang]} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={lang} />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "${SEO.title[lang]}",
            "description": "${SEO.desc[lang]}",
            "applicationCategory": "SecurityApplication",
            "operatingSystem": "All"
          }
        `}</script>
      </Helmet>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Header lang={lang} i18n={I18N} />
            <div className="flex items-center gap-6">
              {/* Header右侧信息 */}
              <div className="hidden md:flex items-center space-x-6 bg-gray-100/70 dark:bg-gray-700/60 rounded-xl px-4 py-1">
                <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{I18N.header.local[lang]}</span>
                </div>
                <div className="h-5 w-px bg-gray-300 dark:bg-gray-500 mx-2" />
                <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>{I18N.header.safe[lang]}</span>
                </div>
              </div>
              {/* 语言切换 */}
              <LanguageSelect lang={lang} onChange={handleLangChange} />
            </div>
          </div>
        </div>
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* 主生成器区域 */}
            <div className="lg:col-span-2">
              <PasswordGenerator onPasswordGenerated={addToHistory} lang={lang} i18n={I18N} />
            </div>
            {/* 侧边栏 */}
            <div className="space-y-6">
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {I18N.theme.title[lang]}
                  </h3>
                </div>
                <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
              </div>
              <PasswordHistory passwords={passwordHistory} onClear={clearHistory} lang={lang} i18n={I18N} />
            </div>
          </div>
          {/* SEO说明区 */}
          <section className="mt-12 mb-4 text-center text-sm text-gray-500 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {I18N.seoDesc[lang]}
          </section>
        </main>
        <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2025 SecurePass Generator. {I18N.footer.tip[lang]}</p>
          </div>
        </footer>
      </div>
    </HelmetProvider>
  )
}

export default App
