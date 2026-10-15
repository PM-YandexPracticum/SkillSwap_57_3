export type ButtonsWithIconProps = {
  text?: string
  iconSrc: string
  onClick: () => void
  size: 'small' | 'semi-medium' | 'medium' | 'large' | 'extra-small' | 'full-width'
  gap?: 'gapSmall' | 'gapLarge'
  position?: 'left' | 'right'
  border?: boolean
  greenBorder?: boolean
  rotate?: boolean
  className?: string
}
