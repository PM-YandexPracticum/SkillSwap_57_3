import type { NotificationItemProps } from '@ui/NotificationItem'

export type NotificationMenuProps = {
  notifications: (NotificationItemProps & { id: string })[]
}
