export type ButtonsWithIconProps = {
  text: string
  iconSrc: string
  onClick: () => void
  size: 'small' | 'medium' | 'large'
  gap: 'gapSmall' | 'gapLarge'
  position?: 'left' | 'right'
  border?: boolean
}
