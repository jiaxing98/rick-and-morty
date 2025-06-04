import type { Character } from '@/models/character'
import { Link } from '@tanstack/react-router'
import clsx from 'clsx'

export const CharacterCard = ({ info }: { info: Character }) => {
  const { name, status, species, type, origin, location, image } = info

  return (
    <div className="flex flex-row max-w-[600px] h-[220px] m-4 rounded-2xl overflow-clip bg-[#2f3436]">
      <img className=" object-cover w-auto h-auto" src={image} alt={`${name}-image`} />

      <div className="flex flex-col flex-grow-3 gap-4 p-4">
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <div className="flex flex-row gap-2 items-center">
            <svg width="20" height="20">
              <circle
                cx="10"
                cy="10"
                r="5"
                fill={clsx({
                  '#22c55e': status === 'Alive',
                  '#ef4444': status === 'Dead',
                  '#9ca3af': status === 'unknown',
                })}
              />
            </svg>
            <p>
              {status} - {species} {type && `(${type})`}
            </p>
          </div>
        </div>
        <div>
          <h4 className="text-gray-400">Last known location:</h4>
          <Link
            to="/locations/$locationId"
            params={{
              locationId: `${location.url.split('/').pop()}`,
            }}
            className="block py-1 hover:text-[#ffa219]"
            activeProps={{ className: 'font-bold underline' }}
          >
            <p>{location.name}</p>
          </Link>
        </div>
        <div>
          <h4 className="text-gray-400">First seen in:</h4>
          <Link
            to="/locations/$locationId"
            params={{
              locationId: `${origin.url.split('/').pop()}`,
            }}
            className="block py-1 hover:text-[#ffa219]"
            activeProps={{ className: 'font-bold underline' }}
          >
            <p>{origin.name}</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
