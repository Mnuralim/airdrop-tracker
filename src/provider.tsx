'use client'
import { SessionProvider } from 'next-auth/react'
import { AppProgressBar } from 'next-nprogress-bar'

interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <AppProgressBar
        height="6px"
        color="
        #3b82f6"
        options={{
          showSpinner: false,
          easing: 'ease',
          speed: 1500,
        }}
        shallowRouting
      />
      {children}
    </SessionProvider>
  )
}
