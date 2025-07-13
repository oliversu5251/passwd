import React from 'react'
import { LANGUAGES, Lang } from '../i18n'

interface LanguageSelectProps {
  lang: Lang
  onChange: (lang: Lang) => void
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ lang, onChange }) => {
  return (
    <select
      value={lang}
      onChange={e => onChange(e.target.value as Lang)}
      className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      style={{ minWidth: 90 }}
      aria-label="Select language"
    >
      {Object.entries(LANGUAGES).map(([key, label]) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </select>
  )
}

export default LanguageSelect
