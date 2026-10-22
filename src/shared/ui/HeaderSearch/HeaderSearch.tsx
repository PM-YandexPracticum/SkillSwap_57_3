import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import searchIcon from '@assets/icon/Search.svg'
import styles from './HeaderSearch.module.css'
import { useDebounce } from '@hooks/useDebounce'
import { setSearch } from '@/entities/filters/filterSlice'

export const HeaderSearch = () => {
  const dispatch = useAppDispatch()
  const search = useAppSelector((state) => state.filters.users.search)

  const [query, setQuery] = useState('')

  const debouncedQuery = useDebounce(query, 600)

  useEffect(() => {
    dispatch(setSearch(debouncedQuery.trim()))
  }, [debouncedQuery, dispatch])

  useEffect(() => {
    if (search === '') {
      setQuery('')
    }
  }, [search])

  return (
    <label className={styles.search}>
      <img src={searchIcon} alt="Searc logo" className={styles.icon} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Искать навык"
        className={styles.input}
      />
    </label>
  )
}
