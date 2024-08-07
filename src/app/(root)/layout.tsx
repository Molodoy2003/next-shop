import { Header } from '@/src/shared/components/shared/Header'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'TasteTown | Главная',
}

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <main className='min-h-screen'>
      <Suspense>
        <Header />
      </Suspense>
      {children}
      {modal}
    </main>
  )
}