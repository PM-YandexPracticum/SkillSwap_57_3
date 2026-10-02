import { useState, useEffect } from 'react';
import  searchIcon from '@assets/icon/Search.svg';
import styles from './HeaderSearch.module.css'
import { useDebounce } from '@hooks/useDebounce'


export const HeaderSearch = () => {
  const [query, setQuery] = useState('');

  const debouncedQuery = useDebounce(query, 600);

  useEffect(() => {
    if (debouncedQuery.trim() === '') return;
  }, [debouncedQuery])

  return (
    <label className={styles.search}>
      <img
      src={searchIcon}
      alt="Searc logo"
      className={styles.icon}
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Искать навык"
        className={styles.input}
      />
    </label>
  );
};
