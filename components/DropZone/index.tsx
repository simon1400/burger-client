import type { FC } from 'react'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { DropzoneS } from './styled'

const DropZone: FC<{
  handleChange: (file: File, key: string) => void
  idKey: string
  state: any
}> = ({ handleChange, idKey, state }) => {
  const [fileName, setFileName] = useState('')

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      // Do something with the files
      handleChange(acceptedFiles[0], idKey)
      setFileName(acceptedFiles[0].name)
    },
    [state],
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <DropzoneS>
      <label>{idKey}</label>
      <div className={'zone'} {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>{'nahrát soubor tady ...'}</p>
        ) : fileName.length ? (
          <p>{fileName}</p>
        ) : (
          <p>{'nahrát soubor'}</p>
        )}
      </div>
      <span className={'helper-text'}>{'.jpg .jpeg .png .gif max 5MB'}</span>
    </DropzoneS>
  )
}

export default DropZone
