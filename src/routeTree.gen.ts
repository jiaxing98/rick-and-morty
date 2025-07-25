/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as LocationsIndexImport } from './routes/locations/index'
import { Route as EpisodesIndexImport } from './routes/episodes/index'
import { Route as CharactersIndexImport } from './routes/characters/index'
import { Route as LocationsLocationIdImport } from './routes/locations/$locationId'
import { Route as EpisodesEpisodeIdImport } from './routes/episodes/$episodeId'
import { Route as CharactersCharacterIdImport } from './routes/characters/$characterId'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const LocationsIndexRoute = LocationsIndexImport.update({
  id: '/locations/',
  path: '/locations/',
  getParentRoute: () => rootRoute,
} as any)

const EpisodesIndexRoute = EpisodesIndexImport.update({
  id: '/episodes/',
  path: '/episodes/',
  getParentRoute: () => rootRoute,
} as any)

const CharactersIndexRoute = CharactersIndexImport.update({
  id: '/characters/',
  path: '/characters/',
  getParentRoute: () => rootRoute,
} as any)

const LocationsLocationIdRoute = LocationsLocationIdImport.update({
  id: '/locations/$locationId',
  path: '/locations/$locationId',
  getParentRoute: () => rootRoute,
} as any)

const EpisodesEpisodeIdRoute = EpisodesEpisodeIdImport.update({
  id: '/episodes/$episodeId',
  path: '/episodes/$episodeId',
  getParentRoute: () => rootRoute,
} as any)

const CharactersCharacterIdRoute = CharactersCharacterIdImport.update({
  id: '/characters/$characterId',
  path: '/characters/$characterId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/characters/$characterId': {
      id: '/characters/$characterId'
      path: '/characters/$characterId'
      fullPath: '/characters/$characterId'
      preLoaderRoute: typeof CharactersCharacterIdImport
      parentRoute: typeof rootRoute
    }
    '/episodes/$episodeId': {
      id: '/episodes/$episodeId'
      path: '/episodes/$episodeId'
      fullPath: '/episodes/$episodeId'
      preLoaderRoute: typeof EpisodesEpisodeIdImport
      parentRoute: typeof rootRoute
    }
    '/locations/$locationId': {
      id: '/locations/$locationId'
      path: '/locations/$locationId'
      fullPath: '/locations/$locationId'
      preLoaderRoute: typeof LocationsLocationIdImport
      parentRoute: typeof rootRoute
    }
    '/characters/': {
      id: '/characters/'
      path: '/characters'
      fullPath: '/characters'
      preLoaderRoute: typeof CharactersIndexImport
      parentRoute: typeof rootRoute
    }
    '/episodes/': {
      id: '/episodes/'
      path: '/episodes'
      fullPath: '/episodes'
      preLoaderRoute: typeof EpisodesIndexImport
      parentRoute: typeof rootRoute
    }
    '/locations/': {
      id: '/locations/'
      path: '/locations'
      fullPath: '/locations'
      preLoaderRoute: typeof LocationsIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/characters/$characterId': typeof CharactersCharacterIdRoute
  '/episodes/$episodeId': typeof EpisodesEpisodeIdRoute
  '/locations/$locationId': typeof LocationsLocationIdRoute
  '/characters': typeof CharactersIndexRoute
  '/episodes': typeof EpisodesIndexRoute
  '/locations': typeof LocationsIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/characters/$characterId': typeof CharactersCharacterIdRoute
  '/episodes/$episodeId': typeof EpisodesEpisodeIdRoute
  '/locations/$locationId': typeof LocationsLocationIdRoute
  '/characters': typeof CharactersIndexRoute
  '/episodes': typeof EpisodesIndexRoute
  '/locations': typeof LocationsIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/characters/$characterId': typeof CharactersCharacterIdRoute
  '/episodes/$episodeId': typeof EpisodesEpisodeIdRoute
  '/locations/$locationId': typeof LocationsLocationIdRoute
  '/characters/': typeof CharactersIndexRoute
  '/episodes/': typeof EpisodesIndexRoute
  '/locations/': typeof LocationsIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/characters/$characterId'
    | '/episodes/$episodeId'
    | '/locations/$locationId'
    | '/characters'
    | '/episodes'
    | '/locations'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/characters/$characterId'
    | '/episodes/$episodeId'
    | '/locations/$locationId'
    | '/characters'
    | '/episodes'
    | '/locations'
  id:
    | '__root__'
    | '/'
    | '/characters/$characterId'
    | '/episodes/$episodeId'
    | '/locations/$locationId'
    | '/characters/'
    | '/episodes/'
    | '/locations/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CharactersCharacterIdRoute: typeof CharactersCharacterIdRoute
  EpisodesEpisodeIdRoute: typeof EpisodesEpisodeIdRoute
  LocationsLocationIdRoute: typeof LocationsLocationIdRoute
  CharactersIndexRoute: typeof CharactersIndexRoute
  EpisodesIndexRoute: typeof EpisodesIndexRoute
  LocationsIndexRoute: typeof LocationsIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CharactersCharacterIdRoute: CharactersCharacterIdRoute,
  EpisodesEpisodeIdRoute: EpisodesEpisodeIdRoute,
  LocationsLocationIdRoute: LocationsLocationIdRoute,
  CharactersIndexRoute: CharactersIndexRoute,
  EpisodesIndexRoute: EpisodesIndexRoute,
  LocationsIndexRoute: LocationsIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/characters/$characterId",
        "/episodes/$episodeId",
        "/locations/$locationId",
        "/characters/",
        "/episodes/",
        "/locations/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/characters/$characterId": {
      "filePath": "characters/$characterId.tsx"
    },
    "/episodes/$episodeId": {
      "filePath": "episodes/$episodeId.tsx"
    },
    "/locations/$locationId": {
      "filePath": "locations/$locationId.tsx"
    },
    "/characters/": {
      "filePath": "characters/index.tsx"
    },
    "/episodes/": {
      "filePath": "episodes/index.tsx"
    },
    "/locations/": {
      "filePath": "locations/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
