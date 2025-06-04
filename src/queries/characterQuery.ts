import { api } from '@/api/axios'
import type { CharacterDto } from '@/dtos/characterDto'
import type { PaginationDto } from '@/dtos/paginationDto'
import type { Character } from '@/models/character'
import { queryOptions } from '@tanstack/react-query'

//#region API calls
interface QueryParams {
  name?: string
  status?: 'alive' | 'dead' | 'unknown'
  species?: string
  type?: string
  gender?: 'female' | 'male' | 'genderless' | 'unknown'
}

const getAllCharacters = async (page?: number): Promise<PaginationDto<CharacterDto>> => {
  return await api
    .get<PaginationDto<CharacterDto>>(`/character/`, {
      params: {
        page: page,
      },
    })
    .then((r) => r.data)
}

const getCharacter = async (id: string): Promise<CharacterDto> => {
  return await api.get<CharacterDto>(`/character/${id}`).then((r) => r.data)
}

const getMultipleCharacters = async (ids: string[]): Promise<CharacterDto[]> => {
  return await api.get<CharacterDto[]>(`/character/${ids.join(',')}`).then((r) => r.data)
}

const getFilteredCharacters = async (params: QueryParams): Promise<PaginationDto<CharacterDto>> => {
  return await api
    .get<PaginationDto<CharacterDto>>(`/character/`, {
      params: {
        name: params.name,
        status: params.status,
        species: params.species,
        type: params.type,
        gender: params.gender,
      },
    })
    .then((r) => r.data)
}
//#endregion

//#region QueryOptions
const transformCharacterDto = (data: CharacterDto): Character => {
  return {
    id: data.id,
    name: data.name,
    status: data.status,
    species: data.species,
    type: data.type,
    gender: data.gender,
    origin: data.origin,
    location: data.location,
    image: data.image,
    episode: data.episode,
    url: data.url,
    created: data.created,
  }
}

export const allCharactersQueryOptions = (page?: number) =>
  queryOptions({
    queryKey: ['characters', page ?? 1],
    queryFn: () => getAllCharacters(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    // * uses a stable function reference if transformation is expensive
    select: (data: PaginationDto<CharacterDto>) => data.results.map((x) => transformCharacterDto(x)),
  })

export const characterQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['character', id],
    queryFn: () => getCharacter(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    // * uses a stable function reference if transformation is expensive
    select: (data: CharacterDto) => transformCharacterDto(data),
  })

export const multipleCharactersQueryOptions = (ids: string[]) =>
  queryOptions({
    queryKey: ['characters', ids],
    queryFn: () => getMultipleCharacters(ids),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    // * uses a stable function reference if transformation is expensive
    select: (data: CharacterDto[]) => data.map((x) => transformCharacterDto(x)),
  })

export const filteredCharactersQueryOptions = (params: QueryParams) =>
  queryOptions({
    queryKey: ['characters', params],
    queryFn: () => getFilteredCharacters(params),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    // * uses a stable function reference if transformation is expensive
    select: (data: PaginationDto<CharacterDto>) => data.results.map((x) => transformCharacterDto(x)),
  })
//#endregion
