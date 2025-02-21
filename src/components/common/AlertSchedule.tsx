import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';

type AlertScheduleProps = {
  selectedEvent: {
    title: string;
    start: string;
    end: string;
    location: string;
    description: string;
  };
  onClose: () => void;
};

const formatTime = (time: string) => {
  const date = new Date(time);
  return new Intl.DateTimeFormat('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true, // 12시간제 (오전/오후)
  }).format(date);
};

const AlertSchedule: React.FC<AlertScheduleProps> = ({
  selectedEvent,
  onClose,
}) => {
  const formattedStartTime = formatTime(selectedEvent.start); // 시간 포맷 변환
  const formattedEndTime = formatTime(selectedEvent.end); // 시간 포맷 변환
  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{selectedEvent.title}</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-3">
            <Label>
              시간: {formattedStartTime} ~ {formattedEndTime}
            </Label>
            <Label>장소: {selectedEvent.location}</Label>
            <Label>일정 내용: {selectedEvent.description}</Label>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>닫기</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertSchedule;
