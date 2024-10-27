import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CircleX, LoaderCircle, PlusCircle } from 'lucide-react';
import React, { useContext, useState } from 'react';

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
  console.log(experienceList);

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    experienceList[index] = { ...experienceList[index], [name]: value };
    setExperienceList([...experienceList]);
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

  return (
    <div className="border-t-4 border-primary rounded-md shadow-lg p-4 mt-5">
      <h2 className="text-2xl font-bold">Professional Experience</h2>
      <h2 className="text-lg mb-4">now add your professional experience</h2>
      <div>
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
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div>
              <label className="text-sm">Company Name</label>
              <Input
                name="company"
                required
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm">Adress</label>
              <Input
                name="location"
                required
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div>
              <label className="text-sm">Start Date</label>
              <Input
                type="date"
                name="startYear"
                required
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div>
              <label className="text-sm">End Date</label>
              <Input
                type="date"
                name="endYear"
                required
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm">Summery</label>
              <Textarea
                name="description"
                required
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
          <Button disabled={loading}>
            {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
