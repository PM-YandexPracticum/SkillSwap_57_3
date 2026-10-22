export type ExchangeItem = {
  id: number
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED'
  createdAt: Date
  initiator: {
    id: number
    name: string
  }
  receiver: {
    id: number
    name: string
  }
}

export type ExchangeSliceState = {
  data: {
    initiator_exchanges: ExchangeItem[]
    receiver_exchanges: ExchangeItem[]
  } | null
  loading: boolean
  error: string | null
}
