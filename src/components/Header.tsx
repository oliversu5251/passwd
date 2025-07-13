import React from 'react'
import { Lang } from '../i18n'

const Header: React.FC<{ lang: Lang; i18n: any }> = ({ lang, i18n }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {i18n.title[lang]}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          SecurePass Generator
        </p>
      </div>
    </div>
  )
}

export default Header
