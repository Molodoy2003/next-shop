import { NotAuthBlock } from '@/src/shared/components/shared/NotAuthBlock'

export default function UnauthorizedPage() {
  return (
    <div className='flex flex-col items-center justify-center mt-40'>
      <NotAuthBlock
        title='Доступ запрещён'
        text='Данную страницу могут просматривать только авторизованные пользователи'
        imageUrl='/assets/images/lock.png'
      />
    </div>
  )
}
