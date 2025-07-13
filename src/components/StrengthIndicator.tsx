import React from 'react'

interface StrengthIndicatorProps {
  strength: 'weak' | 'medium' | 'strong' | 'very-strong'
}

const StrengthIndicator: React.FC<StrengthIndicatorProps> = ({ strength }) => {
  const getStrengthConfig = (strength: string) => {
    switch (strength) {
      case 'weak':
        return {
          label: '弱',
          color: 'danger',
          width: '25%',
          bgColor: 'bg-danger-500',
          textColor: 'text-danger-700 dark:text-danger-400'
        }
      case 'medium':
        return {
          label: '中',
          color: 'warning',
          width: '50%',
          bgColor: 'bg-warning-500',
          textColor: 'text-warning-700 dark:text-warning-400'
        }
      case 'strong':
        return {
          label: '强',
          color: 'success',
          width: '75%',
          bgColor: 'bg-success-500',
          textColor: 'text-success-700 dark:text-success-400'
        }
      case 'very-strong':
        return {
          label: '极强',
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

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          密码强度
        </span>
        <span className={`text-sm font-semibold ${config.textColor}`}>
          {config.label}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${config.bgColor}`}
          style={{ width: config.width }}
        />
      </div>

      <div className="text-xs text-gray-600 dark:text-gray-400">
        {strength === 'weak' && '建议使用更长的密码或包含更多字符类型'}
        {strength === 'medium' && '密码强度一般，建议增加长度或特殊字符'}
        {strength === 'strong' && '密码强度良好，适合大多数用途'}
        {strength === 'very-strong' && '密码强度极高，非常安全'}
      </div>
    </div>
  )
}

export default StrengthIndicator
