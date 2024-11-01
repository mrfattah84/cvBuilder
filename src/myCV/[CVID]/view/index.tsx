import Header from '@/components/ui/custom/Header';
import { CVInfoContext } from '@/context/CVInfoContext';
import React, { useEffect, useState } from 'react';
import GlobalApi from './../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import CVPreview from '@/dashboard/cv/[cvid]/edit/componants/CVPreview';
import { Button } from '@/components/ui/button';

function ViewCV() {
  const [CVInfo, setCVInfo] = useState();
  const { CVID } = useParams();

  useEffect(() => {
    GetCVInfo();
  }, []);

  const GetCVInfo = () => {
    GlobalApi.GetCV(CVID).then((res) => {
      setCVInfo(res.data.data);
      console.log(CVInfo);
    });
  };

  const HandleDownload = () => {
    window.print();
  }

  return (
    <div id='cv-view'>
      <CVInfoContext.Provider value={{ CVInfo, setCVInfo }}>
        <Header />
        <div className="flex flex-col items-center justify-center">
          <h1>Here is your CV!</h1>
          <div className="flex w-full px-6 py-2 justify-between">
            <Button onClick={HandleDownload}>Download</Button>
            <Button>Share</Button>
          </div>
        </div>
        <CVPreview />
      </CVInfoContext.Provider>
    </div>
  );
}

export default ViewCV;
