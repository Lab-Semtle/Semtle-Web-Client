export type TimelineSize = 'sm' | 'md' | 'lg';
export type TimelineColor =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'accent'
  | 'destructive';

export interface TimelineElement {
  id: number;
  date: string;
  title: string;
  summary?: string;
  description?: string;
  imageUrl?: string;
}

export interface TimelineProps {
  items: TimelineElement[];
  size?: TimelineSize;
  animate?: boolean;
  iconColor?: TimelineColor;
  connectorColor?: TimelineColor;
  className?: string;
}
