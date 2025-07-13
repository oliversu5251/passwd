import React, { useState, useCallback } from 'react'
import { Password } from '../App'
import StrengthIndicator from './StrengthIndicator'

interface PasswordGeneratorProps {
  onPasswordGenerated: (password: Omit<Password, 'id' | 'timestamp'>) => void
}

const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({ onPasswordGenerated }) => {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [passwordType, setPasswordType] = useState<'random' | 'memorable' | 'pin' | 'letters'>('random')
  const [batchCount, setBatchCount] = useState(1)
  const [showBatchOptions, setShowBatchOptions] = useState(false)

  // 字符集定义
  const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  }

  // 计算密码强度
  const calculateStrength = useCallback((pwd: string): Password['strength'] => {
    if (pwd.length < 8) return 'weak'

    let score = 0
    if (/[a-z]/.test(pwd)) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++

    if (pwd.length >= 12) score++
    if (pwd.length >= 16) score++

    if (score <= 2) return 'weak'
    if (score <= 3) return 'medium'
    if (score <= 5) return 'strong'
    return 'very-strong'
  }, [])

  // 生成随机密码
  const generateRandomPassword = useCallback(() => {
    let chars = ''
    if (includeUppercase) chars += charSets.uppercase
    if (includeLowercase) chars += charSets.lowercase
    if (includeNumbers) chars += charSets.numbers
    if (includeSymbols) chars += charSets.symbols

    if (chars === '') {
      alert('请至少选择一种字符类型！')
      return
    }

    const array = new Uint8Array(length)
    crypto.getRandomValues(array)

    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length]
    }

    return result
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols])

  // 生成易记密码
  const generateMemorablePassword = useCallback(() => {
    const words = ['apple', 'banana', 'cherry', 'dragon', 'eagle', 'forest', 'garden', 'house', 'island', 'jungle']
    const word = words[Math.floor(Math.random() * words.length)]
    const number = Math.floor(Math.random() * 1000)
    const symbol = '!@#$%^&*'[Math.floor(Math.random() * 8)]

    return word.charAt(0).toUpperCase() + word.slice(1) + number + symbol
  }, [])

  // 生成PIN码
  const generatePin = useCallback(() => {
    const array = new Uint8Array(length)
    crypto.getRandomValues(array)

    let result = ''
    for (let i = 0; i < length; i++) {
      result += charSets.numbers[array[i] % charSets.numbers.length]
    }

    return result
  }, [length])

  // 生成字母密码
  const generateLetterPassword = useCallback(() => {
    let chars = ''
    if (includeUppercase) chars += charSets.uppercase
    if (includeLowercase) chars += charSets.lowercase

    if (chars === '') {
      chars = charSets.lowercase + charSets.uppercase
    }

    const array = new Uint8Array(length)
    crypto.getRandomValues(array)

    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length]
    }

    return result
  }, [length, includeUppercase, includeLowercase])

  // 生成密码
  const generatePassword = useCallback(() => {
    let generatedPassword = ''

    switch (passwordType) {
      case 'random':
        generatedPassword = generateRandomPassword()
        break
      case 'memorable':
        generatedPassword = generateMemorablePassword()
        break
      case 'pin':
        generatedPassword = generatePin()
        break
      case 'letters':
        generatedPassword = generateLetterPassword()
        break
    }

    if (generatedPassword) {
      setPassword(generatedPassword)
      const strength = calculateStrength(generatedPassword)
      onPasswordGenerated({
        value: generatedPassword,
        strength,
        type: passwordType
      })
    }
  }, [passwordType, generateRandomPassword, generateMemorablePassword, generatePin, generateLetterPassword, calculateStrength, onPasswordGenerated])

  // 批量生成密码
  const generateBatchPasswords = useCallback(() => {
    const passwords: Omit<Password, 'id' | 'timestamp'>[] = []

    for (let i = 0; i < batchCount; i++) {
      let generatedPassword = ''

      switch (passwordType) {
        case 'random':
          generatedPassword = generateRandomPassword()
          break
        case 'memorable':
          generatedPassword = generateMemorablePassword()
          break
        case 'pin':
          generatedPassword = generatePin()
          break
        case 'letters':
          generatedPassword = generateLetterPassword()
          break
      }

      if (generatedPassword) {
        const strength = calculateStrength(generatedPassword)
        passwords.push({
          value: generatedPassword,
          strength,
          type: passwordType
        })
      }
    }

    // 将第一个密码显示在主区域
    if (passwords.length > 0) {
      setPassword(passwords[0].value)
      onPasswordGenerated(passwords[0])
    }

    // 将其他密码也添加到历史记录
    passwords.slice(1).forEach(pwd => {
      onPasswordGenerated(pwd)
    })
  }, [batchCount, passwordType, generateRandomPassword, generateMemorablePassword, generatePin, generateLetterPassword, calculateStrength, onPasswordGenerated])

  // 复制密码到剪贴板
  const copyToClipboard = async () => {
    if (password) {
      try {
        await navigator.clipboard.writeText(password)
        // 可以添加一个临时的成功提示
      } catch (err) {
        console.error('复制失败:', err)
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* 密码显示区域 */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          生成的密码
        </h2>

        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={password}
              readOnly
              className="input flex-1 font-mono text-lg"
              placeholder="点击生成按钮创建密码"
            />
            <button
              onClick={copyToClipboard}
              disabled={!password}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>

          {password && (
            <div className="space-y-2">
              <StrengthIndicator strength={calculateStrength(password)} />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                密码长度: {password.length} 位
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 配置选项区域 */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          配置选项
        </h2>

        <div className="space-y-6">
          {/* 密码类型选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              密码类型
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'random', label: '随机密码', desc: '完全随机字符' },
                { value: 'memorable', label: '易记密码', desc: '基于单词' },
                { value: 'pin', label: 'PIN码', desc: '纯数字' },
                { value: 'letters', label: '字母密码', desc: '仅字母' }
              ].map(type => (
                <button
                  key={type.value}
                  onClick={() => setPasswordType(type.value as any)}
                  className={`p-3 text-left rounded-lg border transition-colors ${
                    passwordType === type.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium text-gray-900 dark:text-gray-100">
                    {type.label}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {type.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 密码长度 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              密码长度: {length}
            </label>
            <input
              type="range"
              min="8"
              max="128"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>8</span>
              <span>128</span>
            </div>
          </div>

          {/* 字符类型选择 */}
          {passwordType === 'random' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                包含字符类型
              </label>
              <div className="space-y-2">
                {[
                  { key: 'uppercase', label: '大写字母 (A-Z)', state: includeUppercase, setter: setIncludeUppercase },
                  { key: 'lowercase', label: '小写字母 (a-z)', state: includeLowercase, setter: setIncludeLowercase },
                  { key: 'numbers', label: '数字 (0-9)', state: includeNumbers, setter: setIncludeNumbers },
                  { key: 'symbols', label: '特殊字符 (!@#$%^&*)', state: includeSymbols, setter: setIncludeSymbols }
                ].map(item => (
                  <label key={item.key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={item.state}
                      onChange={(e) => item.setter(e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* 批量生成选项 */}
          <div>
            <button
              onClick={() => setShowBatchOptions(!showBatchOptions)}
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              {showBatchOptions ? '隐藏' : '显示'} 批量生成选项
            </button>

            {showBatchOptions && (
              <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  生成数量: {batchCount}
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={batchCount}
                  onChange={(e) => setBatchCount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>1</span>
                  <span>50</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 操作按钮区域 */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={generatePassword}
            className="btn btn-primary flex-1"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            生成密码
          </button>

          {showBatchOptions && (
            <button
              onClick={generateBatchPasswords}
              className="btn btn-secondary"
            >
              批量生成 ({batchCount}个)
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default PasswordGenerator
