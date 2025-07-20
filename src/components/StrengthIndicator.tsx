import React from 'react'
import { Lang } from '../i18n'

interface StrengthIndicatorProps {
  strength: 'weak' | 'medium' | 'strong' | 'very-strong'
  lang: Lang
  i18n: any
}

const strengthStars = {
  'weak': 1,
  'medium': 2,
  'strong': 3,
  'very-strong': 4,
}

const starColor = {
  'weak': 'text-danger-500',
  'medium': 'text-warning-500',
  'strong': 'text-success-500',
  'very-strong': 'text-success-600',
}

const StrengthIndicator: React.FC<StrengthIndicatorProps> = ({ strength, lang, i18n }) => {
  const getStrengthConfig = (strength: string) => {
    switch (strength) {
      case 'weak':
        return {
          label: i18n.strength.weak[lang],
          color: 'danger',
          width: '25%',
          bgColor: 'bg-danger-500',
          textColor: 'text-danger-700 dark:text-danger-400'
        }
      case 'medium':
        return {
          label: i18n.strength.medium[lang],
          color: 'warning',
          width: '50%',
          bgColor: 'bg-warning-500',
          textColor: 'text-warning-700 dark:text-warning-400'
        }
      case 'strong':
        return {
          label: i18n.strength.strong[lang],
          color: 'success',
          width: '75%',
          bgColor: 'bg-success-500',
          textColor: 'text-success-700 dark:text-success-400'
        }
      case 'very-strong':
        return {
          label: i18n.strength.veryStrong[lang],
          color: 'success',
          width: '100%',
          bgColor: 'bg-success-600',
          textColor: 'text-success-700 dark:text-success-400'
        }
      default:
        return {
          label: '未知',
          color: 'gray',
          width: '0%',
          bgColor: 'bg-gray-300',
          textColor: 'text-gray-500'
        }
    }
  }

  const config = getStrengthConfig(strength)
  const stars = strengthStars[strength]

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {i18n.strength.label[lang]}
        </span>
        <span className={`text-sm font-semibold ${config.textColor} flex items-center gap-1`}>
          {config.label}
          <span className="ml-2 flex items-center">
            {[1,2,3,4].map(i => (
              <svg
                key={i}
                className={`w-4 h-4 ${i <= stars ? starColor[strength] : 'text-gray-300 dark:text-gray-600'}`}
                fill={i <= stars ? 'currentColor' : 'none'}
                stroke="currentColor"
                viewBox="0 0 20 20"
              >
                <polygon points="10,2 12.59,7.36 18.51,8.09 14,12.26 15.18,18.02 10,15 4.82,18.02 6,12.26 1.49,8.09 7.41,7.36" />
              </svg>
            ))}
          </span>
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${config.bgColor}`}
          style={{ width: config.width }}
        />
      </div>
      <div className="text-xs text-gray-600 dark:text-gray-400">
        {strength === 'weak' && i18n.strength.tips.weak[lang]}
        {strength === 'medium' && i18n.strength.tips.medium[lang]}
        {strength === 'strong' && i18n.strength.tips.strong[lang]}
        {strength === 'very-strong' && i18n.strength.tips.veryStrong[lang]}
      </div>
    </div>
  )
}

export default StrengthIndicator
