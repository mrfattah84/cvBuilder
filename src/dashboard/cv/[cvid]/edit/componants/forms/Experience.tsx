import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Brain, CircleX, LoaderCircle, PlusCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import GlobalApi from './../../../../../../../service/GlobalApi';
import { CVInfoContext } from '@/context/CVInfoContext';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { AISession } from './../../../../../../../service/AIModel';
import { comma } from 'postcss/lib/list';
import { json } from 'stream/consumers';

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
  const { CVInfo, setCVInfo } = useContext<any>(CVInfoContext);
  const [AILoading, setAILoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    CVInfo && setExperienceList(CVInfo?.experience || [formField()]);
  }, []);

  const generateAISummery = async (index, event) => {
    setAILoading(true);
    const prompt = `Please write a concise and impactful summary of my work experience

    Here is my experience:
    ${JSON.stringify(experienceList[index])}

    I am looking for a position in the ${CVInfo?.jobTitle} field.

    Please make sure the summary is engaging and compelling, emphasizing my contributions and impact. 

    ideally within 100 words.
    
    give me the result in raw text without any unnecessary text or formatting.`;
    const res = await AISession.sendMessage(prompt);
    event.target.parentNode.parentNode.querySelector('textarea').value =
      res.response.text();
    setAILoading(false);
  };

  const handleChange = (index, event) => {
    enabledNext(false);
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
                defaultValue={experience?.title}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div>
              <label className="text-sm">Company Name</label>
              <Input
                name="company"
                required
                defaultValue={experience?.company}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm">Adress</label>
              <Input
                name="location"
                required
                defaultValue={experience?.location}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div>
              <label className="text-sm">Start Date</label>
              <Input
                type="date"
                name="startYear"
                required
                defaultValue={experience?.startYear}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div>
              <label className="text-sm">End Date</label>
              <Input
                type="date"
                name="endYear"
                required
                defaultValue={experience?.endYear}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm flex justify-between items-start m-4 ">
                Summery
                <Button
                  variant={'outline'}
                  className="text-primary border-primary gap-1 p-1"
                  onClick={(event) => generateAISummery(index, event)}
                >
                  <Brain />
                  {AILoading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    'Generate With AI'
                  )}
                </Button>
              </label>
              <Textarea
                className="h-60"
                name="description"
                required
                defaultValue={experience?.description}
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
