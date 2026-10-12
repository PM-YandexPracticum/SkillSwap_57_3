import { useEffect } from 'react'
import searchIcon from '@assets/icon/Search.svg'
import styles from './HeaderSearch.module.css'
import { useDebounce } from '@hooks/useDebounce'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setSearchQuery, selectSearchQuery } from '@/entities/search/model/searchSlice'

export const HeaderSearch = () => {
  const dispatch = useAppDispatch()
  const query = useAppSelector(selectSearchQuery)

  const debouncedQuery = useDebounce(query, 600)

  useEffect(() => {
    if (debouncedQuery.trim() === '') return
  }, [debouncedQuery])

  return (
    <label className={styles.search}>
      <img src={searchIcon} alt="Searc logo" className={styles.icon} />
      <input
        type="text"
        value={query}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        placeholder="Искать навык"
        className={styles.input}
      />
    </label>
  )
}
