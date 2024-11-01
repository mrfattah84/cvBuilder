import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Loader, Loader2, MoreVertical, Notebook } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GlobalApi from './../../../service/GlobalApi';
import { toast } from 'sonner';

function CVCard({ cv, reloadData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteCV(cv.documentId).then(() => {
      toast('CV deleted successfully');
      setLoading(false);
      setOpenAlert(false);
      reloadData();
    });
  };

  return (
    <div className="flex flex-col items-center border border-black rounded-lg shadow-md">
      <Link to={'/dashboard/cv/' + cv.documentId + '/edit'}>
        <Notebook className="h-[280px]" />
      </Link>
      <div className="flex w-full">
        <h2 className="text-center m-auto">{cv.title}</h2>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() =>
                navigation('/dashboard/cv/' + cv.documentId + '/edit')
              }
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigation('/myCV/' + cv.documentId + '/view')}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigation('/myCV/' + cv.documentId + '/view')}
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete
                {cv?.title} cv and remove its data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>
                {loading ? <Loader2 className="animate-spin" /> : 'Continue'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default CVCard;
