import { api } from '@/api/axios'
import type { LocationDto } from '@/dtos/locationDto'
import type { PaginationDto } from '@/dtos/paginationDto'
import type { Location } from '@/models/location'
import { queryOptions } from '@tanstack/react-query'
import { useCallback } from 'react'

//#region API calls
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
    queryKey: ['espisodes', page],
    queryFn: () => getAllLocations(),
    select: useCallback((data: PaginationDto<LocationDto>) => data.result.map((x) => transformLocationDto(x)), []),
  })

export const locationQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['espisode', id],
    queryFn: () => getLocation(id),
    select: useCallback((data: LocationDto) => transformLocationDto(data), []),
  })

export const multipleLocationsQueryOptions = (ids: string[]) =>
  queryOptions({
    queryKey: ['espisodes', ids],
    queryFn: () => getMultipleLocations(ids),
    select: useCallback((data: LocationDto[]) => data.map((x) => transformLocationDto(x)), []),
  })
//#endregion
