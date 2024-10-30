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
  title: '',
  company: '',
  location: ' ',
  startYear: '',
  endYear: '',
  description: '',
});

function Experience({ enabledNext }) {
  const [experienceList, setExperienceList] = useState([formField()]);
  const [loading, setLoading] = useState(false);
  const { CVInfo, setCVInfo } = useContext(CVInfoContext);
  const params = useParams();

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newExperienceList = [...experienceList];
    newExperienceList[index][name] = value;
    setExperienceList(newExperienceList);
  }; 

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: { experience: experienceList },
    };

    GlobalApi.UpdateCVDetail(params.cvid, data).then(
      (response) => {
        enabledNext(true);
        setLoading(false);
        toast('Experiences updated successfully');
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const addExperience = () => {
    setExperienceList([...experienceList, formField()]);
  };

  const deleteExperience = (index, e) => {
    console.log(index);
    let newExperienceList = [...experienceList];
    newExperienceList.splice(index, 1);
    setExperienceList(newExperienceList);
  };

  useEffect(() => {
    setCVInfo({ ...CVInfo, experience: experienceList });
  }, [experienceList]);
  return (
    <div className="border-t-4 border-primary rounded-md shadow-lg p-4 mt-5">
      <h2 className="text-2xl font-bold">Professional Experience</h2>
      <h2 className="text-lg mb-4">now add your professional experience</h2>
      <form onSubmit={onSubmit}>
        {experienceList.map((experience, index) => (
          <div
            className="grid grid-cols-2 gap-4 shadow-md rounded-md p-4 mb-4 border relative"
            key={experience.id}
          >
            <CircleX
              className="text-red-500 absolute top-1 right-1 cursor-pointer"
              onClick={(e) => deleteExperience(index, e)}
            />

            <div>
              <label className="text-sm">Position Title</label>
              <Input
                name="title"
                required
                defaultValue={CVInfo.experience[index]?.title}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div>
              <label className="text-sm">Company Name</label>
              <Input
                name="company"
                required
                defaultValue={CVInfo.experience[index]?.company}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm">Adress</label>
              <Input
                name="location"
                required
                defaultValue={CVInfo.experience[index]?.location}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div>
              <label className="text-sm">Start Date</label>
              <Input
                type="date"
                name="startYear"
                required
                defaultValue={CVInfo.experience[index]?.startYear}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div>
              <label className="text-sm">End Date</label>
              <Input
                type="date"
                name="endYear"
                required
                defaultValue={CVInfo.experience[index]?.endYear}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm">Summery</label>
              <Textarea
                name="description"
                required
                defaultValue={CVInfo.experience[index]?.description}
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
            onClick={addExperience}
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

export default Experience;
