'use client'

import { Container, Title } from '@/src/shared/components/shared'
import {
  CheckoutFormSchema,
  CheckoutFormValues,
} from '@/src/shared/components/shared/checkout/CheckoutFormSchema'
import { CheckoutLeftSide } from '@/src/shared/components/shared/checkout/CheckoutLeftSide'
import { CheckoutRightSide } from '@/src/shared/components/shared/checkout/CheckoutRightSide'
import { useFerchCart } from '@/src/shared/hooks/use-fetch-cart'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { createOrder } from '../../actions'

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false)
  const { loading } = useFerchCart()
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(CheckoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  })

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true)
      // url - ссылка для перехода на оплату заказа
      const url = await createOrder(data)

      toast.success('Заказ успешно оформлен! 📝 Переход на оплату...', {
        icon: '✅',
      })

      if (url) {
        location.href = url
      }
    } catch (error) {
      console.error(error)
      setSubmitting(false)
      toast.error('Не удалось создать заказ', {
        icon: '❌',
      })
    }
  }

  return (
    <Container className='mt-8'>
      <Title
        text='Оформление заказа'
        className='font-extrabold mb-8 text-[36px]'
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex gap-10'>
            {/* Левая часть */}
            <div className='flex flex-col gap-10 flex-1 mb-20'>
              <CheckoutLeftSide />
            </div>

            {/* Правая часть */}
            <div className='w-[450px]'>
              <CheckoutRightSide loading={loading || submitting} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}
