import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CVInfoContext } from '@/context/CVInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { AISession } from './../../../../../../../service/AIModel';

function Summery({ enabledNext }) {
  const { CVInfo, setCVInfo } = useContext(CVInfoContext);
  const params = useParams();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const prompt = `user typed '${formData?.summery}' for ${CVInfo.jobTitle} cv summery please enhanse it between 4-5 lines `;

  const generateAISummery = async () => {
    setLoading(true);
    const res = await AISession.sendMessage(prompt);
    console.log(res.response.text());
    setLoading(false);
  };

  const handleInputChange = (e) => {
    enabledNext(false);
    const { name, value } = e.target;
    setCVInfo({ ...CVInfo, [name]: value });
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    setLoading(true);

    const data = {
      data: formData,
    };
    GlobalApi.UpdateCVDetail(params.cvid, data).then(
      (response) => {
        console.log(response);
        enabledNext(true);
        setLoading(false);
        toast('Summery updated successfully');
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  return (
    <div className="border-t-4 border-primary rounded-md shadow-lg p-4 mt-5">
      <h2 className="text-2xl font-bold">Summery</h2>
      <h2 className="text-lg mb-4">Add Summery for your CV here.</h2>
      <Textarea
        name="summery"
        onChange={handleInputChange}
        defaultValue={CVInfo?.summery}
      />
      <div className="flex items-center justify-end mt-5 gap-4">
        <Button
          variant={'outline'}
          className="text-primary border-primary"
          onClick={generateAISummery}
        >
          <Brain /> Generate With AI
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  );
}

export default Summery;