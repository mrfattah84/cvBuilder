import { Ghost, Loader2, PlusSquare } from 'lucide-react';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from './../../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import { NavLink, useNavigate, useNavigation } from 'react-router-dom';

function AddCv() {
  const [openDialog, setopenDialog] = useState(false);
  const [cvTitle, setcvTitle] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const onCreate = async () => {
    setLoading(true);
    const uuid = uuidv4();
    const data = {
      data: {
        title: cvTitle,
        cvid: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    };
    GlobalApi.CreateNewCV(data)
      .then((response: any) => {
        console.log(response);
        if (response.status === 201) {
          setopenDialog(false);
          setcvTitle('');
          setLoading(false);
          navigation('/dashboard/cv/' + uuid + '/edit');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div
        className="p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
        onClick={() => setopenDialog(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New CV</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new CV</p>
              <Input
                className="my-2 "
                placeholder="Example CV"
                onChange={(e) => setcvTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button
                variant="ghost"
                onClick={() => {
                  setopenDialog(false);
                  setcvTitle('');
                }}
              >
                Cancel
              </Button>
              <Button onClick={onCreate} disabled={!cvTitle || loading}>
                {loading ? (
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                ) : (
                  'Create'
                )}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddCv;
