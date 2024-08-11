import { getServerSession } from 'next-auth'
import { authOptions } from '../constants/auth-options'

/* 
  getServerSession - возвращает сессию, которая содержит информацию о пользователе
*/

export const getUserSession = async () => {
  const session = await getServerSession(authOptions)

  return session?.user ?? null
}
