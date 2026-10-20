import { UserMenu } from '@widgets/userMenu'
import styles from './ProfilePage.module.css'
import { ProfileForm } from '@/widgets/ProfileForm'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Values } from '@/widgets/ProfileForm/schema'
import { updateUser } from '@/entities/auth/authSlice'

export default function ProfilePage() {
  const dispatch = useAppDispatch()
  const authUserData = useAppSelector((state) => state.auth.data?.user)

  console.log(authUserData)

  const initialValues = {
    email: authUserData?.email,
    name: authUserData?.name,
    birthDate: new Date(authUserData!.birth_date),
    gender: String(authUserData?.gender_id),
    city: String(authUserData?.city_id),
    about: authUserData?.bio,
  }

  const onSave = async (
    values: Values & {
      password?: string
      image_path?: File | string
    },
  ) => {
    try {
      await dispatch(updateUser({ ...values, user_id: authUserData!.id }))
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <main className={styles.page}>
      <aside className={styles.sidebar}>
        <UserMenu />
      </aside>
      <div className={styles.content}>
        <ProfileForm initialValues={initialValues} onSave={onSave} />
      </div>
    </main>
  )
}
