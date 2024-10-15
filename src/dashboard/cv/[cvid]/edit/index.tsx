import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from './componants/FormSection';
import CVPreview from './componants/CVPreview';
import { CVInfoContext } from '@/context/CVInfoContext';
import dummy from '@/data/dummy';

function EditCV() {
  const params = useParams();
  const [CVInfo, setCVInfo] = useState({});

  useEffect(() => {
    setCVInfo(dummy)
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
      <CVInfoContext.Provider value={{CVInfo, setCVInfo}}>
        <FormSection />
        <CVPreview />
      </CVInfoContext.Provider>
    </div>
  );
}

export default EditCV;
