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
  const { CVInfo, setCVInfo } = useContext<any>(CVInfoContext);
  const [AILoading, setAILoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    CVInfo && setEducationList(CVInfo?.education || [formField()]);
  }, []);

  const generateAISummery = async (index, event) => {
    setAILoading(true);
    const prompt = `Please write a compelling summary of my education, showcasing skills and knowledge relevant to a career in the ${
      CVInfo?.jobTitle
    } field. 

    Here is my education:
    ${JSON.stringify(educationList[index])}

    Please make the summary concise and impactful, highlighting skills and knowledge most relevant to this industry.
    
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
      <h2 className="text-2xl font-bold">Education</h2>
      <h2 className="text-lg mb-4">now add your education</h2>
      <form onSubmit={onSubmit}>
        {educationList?.map((education, index) => (
          <div
            className="grid grid-cols-2 gap-4 shadow-md rounded-md p-4 mb-4 border relative"
            key={education?.id}
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
                defaultValue={education?.degree}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div>
              <label className="text-sm">major</label>
              <Input
                name="major"
                required
                defaultValue={education?.major}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm">school</label>
              <Input
                name="school"
                required
                defaultValue={education?.school}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div>
              <label className="text-sm">Start Date</label>
              <Input
                type="date"
                name="startYear"
                required
                defaultValue={education?.startYear}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div>
              <label className="text-sm">End Date</label>
              <Input
                type="date"
                name="endYear"
                required
                defaultValue={education?.endYear}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
            <div className="col-span-2">
              <label className="text-sm flex justify-between items-start m-4">
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
                defaultValue={education?.description}
                onChange={(event) => handleChange(index, event)}
              />
            </div>
          </div>
        ))}
        <div className="mt-5 flex justify-end gap-2">
          <Button
            type="button"
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
