import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { FC } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Button } from '../../../ui/button'
import { FormInput } from '../../form-components/FormInput'
import { Title } from '../../Title'
import { formLoginSchema, TFormLoginValues } from './schemas'

/*
  resolver - добавляем валидацию к полям
  credentials - провайдер
*/

interface Props {
  onClose?: VoidFunction
}

export const Login: FC<Props> = ({ onClose }) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const response = await signIn('credentials', {
        ...data,
        redirect: false,
      })

      if (!response?.ok) {
        throw Error()
      }

      toast.success('Вы успешно вошли в аккаунт', {
        icon: '✅',
      })

      onClose?.()
    } catch (error) {
      console.error(error)
      toast.error('Неверный логин или пароль', {
        icon: '❌',
      })
    }
  }

  return (
    <FormProvider {...form}>
      <form
        className='flex flex-col gap-5'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className='flex justify-between items-center'>
          <div className='mr-2'>
            <Title text='Вход в аккаунт' size='md' className='font-bold' />
            <p className='text-gray-400'>
              Введите свою почту, чтобы войти в свой аккаунт
            </p>
          </div>
          <img
            src='/assets/images/phone-icon.png'
            alt='phone'
            width={60}
            height={60}
          />
        </div>

        <FormInput name='email' label='E-mail' required />
        <FormInput name='password' label='Пароль' type='password' required />

        <Button
          loading={form.formState.isSubmitting}
          className='h-12 text-base'
          type='submit'
        >
          Войти
        </Button>
      </form>
    </FormProvider>
  )
}
