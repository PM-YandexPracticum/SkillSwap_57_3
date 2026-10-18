import { NavLink } from 'react-router-dom';
import requestIcon from '@assets/icon/Request.svg';
import messageIcon from '@assets/icon/Message.svg';
import likeIcon from '@assets/icon/LikeDefault.svg';
import ideaIcon from '@assets/icon/Idea.svg';
import userIcon from '@assets/icon/User.svg';           
import styles from './userMenu.module.css';

const MENU_ITEMS = [
  { icon: requestIcon, text: 'Заявки', path: '/profile/requests' },
  { icon: messageIcon, text: 'Мои обмены', path: '/profile/exchanges' },
  { icon: likeIcon, text: 'Избранное', path: '/favorites' },
  { icon: ideaIcon, text: 'Мои навыки', path: '/profile/skills' },
  { icon: userIcon, text: 'Личные данные', path: '/profile', end: true },  
];

export function UserMenu() {
  return (
    <nav className={styles.menu}>
      {MENU_ITEMS.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.end}                                     
          className={({ isActive }) =>
            `${styles.item} ${isActive ? styles.active : ''}`
          }
        >
          <img src={item.icon} alt="" className={styles.icon} />
          <span className={styles.text}>{item.text}</span>
        </NavLink>
      ))}
    </nav>
  );
}