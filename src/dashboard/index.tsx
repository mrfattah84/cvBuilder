import React, { useEffect, useState } from 'react';
import AddCv from './components/AddCv';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from './../../service/GlobalApi';
import CVCard from './components/CVCard';

function Dashboard() {
  const { user } = useUser();
  const [cvList, setCvList] = useState([]);

  const GetCVList = () => {
    GlobalApi.GetUserCV(user?.primaryEmailAddress?.emailAddress).then((res) => {
      user && setCvList(res.data.data);
    });
  };

  useEffect(GetCVList, [user]);

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">DashBoard</h2>
      <p>Start Creating AI CV for your next job</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
        <AddCv />
        {cvList.map(function (cv) {
          return <CVCard cv={cv} key={cv.cvid} reloadData={GetCVList} />;
        })}
      </div>
    </div>
  );
}

export default Dashboard;
