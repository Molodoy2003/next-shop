'use client'

import React from 'react'
import { AddressSuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'

interface Props {
  onChange?: (value?: string) => void
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <div className='mb-5'>
      <label>Адрес</label>
      <AddressSuggestions
        token='0cc7d40d0773a10d5c86f8a43549da83685494b4'
        onChange={data => onChange?.(data?.value)}
      />
    </div>
  )
}
