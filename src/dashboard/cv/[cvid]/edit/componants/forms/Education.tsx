import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CircleX, LoaderCircle, PlusCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import GlobalApi from './../../../../../../../service/GlobalApi';
import { CVInfoContext } from '@/context/CVInfoContext';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const formField = () => ({
  id: crypto.randomUUID(),
  degree: '',
  major: '',
  school: '',
  description: '',
  startYear: '',
  endYear: '',
});

function Education({ enabledNext }) {
  const [educationList, setEducationList] = useState([formField()]);
  const [loading, setLoading] = useState(false);
  const { CVInfo, setCVInfo } = useContext(CVInfoContext);
  const params = useParams();

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newEducationList = [...educationList];
    newEducationList[index][name] = value;
    setEducationList(newEducationList);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: { education: educationList },
    };

    GlobalApi.UpdateCVDetail(params.cvid, data).then(
      (response) => {
        enabledNext(true);
        setLoading(false);
        toast('Educations updated successfully');
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const addEducation = () => {
    setEducationList([...educationList, formField()]);
  };

  const deleteEducation = (index) => {
    let newEducationList = [...educationList];
    newEducationList.splice(index, 1);
    setEducationList(newEducationList);
  };

  useEffect(() => {
    setCVInfo({ ...CVInfo, education: educationList });
  }, [educationList]);

  return (
    <div className="border-t-4 border-primary rounded-md shadow-lg p-4 mt-5">
      <h2 className="text-2xl font-bold">Professional education</h2>
      <h2 className="text-lg mb-4">now add your professional education</h2>
      <form onSubmit={onSubmit}>
        {educationList.map((education, index) => (
          <div
            className="grid grid-cols-2 gap-4 shadow-md rounded-md p-4 mb-4 border relative"
            key={education.id}
          >
            <CircleX
              className="text-red-500 absolute top-1 right-1 cursor-pointer"
              onClick={() => deleteEducation(index)}
            />

            <div>
              <label className="text-sm">degree</label>
              <Input
                name="degree"
                required
                defaultValue={CVInfo.education[index]?.degree}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div>
              <label className="text-sm">major</label>
              <Input
                name="major"
                required
                defaultValue={CVInfo.education[index]?.major}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm">school</label>
              <Input
                name="school"
                required
                defaultValue={CVInfo.education[index]?.school}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div>
              <label className="text-sm">Start Date</label>
              <Input
                type="date"
                name="startYear"
                required
                defaultValue={CVInfo.education[index]?.startYear}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div>
              <label className="text-sm">End Date</label>
              <Input
                type="date"
                name="endYear"
                required
                defaultValue={CVInfo.education[index]?.endYear}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm">Summery</label>
              <Textarea
                name="description"
                required
                defaultValue={CVInfo.education[index]?.description}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
          </div>
        ))}
        <div className="mt-5 flex justify-end gap-2">
          <Button
            className="border-primary text-primary"
            disabled={loading}
            variant={'outline'}
            onClick={addEducation}
          >
            <PlusCircle className="mr-2" /> Add More
          </Button>
          <Button disabled={loading} type="submit">
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Education;
