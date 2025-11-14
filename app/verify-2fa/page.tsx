'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, ArrowLeft } from 'lucide-react'

export default function Verify2FAPage() {
  const router = useRouter()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  useEffect(() => {
    // 最初の入力欄にフォーカス
    inputRefs[0].current?.focus()
  }, [])

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1)
    }

    if (!/^\d*$/.test(value)) {
      return
    }

    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    setError('')

    // 次の入力欄にフォーカス
    if (value && index < 5) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (!/^\d+$/.test(pastedData)) {
      return
    }

    const newCode = [...code]
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newCode[i] = pastedData[i]
    }
    setCode(newCode)

    // 最後の入力欄または貼り付けた次の欄にフォーカス
    const nextIndex = Math.min(pastedData.length, 5)
    inputRefs[nextIndex].current?.focus()
  }

  const handleVerify = () => {
    const verificationCode = code.join('')
    
    if (verificationCode.length !== 6) {
      setError('6桁の認証コードを入力してください')
      return
    }

    setIsLoading(true)
    setError('')

    // デモ: 任意のコードでOK（実際はバックエンドで検証）
    setTimeout(() => {
      // 正しいコードの場合
      if (verificationCode === '123456' || verificationCode.length === 6) {
        router.push('/admin/home')
      } else {
        setError('認証コードが正しくありません')
        setIsLoading(false)
        setCode(['', '', '', '', '', ''])
        inputRefs[0].current?.focus()
      }
    }, 1000)
  }

  const handleResend = () => {
    alert('認証コードを再送信しました（デモ）')
  }

  const handleBack = () => {
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg">
            <Shield className="text-primary" size={32} />
          </div>
          <h1 className="text-3xl font-light text-white mb-2">二段階認証</h1>
          <p className="text-white/80 text-sm">認証アプリに表示されている6桁のコードを入力してください</p>
        </div>

        {/* Verification Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft size={18} />
            <span className="text-sm">ログイン画面に戻る</span>
          </button>

          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">認証コード入力</h2>
          <p className="text-gray-600 text-sm text-center mb-8">
            Google Authenticator または Authy に表示されているコードを入力してください
          </p>

          {/* Code Input */}
          <div className="flex justify-center gap-2 mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`w-12 h-14 text-center text-2xl font-bold border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                  error 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:border-primary'
                }`}
                disabled={isLoading}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 text-center">{error}</p>
            </div>
          )}

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={isLoading || code.join('').length !== 6}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>認証中...</span>
              </>
            ) : (
              <>
                <Shield size={20} />
                <span>認証する</span>
              </>
            )}
          </button>

          {/* Resend Code */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">コードが届いていませんか？</p>
            <button
              onClick={handleResend}
              disabled={isLoading}
              className="text-sm text-primary hover:text-primary-dark font-medium disabled:opacity-50"
            >
              認証コードを再送信
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>ヒント:</strong> 認証コードは30秒ごとに更新されます。新しいコードが表示されるまでお待ちください。
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/60 text-sm">
          <p>セキュリティのため、このコードは誰にも教えないでください</p>
        </div>
      </div>
    </div>
  )
}

