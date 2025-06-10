import clsx from 'clsx'
import React, { useRef } from 'react'
import clamp from 'lodash/clamp'

interface Props {
  tiltDirection?: number
  maxRotationAngleDeg?: number
  scale?: number
  className?: string
  children: React.ReactNode
}

/**
 * Apply 3D tilt effect on mouse hover based on cursor position.
 * Parent must have `perspective` property.
 *
 * ```ts
 * interface Props {
 *   tiltDirection?: number;
 *   maxRotationAngleDeg?: number;
 *   scale?: number;
 *   className?: string;
 *   children: React.ReactNode;
 * }
 * ```
 *
 * - `tiltDirection`: Pivot direction for tilt, range from 0 to 1 (0 = left/top, 1 = right/bottom, 0.5 = center).
 * - `maxRotationAngleDeg`: Maximum rotation angle in degrees applied on tilt.
 * - `scale`: The scale of the card. Default is 1.
 *
 * On mouse movement, the component calculates cursor position relative to the element's
 * bounding box, and applies a perspective tilt effect using CSS custom properties.
 * Tailwind CSS is used with arbitrary `transform` utilities to apply dynamic styles.
 **/
export const TileCard = ({ tiltDirection = 0.5, maxRotationAngleDeg = 2, scale = 1, className, children }: Props) => {
  const boundingRef = useRef<DOMRect | null>(null)

  return (
    <div
      onMouseEnter={(e) => (boundingRef.current = e.currentTarget.getBoundingClientRect())}
      onMouseLeave={() => (boundingRef.current = null)}
      onMouseMove={(e) => {
        if (!boundingRef.current) return

        const x = e.clientX - boundingRef.current.left
        const y = e.clientY - boundingRef.current.top
        const xPercentage = x / boundingRef.current.width
        const yPercentage = y / boundingRef.current.height
        const xRotation = (xPercentage - clamp(tiltDirection, 0, 1)) * maxRotationAngleDeg
        const yRotation = (clamp(tiltDirection, 0, 1) - yPercentage) * maxRotationAngleDeg

        e.currentTarget.style.setProperty('--x-rotation', `${yRotation}deg`)
        e.currentTarget.style.setProperty('--y-rotation', `${xRotation}deg`)
        e.currentTarget.style.setProperty('--scale', `${scale}`)
      }}
      className={clsx(
        `transition-transform ease-out hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(var(--scale))]`,
        className
      )}
    >
      {children}
    </div>
  )
}
