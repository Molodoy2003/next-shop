'use client'

import { cn } from '@/src/shared/lib/utils'
import { CircleUser, User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Button } from '../ui'
import { CartButton } from './CartButton'
import { Container } from './Container'
import { SearchInput } from './SearchInput'
import { AuthModal } from './modals/auth-modal/auth-modal'

type Props = {
  hasSearch?: boolean
  hasCartButton?: boolean
  className?: string
}

export const Header: FC<Props> = ({
  className,
  hasCartButton = true,
  hasSearch = true,
}) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [openModal, setOpenModal] = useState(false)

  const searchParams = useSearchParams()

  useEffect(() => {
    let toastMessage = ''

    if (searchParams.has('paid')) {
      toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.'
    }

    if (searchParams.has('verified')) {
      toastMessage = 'Почта успешно подтверждена!'
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace('/')
        toast.success(toastMessage, {
          duration: 3000,
        })
      }, 1000)
    }
  }, [searchParams, router])

  return (
    <header className={cn('border-b', className)}>
      <Container className='flex items-center justify-between py-12'>
        {/* Левая часть */}
        <Link href='/'>
          <div className='flex items-center gap-4'>
            <Image src='/logo.png' alt='logo' width={35} height={35} />
            <div>
              <h1 className='text-2xl uppercase font-black'>TasteTown</h1>
              <p className='text-base text-gray-400 leading-3'>
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {/* Поиск */}
        {hasSearch && (
          <div className='mx-10 flex-1'>
            <SearchInput />
          </div>
        )}

        {/* Правая часть */}
        <div className='flex items-center gap-3'>
          <AuthModal open={openModal} onClose={() => setOpenModal(false)} />

          {!session ? (
            <Button
              onClick={() => setOpenModal(true)}
              variant='outline'
              className='flex items-center gap-1'
            >
              <User size={16} />
              Войти
            </Button>
          ) : (
            <Link href='/profile'>
              <Button variant='secondary' className='flex items-center gap-2'>
                <CircleUser size={18} />
                Профиль
              </Button>
            </Link>
          )}
          <div>{hasCartButton && <CartButton />}</div>
        </div>
      </Container>
    </header>
  )
}
