import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle'
import { faEye } from '@fortawesome/free-solid-svg-icons/faEye'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash'
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { css } from 'emotion'
import React from 'react'
import { useDispatch } from 'react-redux'

import { logos } from '../../../config/logos'
import { useSelector } from '../../store'
import { clickedEyeButton, clickedTile } from '../../store/actions'
import { ExtendedApp } from '../../store/selector-hooks'
import Kbd from '../atoms/kbd'

interface Props {
  app: ExtendedApp
  isFav?: boolean
  className?: string
}

const Tile: React.FC<Props> = ({ app, isFav, className }) => {
  const dispatch = useDispatch()
  const url = useSelector((state) => state.ui.url)
  const theme = useSelector((state) => state.theme)
  const editMode = useSelector((state) => state.ui.editMode)

  return (
    <button
      key={app.id}
      aria-label={`${app.name} Tile`}
      className={clsx(
        'relative',
        'w-28 p-8',
        'flex flex-col items-center justify-center max-h-full',
        'focus:outline-none',
        !editMode && 'hover:bg-black hover:bg-opacity-10',
        className,
      )}
      data-for={app.id}
      data-tip
      disabled={editMode}
      onClick={(event) =>
        !editMode &&
        dispatch(
          clickedTile({
            url,
            appId: app.id,
            isAlt: event.altKey,
            isShift: event.shiftKey,
          }),
        )
      }
      title={app.name}
      type="button"
    >
      <img
        alt={app.name}
        className={clsx('w-full object-contain', editMode && 'animate-pulse')}
        src={logos[app.id]}
      />
      <Kbd className="flex-shrink-0 flex justify-center items-center mt-2">
        {isFav && (
          <FontAwesomeIcon
            aria-label="Favourite"
            className={css({ color: theme.accent })}
            icon={faStar}
            role="img"
          />
        )}
        {app.hotkey ? (
          <span className="ml-2">{app.hotkey}</span>
        ) : (
          // Prevents box collapse when hotkey not set
          <span className="opacity-0 w-0">.</span>
        )}
      </Kbd>
      {editMode && (
        <button
          className="absolute top-3 right-3 fa-layers fa-fw fa-2x focus:outline-none"
          onClick={() => dispatch(clickedEyeButton(app.id))}
          type="button"
        >
          <FontAwesomeIcon
            className={clsx('opacity-75', css({ filter: 'invert(1)' }))}
            icon={faCircle}
          />
          <FontAwesomeIcon
            className={clsx(!app.isVisible && 'opacity-50')}
            icon={app.isVisible ? faEye : faEyeSlash}
            transform="shrink-8"
          />
        </button>
      )}
    </button>
  )
}

export default Tile
