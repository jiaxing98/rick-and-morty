import { api } from '@/api/axios'
import type { LocationDto } from '@/dtos/locationDto'
import type { PaginationDto } from '@/dtos/paginationDto'
import type { Location } from '@/models/location'
import { queryOptions } from '@tanstack/react-query'
import { useCallback } from 'react'

//#region API calls
interface QueryParams {
  name?: string
  type?: string
  dimension?: string
}

const getAllLocations = async (page?: number): Promise<PaginationDto<LocationDto>> => {
  return await api
    .get<PaginationDto<LocationDto>>(`/location/`, {
      params: {
        page: page,
      },
    })
    .then((r) => r.data)
}

const getLocation = async (id: string): Promise<LocationDto> => {
  return await api.get<LocationDto>(`/location/${id}`).then((r) => r.data)
}

const getMultipleLocations = async (ids: string[]): Promise<LocationDto[]> => {
  return await api.get<LocationDto[]>(`/location/${ids.join(',')}`).then((r) => r.data)
}

const getFilteredLocations = async (params: QueryParams): Promise<PaginationDto<LocationDto>> => {
  return await api.get<PaginationDto<LocationDto>>(`/location/`, {
    params: {
      name: params.name,
      type: params.type,
      dimension: params.dimension,
    }
  }).then((r) => r.data)
}
//#endregion

//#region QueryOptions
const transformLocationDto = (data: LocationDto): Location => {
  return {
    id: data.id,
    name: data.name,
    type: data.type,
    dimesion: data.dimesion,
    residents: data.residents,
    url: data.url,
    created: data.created,
  }
}

export const allLocationsQueryOptions = (page?: number) =>
  queryOptions({
    queryKey: ['locations', page],
    queryFn: () => getAllLocations(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    select: useCallback((data: PaginationDto<LocationDto>) => data.result.map((x) => transformLocationDto(x)), []),
  })

export const locationQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['location', id],
    queryFn: () => getLocation(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    select: useCallback((data: LocationDto) => transformLocationDto(data), []),
  })

export const multipleLocationsQueryOptions = (ids: string[]) =>
  queryOptions({
    queryKey: ['locations', ids],
    queryFn: () => getMultipleLocations(ids),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    select: useCallback((data: LocationDto[]) => data.map((x) => transformLocationDto(x)), []),
  })

export const filteredLocationsQueryOptions = (params: QueryParams) =>
  queryOptions({
    queryKey: ['locations', params],
    queryFn: () => getFilteredLocations(params),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    select: useCallback((data: PaginationDto<LocationDto>) => data.result.map((x) => transformLocationDto(x)), []),
  })
//#endregion
