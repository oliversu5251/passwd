export type Lang = 'zh' | 'en' | 'ja' | 'ko'

export const LANGUAGES: Record<Lang, string> = {
  zh: '中文',
  en: 'English',
  ja: '日本語',
  ko: '한국어',
}

export const I18N = {
  title: {
    zh: '安全密码生成器',
    en: 'Secure Password Generator',
    ja: '安全なパスワードジェネレーター',
    ko: '안전한 비밀번호 생성기',
  },
  config: {
    title: {
      zh: '配置选项',
      en: 'Options',
      ja: 'オプション',
      ko: '옵션',
    },
    type: {
      zh: '密码类型',
      en: 'Password Type',
      ja: 'パスワードタイプ',
      ko: '비밀번호 유형',
    },
    length: {
      zh: '密码长度',
      en: 'Password Length',
      ja: 'パスワードの長さ',
      ko: '비밀번호 길이',
    },
    charset: {
      zh: '包含字符类型',
      en: 'Character Set',
      ja: '含まれる文字種',
      ko: '포함 문자 종류',
    },
    batch: {
      zh: '批量生成选项',
      en: 'Batch Options',
      ja: 'バッチ生成オプション',
      ko: '일괄 생성 옵션',
    },
    batchCount: {
      zh: '生成数量',
      en: 'Count',
      ja: '生成数',
      ko: '생성 개수',
    },
    showBatch: {
      zh: '显示',
      en: 'Show',
      ja: '表示',
      ko: '표시',
    },
    hideBatch: {
      zh: '隐藏',
      en: 'Hide',
      ja: '非表示',
      ko: '숨기기',
    },
    generate: {
      zh: '生成密码',
      en: 'Generate',
      ja: '生成',
      ko: '생성',
    },
    batchGenerate: {
      zh: '批量生成',
      en: 'Batch Generate',
      ja: 'バッチ生成',
      ko: '일괄 생성',
    },
    random: {
      zh: '随机密码',
      en: 'Random',
      ja: 'ランダム',
      ko: '랜덤',
    },
    memorable: {
      zh: '易记密码',
      en: 'Memorable',
      ja: '覚えやすい',
      ko: '기억하기 쉬움',
    },
    pin: {
      zh: 'PIN码',
      en: 'PIN',
      ja: 'PIN',
      ko: 'PIN',
    },
    letters: {
      zh: '字母密码',
      en: 'Letters',
      ja: '文字のみ',
      ko: '문자만',
    },
    randomDesc: {
      zh: '完全随机字符',
      en: 'Fully random',
      ja: '完全ランダム',
      ko: '완전 랜덤',
    },
    memorableDesc: {
      zh: '基于单词',
      en: 'Based on words',
      ja: '単語ベース',
      ko: '단어 기반',
    },
    pinDesc: {
      zh: '纯数字',
      en: 'Numbers only',
      ja: '数字のみ',
      ko: '숫자만',
    },
    lettersDesc: {
      zh: '仅字母',
      en: 'Letters only',
      ja: '文字のみ',
      ko: '문자만',
    },
    uppercase: {
      zh: '大写字母 (A-Z)',
      en: 'Uppercase (A-Z)',
      ja: '大文字 (A-Z)',
      ko: '대문자 (A-Z)',
    },
    lowercase: {
      zh: '小写字母 (a-z)',
      en: 'Lowercase (a-z)',
      ja: '小文字 (a-z)',
      ko: '소문자 (a-z)',
    },
    numbers: {
      zh: '数字 (0-9)',
      en: 'Numbers (0-9)',
      ja: '数字 (0-9)',
      ko: '숫자 (0-9)',
    },
    symbols: {
      zh: '特殊字符 (!@#$%^&*)',
      en: 'Symbols (!@#$%^&*)',
      ja: '記号 (!@#$%^&*)',
      ko: '기호 (!@#$%^&*)',
    },
    lengthMin: {
      zh: '最小',
      en: 'Min',
      ja: '最小',
      ko: '최소',
    },
    lengthMax: {
      zh: '最大',
      en: 'Max',
      ja: '最大',
      ko: '최대',
    },
  },
  result: {
    title: {
      zh: '生成的密码',
      en: 'Generated Password',
      ja: '生成されたパスワード',
      ko: '생성된 비밀번호',
    },
    copy: {
      zh: '复制',
      en: 'Copy',
      ja: 'コピー',
      ko: '복사',
    },
    copied: {
      zh: '已复制!',
      en: 'Copied!',
      ja: 'コピーしました!',
      ko: '복사됨!',
    },
    length: {
      zh: '密码长度',
      en: 'Length',
      ja: '長さ',
      ko: '길이',
    },
  },
  strength: {
    label: {
      zh: '密码强度',
      en: 'Strength',
      ja: '強度',
      ko: '강도',
    },
    weak: {
      zh: '弱',
      en: 'Weak',
      ja: '弱い',
      ko: '약함',
    },
    medium: {
      zh: '中',
      en: 'Medium',
      ja: '中',
      ko: '중간',
    },
    strong: {
      zh: '强',
      en: 'Strong',
      ja: '強い',
      ko: '강함',
    },
    veryStrong: {
      zh: '极强',
      en: 'Very Strong',
      ja: '非常に強い',
      ko: '매우 강함',
    },
    tips: {
      weak: {
        zh: '建议使用至少4位密码或包含更多字符类型',
        en: 'Use at least 4 chars or more types',
        ja: '4文字以上または多様な文字種を推奨',
        ko: '4자 이상 또는 다양한 문자 조합 권장',
      },
      medium: {
        zh: '密码强度一般，建议增加长度或特殊字符',
        en: 'Medium strength, consider more length or symbols',
        ja: '中程度、長さや記号追加推奨',
        ko: '중간 강도, 길이/기호 추가 권장',
      },
      strong: {
        zh: '密码强度良好，适合大多数用途',
        en: 'Strong, suitable for most uses',
        ja: '強い、ほとんどの用途に十分',
        ko: '강함, 대부분 용도에 적합',
      },
      veryStrong: {
        zh: '密码强度极高，非常安全',
        en: 'Very strong, highly secure',
        ja: '非常に強い、安全性高い',
        ko: '매우 강함, 매우 안전',
      },
    },
  },
  history: {
    title: {
      zh: '历史记录',
      en: 'History',
      ja: '履歴',
      ko: '기록',
    },
    clear: {
      zh: '清除',
      en: 'Clear',
      ja: 'クリア',
      ko: '지우기',
    },
    empty: {
      zh: '暂无历史记录',
      en: 'No history yet',
      ja: '履歴なし',
      ko: '기록 없음',
    },
    tip: {
      zh: '生成的密码将显示在这里',
      en: 'Generated passwords will appear here',
      ja: '生成されたパスワードがここに表示されます',
      ko: '생성된 비밀번호가 여기에 표시됩니다',
    },
    type: {
      random: {
        zh: '随机', en: 'Random', ja: 'ランダム', ko: '랜덤',
      },
      memorable: {
        zh: '易记', en: 'Memorable', ja: '覚えやすい', ko: '기억하기 쉬움',
      },
      pin: {
        zh: 'PIN', en: 'PIN', ja: 'PIN', ko: 'PIN',
      },
      letters: {
        zh: '字母', en: 'Letters', ja: '文字', ko: '문자',
      },
    },
    ago: {
      just: {
        zh: '刚刚', en: 'just now', ja: 'たった今', ko: '방금',
      },
      min: {
        zh: '分钟前', en: 'min ago', ja: '分前', ko: '분 전',
      },
      hour: {
        zh: '小时前', en: 'h ago', ja: '時間前', ko: '시간 전',
      },
    },
    length: {
      zh: '位', en: 'chars', ja: '文字', ko: '자',
    },
    strength: {
      zh: '强度', en: 'Strength', ja: '強度', ko: '강도',
    },
  },
  theme: {
    title: {
      zh: '主题设置', en: 'Theme', ja: 'テーマ', ko: '테마',
    },
    dark: {
      zh: '深色', en: 'Dark', ja: 'ダーク', ko: '다크',
    },
    light: {
      zh: '浅色', en: 'Light', ja: 'ライト', ko: '라이트',
    },
  },
  footer: {
    tip: {
      zh: '所有密码生成均在本地完成，确保您的隐私安全。',
      en: 'All passwords are generated locally for your privacy.',
      ja: 'すべてのパスワードはローカルで生成され、プライバシーが守られます。',
      ko: '모든 비밀번호는 로컬에서 생성되어 개인정보가 안전합니다.',
    },
  },
  header: {
    local: {
      zh: '100% 本地生成',
      en: '100% Local Generation',
      ja: '100% ローカル生成',
      ko: '100% 로컬 생성',
    },
    safe: {
      zh: '快速安全',
      en: 'Fast & Secure',
      ja: '高速・安全',
      ko: '빠르고 안전함',
    }
  },
}
