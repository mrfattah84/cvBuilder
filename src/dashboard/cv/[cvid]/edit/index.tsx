import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EditCV() {
  const params = useParams();

  useEffect(() => {
    console.log(params.cvid);
   }, []);
  return <div>EditCV</div>;
}

export default EditCV;
