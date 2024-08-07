import { PizzaSize, PizzaType } from '@/src/shared/constants/pizza'
import { useFerchCart } from '@/src/shared/hooks/use-fetch-cart'
import { getCartItemDetails } from '@/src/shared/lib/getCartItemDetails'
import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { AddressInput } from '../AddressInput'
import { FormInput } from '../form-components/FormInput'
import { FormTextarea } from '../form-components/FormTextarea'
import { WhiteBlock } from '../white-block'
import { CheckoutItem } from './CheckoutItem'

interface Props {
  className?: string
}

export const CheckoutLeftSide: FC<Props> = ({ className }) => {
  const { updateItemQuantity, items, deleteCartItem, loading } = useFerchCart()
  const { control } = useFormContext()

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
    updateItemQuantity(id, newQuantity)
  }

  return (
    <div className={className}>
      <WhiteBlock title='1. Корзина'>
        <div className='flex flex-col gap-5'>
          {items.map(item => (
            <CheckoutItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              details={getCartItemDetails(
                item.ingredients,
                item.pizzaType as PizzaType,
                item.pizzaSize as PizzaSize
              )}
              name={item.name}
              price={item.price}
              disabled={item.disabled}
              quantity={item.quantity}
              onClickCountButton={type =>
                onClickCountButton(item.id, item.quantity, type)
              }
              onClickRemove={() => deleteCartItem(item.id)}
            />
          ))}
        </div>
      </WhiteBlock>

      <WhiteBlock title='2. Персональные данные'>
        <div className='grid grid-cols-2 gap-5 w-[800px]'>
          <FormInput name='firstName' className='text-base' placeholder='Имя' />
          <FormInput
            name='lastName'
            className='text-base'
            placeholder='Фамилия'
          />
          <FormInput name='email' className='text-base ' placeholder='E-mail' />
          <FormInput
            name='phone'
            className='text-base '
            placeholder='Телефон'
          />
        </div>
      </WhiteBlock>
      <WhiteBlock title='3. Адрес доставки'>
        <div className='flex flex-col'>
          <Controller
            control={control}
            name='address'
            render={({ field, fieldState }) => (
              <>
                <AddressInput onChange={field.onChange} />
                {fieldState.error && (
                  <p className='text-red-500 text-sm'>
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />

          <FormTextarea
            name='comment'
            rows={5}
            className='text-base'
            placeholder='Комментарий к заказу'
          />
        </div>
      </WhiteBlock>
    </div>
  )
}
