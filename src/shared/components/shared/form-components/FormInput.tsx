'use client'

import { X } from 'lucide-react'
import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import { Input } from '../../ui'

interface Props extends React.InputHTMLAttributes<HTMLElement> {
  className?: string
  name: string
  label?: string
  required?: boolean
}

export const FormInput: FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()

  const value = watch(name)
  const errorText = errors[name]?.message as string

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true })
  }

  return (
    <div className={className}>
      {label && (
        <p className='font-medium mb-2'>
          {label} {required && <span className='text-red-500'>*</span>}
        </p>
      )}

      <div className='relative'>
        <Input {...register(name)} className='h-12 text-md' {...props} />
        {value && (
          <button
            onClick={onClickClear}
            className='absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer'
          >
            <X className='w-5 h-5' />
          </button>
        )}
      </div>

      {errorText && <p className='text-red-500 text-sm mt-2'>{errorText}</p>}
    </div>
  )
}
