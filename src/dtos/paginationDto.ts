export interface PaginationDto<T> {
  info: {
    count: number
    pages: number
    next?: string
    prev?: string
  }
  results: T[]
}
