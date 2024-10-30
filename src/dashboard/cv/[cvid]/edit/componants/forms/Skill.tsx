import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CircleX, LoaderCircle, PlusCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import GlobalApi from '../../../../../../../service/GlobalApi';
import { CVInfoContext } from '@/context/CVInfoContext';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Rating } from '@smastrom/react-rating';

import '@smastrom/react-rating/style.css';

const formField = () => ({
  id: crypto.randomUUID(),
  name: '',
  level: 0,
});

function Skill({ enabledNext }) {
  const [skillList, setSkillList] = useState([formField()]);
  const [loading, setLoading] = useState(false);
  const { CVInfo, setCVInfo } = useContext(CVInfoContext);
  const params = useParams();

  const handleChange = (index, name, value) => {
    const newSkillList = [...skillList];
    newSkillList[index][name] = value;
    setSkillList(newSkillList);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: { skills: skillList },
    };

    GlobalApi.UpdateCVDetail(params.cvid, data).then(
      (response) => {
        enabledNext(true);
        setLoading(false);
        toast('Skills updated successfully');
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const addSkill = () => {
    setSkillList([...skillList, formField()]);
  };

  const deleteSkill = (index) => {
    let newSkillList = [...skillList];
    newSkillList.splice(index, 1);
    setSkillList(newSkillList);
  };

  useEffect(() => {
    setCVInfo({ ...CVInfo, skills: skillList });
  }, [skillList]);

  return (
    <div className="border-t-4 border-primary rounded-md shadow-lg p-4 mt-5">
      <h2 className="text-2xl font-bold">Professional skill</h2>
      <h2 className="text-lg mb-4">now add your professional skill</h2>
      <form onSubmit={onSubmit}>
        {skillList.map((skill, index) => (
          <div
            className="grid grid-cols-2 gap-4 shadow-md rounded-md p-4 mb-4 border relative"
            key={skill.id}
          >
            <CircleX
              className="text-red-500 absolute top-1 right-1 cursor-pointer"
              onClick={() => deleteSkill(index)}
            />

            <div>
              <label className="text-sm">Skill</label>
              <Input
                name="name"
                required
                defaultValue={CVInfo.skills[index]?.name}
                onChange={(event) =>
                  handleChange(index, 'name', event.target.value)
                }
              />
            </div>
            <div className="flex flex-col	">
              <label className="text-sm">level</label>
              <Rating
                value={CVInfo.skills[index]?.level / 20}
                onChange={(v) => handleChange(index, 'level', v * 20)}
              />
            </div>
          </div>
        ))}
        <div className="mt-5 flex justify-end gap-2">
          <Button
            className="border-primary text-primary"
            disabled={loading}
            variant={'outline'}
            onClick={addSkill}
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

export default Skill;
