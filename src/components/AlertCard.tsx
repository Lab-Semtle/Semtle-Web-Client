'use client';
import React from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
type AlertCardProps = {
  TriggerText: string;
  TitleText: string;
  DescriptionText: string;
  ActionText: string;
};
const AlertCard: React.FC<AlertCardProps> = ({
  TriggerText,
  TitleText,
  DescriptionText,
  ActionText,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <p className="cursor-pointer">{TriggerText}</p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{TitleText}</AlertDialogTitle>
          <AlertDialogDescription>{DescriptionText}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>{ActionText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertCard;
