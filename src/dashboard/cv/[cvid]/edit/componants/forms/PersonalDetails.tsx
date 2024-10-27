import React, { useContext, useEffect, useState } from 'react';
import { CVInfoContext } from '@/context/CVInfoContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../../../service/GlobalApi';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

function PersonalDetails({ enabledNext }) {
  const { CVInfo, setCVInfo } = useContext(CVInfoContext);
  const params = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    enabledNext(false);
    const { name, value } = e.target;
    setCVInfo({ ...CVInfo, [name]: value });
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: formData,
    };
    GlobalApi.UpdateCVDetail(params.cvid, data).then(
      (response) => {
        console.log(response);
        enabledNext(true);
        setLoading(false);
        toast('Personal details updated successfully');
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div className="border-t-4 border-primary rounded-md shadow-lg p-4 mt-5">
      <h2 className="text-2xl font-bold">Personal Details</h2>
      <h2 className="text-lg mb-4">
        Lets get started with your personal details
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">First Name</label>
            <Input
              name="firstName"
              required
              onChange={handleInputChange}
              defaultValue={CVInfo?.firstName}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input
              name="lastName"
              required
              onChange={handleInputChange}
              defaultValue={CVInfo?.lastName}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">JobTitle</label>
            <Input
              name="jobTitle"
              required
              onChange={handleInputChange}
              defaultValue={CVInfo?.jobTitle}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input
              name="address"
              required
              onChange={handleInputChange}
              defaultValue={CVInfo?.address}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input
              name="phone"
              required
              onChange={handleInputChange}
              defaultValue={CVInfo?.phone}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input
              name="email"
              required
              onChange={handleInputChange}
              defaultValue={CVInfo?.email}
            />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
