export type ProjectPost = {
  title: string;
  content: string;
  writerName: string;
  contact?: string;
  projectTypeCategory: string;
  relationFieldCategory: string[];
  projectStartTime?: string;
  projectEndTime?: string;
  projectRecruitingEndTime?: string;
  projectStatus: string;
};
