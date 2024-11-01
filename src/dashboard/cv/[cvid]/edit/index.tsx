import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from './componants/FormSection';
import CVPreview from './componants/CVPreview';
import { CVInfoContext } from '@/context/CVInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';

function EditCV() {
  const [CVInfo, setCVInfo] = useState();
  const { cvid } = useParams();

  useEffect(() => {
    GetCVInfo();
  }, []);

  const GetCVInfo = () => {
    GlobalApi.GetCV(cvid).then((res) => {
      setCVInfo(res.data.data);
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
      <CVInfoContext.Provider value={{ CVInfo, setCVInfo }}>
        <FormSection />
        <CVPreview />
      </CVInfoContext.Provider>
    </div>
  );
}

export default EditCV;
