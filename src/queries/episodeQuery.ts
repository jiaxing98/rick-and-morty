import { api } from '@/api/axios'
import type { EpisodeDto } from '@/dtos/episodeDto'
import type { PaginationDto } from '@/dtos/paginationDto'
import type { Episode } from '@/models/episode'
import { queryOptions } from '@tanstack/react-query'

//#region API calls
interface QueryParams {
  name?: string
  episode?: string
}

const getAllEpisodes = async (page?: number): Promise<PaginationDto<EpisodeDto>> => {
  return await api
    .get<PaginationDto<EpisodeDto>>(`/episode/`, {
      params: {
        page: page,
      },
    })
    .then((r) => r.data)
}

const getEpisode = async (id: string): Promise<EpisodeDto> => {
  return await api.get<EpisodeDto>(`/episode/${id}`).then((r) => r.data)
}

const getMultipleEpisodes = async (ids: string[]): Promise<EpisodeDto[]> => {
  return await api.get<EpisodeDto[]>(`/episode/${ids.join(',')}`).then((r) => r.data)
}

const getFilteredEpisodes = async (params: QueryParams): Promise<PaginationDto<EpisodeDto>> => {
  return await api
    .get<PaginationDto<EpisodeDto>>(`/episode /`, {
      params: {
        name: params.name,
        episode: params.episode,
      },
    })
    .then((r) => r.data)
}
//#endregion

//#region QueryOptions
const transformEpisodeDto = (data: EpisodeDto): Episode => {
  return {
    id: data.id,
    name: data.name,
    air_date: data.air_date,
    episode: data.episode,
    characters: data.characters,
    url: data.url,
    created: data.created,
  }
}

export const allEpisodesQueryOptions = (page?: number) =>
  queryOptions({
    queryKey: ['espisodes', page],
    queryFn: () => getAllEpisodes(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    select: (data: PaginationDto<EpisodeDto>) => data.results.map((x) => transformEpisodeDto(x)),
  })

export const episodeQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['espisode', id],
    queryFn: () => getEpisode(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    select: (data: EpisodeDto) => transformEpisodeDto(data),
  })

export const multipleEpisodesQueryOptions = (ids: string[]) =>
  queryOptions({
    queryKey: ['espisodes', ids],
    queryFn: () => getMultipleEpisodes(ids),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    select: (data: EpisodeDto[]) => data.map((x) => transformEpisodeDto(x)),
  })

export const filteredEpisodesQueryOptions = (params: QueryParams) =>
  queryOptions({
    queryKey: ['espisodes', params],
    queryFn: () => getFilteredEpisodes(params),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    select: (data: PaginationDto<EpisodeDto>) => data.results.map((x) => transformEpisodeDto(x)),
  })
//#endregion
