export type ExchangeStatus = 'available' | 'pending' | 'accepted' | 'rejected'

export type ExchangeCardProps = {
  title: string
  category: string
  description: string
  images: string[]
  isLiked?: boolean
  status: ExchangeStatus //статус обмена
  onExchange: () => void
  onLike: () => void
  onShare: () => void
  onLearnMore: () => void
}
