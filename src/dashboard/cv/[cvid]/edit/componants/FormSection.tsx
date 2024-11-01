import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Palette } from 'lucide-react';
import React, { useContext, useState } from 'react';
import PersonalDetails from './forms/PersonalDetails';
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skill from './forms/Skill';
import { Navigate, useParams } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { HexColorPicker } from 'react-colorful';
import { CVInfoContext } from '@/context/CVInfoContext';
import GlobalApi from './../../../../../../service/GlobalApi';
import { toast } from 'sonner';

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(0);
  const [enableNext, setEnableNext] = useState(false);
  const params = useParams();
  const [color, setColor] = useState('#000');
  const { CVInfo, setCVInfo } = useContext(CVInfoContext);

  const handleColorChange = (color) => {
    setColor(color);
    setCVInfo({ ...CVInfo, themeColor: color });
  };

  return (
    <div>
      <div className="flex justify-between">
        <Popover
          onOpenChange={() => {
            const data = {
              data: { themeColor: color },
            };
            GlobalApi.UpdateCVDetail(params.cvid, data).then(() => {
              toast('Theme color updated successfully');
            });
          }}
        >
          <PopoverTrigger>
            <div className="flex gap-2">
              <Palette /> Theme
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <HexColorPicker color={color} onChange={handleColorChange} />
          </PopoverContent>
        </Popover>
        <div className="flex gap-2">
          {activeFormIndex > 0 && (
            <Button onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
              <ArrowLeft />
              previous
            </Button>
          )}
          <Button
            disabled={!enableNext}
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>
      {activeFormIndex == 0 ? (
        <PersonalDetails enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 1 ? (
        <Experience enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 2 ? (
        <Education enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 3 ? (
        <Skill enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 4 ? (
        <Summery enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex == 5 ? (
        <Navigate to={`/myCV/${params.cvid}/view`} />
      ) : null}
    </div>
  );
}

export default FormSection;
