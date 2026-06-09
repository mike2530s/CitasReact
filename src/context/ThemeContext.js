import React, { createContext, useContext, useState } from 'react'

const themes = {
  light: {
    mode: 'light',
    bg: '#F8FAFC',
    surface: '#FFFFFF',
    cardBorder: '#F1F5F9',
    text: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    border: '#E2E8F0',
    headerBg: '#FFFFFF',
    headerBorder: '#F1F5F9',
    inputBg: '#FFFFFF',
    overlay: 'rgba(15, 23, 42, 0.5)',
    fabShadow: '#7C3AED',
    avatarBg: '#F5F3FF',
    dateBadgeBg: '#F0FDF4',
    dateBadgeText: '#16A34A',
    btnEditBg: '#F5F3FF',
    btnEditBorder: '#E8E0FF',
    btnDeleteBg: '#FEF2F2',
    btnDeleteBorder: '#FECACA',
    handleBg: '#E2E8F0',
    toggleBg: '#E2E8F0',
    skeletonBg: '#F1F5F9',
  },
  dark: {
    mode: 'dark',
    bg: '#0F172A',
    surface: '#1E293B',
    cardBorder: '#334155',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    border: '#334155',
    headerBg: '#1E293B',
    headerBorder: '#334155',
    inputBg: '#1E293B',
    overlay: 'rgba(0, 0, 0, 0.7)',
    fabShadow: '#7C3AED',
    avatarBg: '#2E1065',
    dateBadgeBg: '#064E3B',
    dateBadgeText: '#34D399',
    btnEditBg: '#2E1065',
    btnEditBorder: '#4C1D95',
    btnDeleteBg: '#450A0A',
    btnDeleteBorder: '#7F1D1D',
    handleBg: '#475569',
    toggleBg: '#475569',
    skeletonBg: '#1E293B',
  },
}

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme: themes[theme], mode: theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

export default ThemeContext
