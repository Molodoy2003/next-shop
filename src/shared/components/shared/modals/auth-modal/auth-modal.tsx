import { signIn } from 'next-auth/react'
import { FC, useState } from 'react'
import { Button } from '../../../ui/button'
import { Dialog, DialogContent, DialogTitle } from '../../../ui/dialog'
import { Login } from './login'
import { Register } from './register'

interface Props {
  open: boolean
  onClose: () => void
}

export const AuthModal: FC<Props> = ({ open, onClose }) => {
  const [type, setType] = useState<'login' | 'register'>('login')

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login')
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className='w-[450px] bg-white p-10'>
        <DialogTitle />
        {type === 'login' ? (
          <Login onClose={handleClose} />
        ) : (
          <Register onClose={handleClose} />
        )}

        <hr />

        <div className='flex gap-2'>
          <Button
            variant='secondary'
            onClick={() =>
              signIn('github', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type='button'
            className='gap-2 h-12 p-2 flex-1'
          >
            <img
              alt='auth'
              className='w-6 h-6'
              src='https://github.githubassets.com/favicons/favicon.svg'
            />
            GitHub
          </Button>
          <Button
            variant='secondary'
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type='button'
            className='gap-2 h-12 p-2 flex-1'
          >
            <img
              alt='auth'
              className='w-6 h-6'
              src='https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg'
            />
            Google
          </Button>
        </div>

        <Button
          variant='outline'
          onClick={onSwitchType}
          type='button'
          className='h-12'
        >
          {type === 'login' ? 'Регистрация' : 'Войти'}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
