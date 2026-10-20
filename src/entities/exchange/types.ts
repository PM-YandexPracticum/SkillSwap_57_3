export type ExchangeItem = {
  initiator_id: number
  receiver_id: number
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED'
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
  data: ExchangeItem[] | []
  loading: boolean
  error: string | null
}
