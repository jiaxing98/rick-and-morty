import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  headers: {
    Accept: 'application/json, text/plain, /',
  },
})

export class NotFoundError extends Error {}
