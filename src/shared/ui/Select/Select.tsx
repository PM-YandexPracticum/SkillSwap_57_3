import { SelectProps } from './types'
import styles from './Select.module.css'
import chevronDown from './chevron-down.svg'
import { useState } from 'react'
import ReactSelect from 'react-select'
import { StylesConfig } from 'react-select'

type SelectOption = {
  value: string
  label: string
}

export const Select = ({ labelName, placeholder, options, value, onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const selectedOption = options.find((option) => option.value === value) || null

  const customStyles: StylesConfig<SelectOption, false> = {
    valueContainer: (baseStyles) => ({
      ...baseStyles,
      padding: 0,
    }),

    control: (baseStyles, state) => ({
      ...baseStyles,
      minHeight: '48px',
      padding: '0 20px',
      cursor: 'pointer',
      border: state.menuIsOpen ? '1px solid #E4E8DF' : '1px solid #69735D',
      borderRadius: '11px',
      boxShadow: 'none',
      zIndex: 2,

      ':hover': {
        border: state.menuIsOpen ? '1px solid #E4E8DF' : '1px solid #69735D',
      },
    }),

    option: (baseStyles) => ({
      ...baseStyles,
      padding: '8px 20px',
      color: '#253017',
      backgroundColor: 'transparent',
      cursor: 'pointer',

      ':hover': {
        backgroundColor: 'transparent',
      },

      ':active': {
        backgroundColor: 'transparent',
      },
    }),

    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: '#69735D',
    }),

    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: '#253017',
    }),

    menu: (baseStyles) => ({
      ...baseStyles,
      marginTop: '-4px',
      paddingTop: '8px',
      paddingBottom: '4px',
      border: '1px solid #69735D',
      borderTop: 'none',
      borderRadius: '0 0 11px 11px',
      boxShadow: 'none',
    }),
  }

  const DropdownIndicator = () => (
    <img src={chevronDown} alt="" className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`} />
  )

  return (
    <div className={styles.select}>
      <span className={styles.label}>{labelName}</span>

      <div className={`${styles.selectWrapper} ${isOpen ? styles.open : ''}`}>
        <ReactSelect<SelectOption, false>
          options={options}
          value={selectedOption}
          placeholder={placeholder}
          onChange={(option) => onChange(option ? option.value : '')}
          isSearchable={false}
          styles={customStyles}
          onMenuOpen={() => setIsOpen(true)}
          onMenuClose={() => setIsOpen(false)}
          components={{
            DropdownIndicator,
            IndicatorSeparator: () => null,
          }}
        />
      </div>
    </div>
  )
}
