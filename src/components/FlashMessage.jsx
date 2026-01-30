import React, { useEffect } from 'react'

export default function FlashMessage({ message, type, onClose, duration = 4000 }) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [message, duration, onClose])

  if (!message) return null

  const getIcon = () => {
    switch (type) {
      case 'success': return '✅'
      case 'error': return '⚠️'
      case 'info': return 'ℹ️'
      case 'warning': return '⚡'
      default: return 'ℹ️'
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case 'success': return 'linear-gradient(135deg, #1a4d2e 0%, #2d7a4f 100%)'
      case 'error': return 'linear-gradient(135deg, #8b1a1a 0%, #b82424 100%)'
      case 'info': return 'linear-gradient(135deg, #1a3a5d 0%, #2d5a8a 100%)'
      case 'warning': return 'linear-gradient(135deg, #8b6914 0%, #b8941d 100%)'
      default: return 'linear-gradient(135deg, #1a3a5d 0%, #2d5a8a 100%)'
    }
  }

  return (
    <div
      className="flash-message"
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 10000,
        background: getBackgroundColor(),
        color: '#fff',
        padding: '1rem 1.5rem',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)',
        border: '2px solid rgba(255, 215, 0, 0.4)',
        minWidth: '300px',
        maxWidth: '500px',
        animation: 'slideInRight 0.5s ease-out, fadeOut 0.5s ease-out ' + (duration - 500) + 'ms forwards',
        fontFamily: "'Cinzel', serif",
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}
    >
      <span style={{ fontSize: '1.5rem' }}>{getIcon()}</span>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>{message}</p>
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          color: '#fff',
          fontSize: '1.2rem',
          cursor: 'pointer',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          transition: 'background 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
        onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
      >
        ×
      </button>
    </div>
  )
}
