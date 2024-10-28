import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Palette } from 'lucide-react';
import React, { useState } from 'react';
import PersonalDetails from './forms/PersonalDetails';
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(0);
  const [enableNext, setEnableNext] = useState(false);
  return (
    <div>
      <div className="flex justify-between">
        <Button variant={'outline'}>
          <Palette /> Theme
        </Button>
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
        <Summery enabledNext={(v) => setEnableNext(v)} />
      ) : null}
    </div>
  );
}

export default FormSection;
