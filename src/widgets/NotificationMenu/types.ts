import type { NotificationItemProps } from '@ui/NotificationItem/types'

export type NotificationMenuProps = {
  notifications: (NotificationItemProps & { id: string })[]
}