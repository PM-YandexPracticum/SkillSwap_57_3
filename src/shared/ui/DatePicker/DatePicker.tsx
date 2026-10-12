import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { ru } from "date-fns/locale";
import { Buttons } from "../Buttons/Buttons";
import calendarIcon from "@assets/ButtonSvg/calendar.svg";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./DatePicker.module.css";
import "./DatePicker.css";
import { DatePickerProps } from './types'

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const minYear = 1900;
const currentYear = new Date().getFullYear();

const years = Array.from(
  { length: currentYear - minYear + 1 },
  (_, index) => currentYear - index
);

export const DatePicker = ({ /*value,*/ onChange }: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [tempDate, setTempDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  const parseInputDate = (value: string) => {
    const parts = value.split(".");

    if (parts.length !== 3) {
      return null;
    }

    const [dayString, monthString, yearString] = parts;

    if (
      dayString.length !== 2 ||
      monthString.length !== 2 ||
      yearString.length !== 4
    ) {
      return null;
    }

    const day = Number(dayString);
    const month = Number(monthString);
    const year = Number(yearString);

    if (year < minYear || year > currentYear) {
      return null;
    }

    const date = new Date(year, month - 1, day);

    const isValidDate =
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day;

    return isValidDate ? date : null;
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value.replace(/\D/g, "");

    value = value.slice(0, 8);

    let day = value.slice(0, 2);
    let month = value.slice(2, 4);
    let year = value.slice(4, 8);

    if (day.length === 2) {
      const dayNumber = Number(day);

      if (dayNumber < 1) {
        day = "01";
      }

      if (dayNumber > 31) {
        day = "31";
      }
    }

    if (month.length === 2) {
      const monthNumber = Number(month);

      if (monthNumber < 1) {
        month = "01";
      }

      if (monthNumber > 12) {
        month = "12";
      }
    }

    if (year.length === 4) {
      const yearNumber = Number(year);

      if (yearNumber < minYear) {
        year = String(minYear);
      }

      if (yearNumber > currentYear) {
        year = String(currentYear);
      }
    }

    let formattedValue = day;

    if (value.length >= 2) {
      formattedValue += ".";
    }

    if (value.length > 2) {
      formattedValue += month;
    }

    if (value.length >= 4) {
      formattedValue += ".";
    }

    if (value.length > 4) {
      formattedValue += year;
    }

    setInputValue(formattedValue);
    setError("")

    if (formattedValue.length === 10) {
      const parsedDate = parseInputDate(formattedValue);

      if (parsedDate) {
        setSelectedDate(parsedDate);
        setTempDate(parsedDate);
        onChange(parsedDate)
      } else {
        onChange(null);
      }
    } else {
      onChange(null);
    }

  };

  const validateDate = () => {
      if(!inputValue){
        setError("это поле обязательное");
        return;
      }

      setError("")
    }

  const handleOpen = () => {
    const parsedDate = parseInputDate(inputValue);

    if (parsedDate) {
      setTempDate(parsedDate);
    } else if (selectedDate) {
      setTempDate(selectedDate);
    } else {
      setTempDate(new Date());
    }

    setIsOpen(true);
  };

  const handleCancel = () => {
    setTempDate(selectedDate);
    setIsOpen(false);
  };

  const handleSelect = () => {
    if (!tempDate) {
      return;
    }

    setSelectedDate(tempDate);
    onChange(tempDate);
    setInputValue(tempDate.toLocaleDateString("ru-RU"));
    setError("")
    setIsOpen(false);
  };

  return (
    <div className={styles.datePicker}>
      <div className={styles.inputWrapper}>
        <input
          className={`${styles.input} ${
        error ? styles.inputError : ""
        }`}
          type="text"
          placeholder="дд.мм.гггг"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={validateDate}
          maxLength={10}
        />

        <button
          type="button"
          className={styles.calendarButton}
          onClick={handleOpen}
          aria-label="Открыть календарь"
        >
          <img
            className={styles.calendarIcon}
            src={calendarIcon}
            alt=""
          />
        </button>
      </div>
      {error &&(
        <span className={styles.error}>
          {error}
        </span>
      )}

      {isOpen && (
        <div className={styles.calendarPopup}>
          <ReactDatePicker
            inline
            calendarClassName="customCalendar"
            selected={tempDate}
            onChange={(newDate: Date | null) =>
              setTempDate(newDate)
            }
            locale={ru}
            minDate={new Date(minYear, 0, 1)}
            maxDate={new Date()}
            renderCustomHeader={({
              date,
              changeMonth,
              changeYear,
            }) => (
              <div className={styles.calendarHeader}>
                <div className={styles.selectWrapper}>
                  <select
                    className={styles.calendarSelect}
                    value={date.getMonth()}
                    onChange={(event) =>
                      changeMonth(Number(event.target.value))
                    }
                  >
                    {months.map((month, index) => (
                      <option key={month} value={index}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.selectWrapper}>
                  <select
                    className={styles.calendarSelect}
                    value={date.getFullYear()}
                    onChange={(event) =>
                      changeYear(Number(event.target.value))
                    }
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          />

          <div className={styles.calendarButtons}>
            <Buttons
              text="Отменить"
              onClick={handleCancel}
              variant="whiteButton"
              size="small"
            />

            <Buttons
              text="Выбрать"
              onClick={handleSelect}
              variant="greenButton"
              size="small"
            />
          </div>
        </div>
      )}
    </div>
  );
};
