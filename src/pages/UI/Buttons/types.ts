export type ButtonsProps = {
  text: string;
  onClick: () => void;
  variant: 'whiteButton' | 'greenButton';
  size: 'small' | 'medium' | 'large' | 'full-width' | 'extra-large';
}
