import axios from "axios";

export function handleAxiosError(e: unknown, defaultMessage = 'Произошла непредвиденная ошибка'): string {
  if (axios.isCancel(e)) {
    return 'canceled'
  }

  if (axios.isAxiosError(e)) {
    return e.response?.data?.message || `Ошибка сервера (HTTP ${e.response?.status || 'сеть'})`
  }

  if (e instanceof Error) {
    return e.message
  }

  return defaultMessage
}