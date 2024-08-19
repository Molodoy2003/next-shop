'use client'

import { updateUserInfo } from '@/src/app/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button } from '../ui/button'
import { Container } from './Container'
import { Title } from './Title'
import { FormInput } from './form-components/FormInput'
import {
  formRegisterSchema,
  TFormRegisterValues,
} from './modals/auth-modal/schemas'

interface Props {
  data: User
}

export const ProfileInfo: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      })

      toast.success('Данные обновлены 📝', {
        icon: '✅',
      })
    } catch (error) {
      return toast.error('Ошибка при обновлении данных', {
        icon: '❌',
      })
    }
  }

  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
    })
  }

  return (
    <Container className='my-10'>
      <Title text='Персональные данные' size='md' className='font-bold' />

      <FormProvider {...form}>
        <form
          className='flex flex-col gap-5 w-[800px] mt-10'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className='flex flex-wrap gap-6'>
            <FormInput
              className='w-[380px]'
              name='email'
              label='E-Mail'
              required
            />
            <FormInput
              className='w-[380px]'
              name='fullName'
              label='Полное имя'
              required
            />

            <FormInput
              className='w-[380px]'
              type='password'
              name='password'
              label='Новый пароль'
            />
            <FormInput
              className='w-[380px]'
              type='password'
              name='confirmPassword'
              label='Повторите пароль'
            />
          </div>

          <Button
            disabled={form.formState.isSubmitting}
            className='text-base mt-5 w-80'
            type='submit'
          >
            Сохранить
          </Button>

          <Button
            onClick={onClickSignOut}
            variant='outline'
            disabled={form.formState.isSubmitting}
            className='text-base w-80'
            type='button'
          >
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
  )
}
