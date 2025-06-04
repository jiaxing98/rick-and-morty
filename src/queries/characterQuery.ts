import { api } from '@/api/axios'
import type { CharacterDto } from '@/dtos/characterDto'
import type { PaginationDto } from '@/dtos/paginationDto'
import type { Character } from '@/models/character'
import { queryOptions } from '@tanstack/react-query'
import { useCallback } from 'react'

//#region API calls
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
    queryKey: ['characters', page],
    queryFn: () => getAllCharacters(),
    select: useCallback((data: PaginationDto<CharacterDto>) => data.result.map((x) => transformCharacterDto(x)), []),
  })

export const characterQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['characters', id],
    queryFn: () => getCharacter(id),
    select: useCallback((data: CharacterDto) => transformCharacterDto(data), []),
  })

export const multipleCharactersQueryOptions = (ids: string[]) =>
  queryOptions({
    queryKey: ['characters', ids],
    queryFn: () => getMultipleCharacters(ids),
    select: useCallback((data: CharacterDto[]) => data.map((x) => transformCharacterDto(x)), []),
  })
//#endregion
