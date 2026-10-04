export type UserCardVariant = 'catalog' | 'author';

export type UserCardProps = {
  variant?: UserCardVariant;
  avatarUrl: string;
  name: string;
  location: string;
  about?: string;
  canTeach: string[];
  wantsToLearn: string[];
  isLiked?: boolean;
  onLike?: () => void;
  onDetails?: () => void;
};