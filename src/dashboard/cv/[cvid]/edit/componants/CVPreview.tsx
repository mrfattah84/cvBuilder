import { CVInfoContext } from '@/context/CVInfoContext'
import React, { useContext } from 'react'

function CVPreview() {
  const {CVInfo, setCVInfo} = useContext(CVInfoContext)
  return (
    <div>CVPreview</div>
  )
}

export default CVPreview 