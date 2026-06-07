export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
}

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}
