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

export interface ProjectApplyRequest {
  answers: Array<{
    questionId: number;
    answer: string;
  }>;
  urls: string[];
  files: Array<{
    fileName: string;
    fileUrl: string;
  }>;
}

export interface ProjectApplyResponse {
  success: boolean;
  message: string;
  data: {
    message: string;
    appliedId: number;
    appliedAt: string;
  } | null;
  error: {
    code:
      | 'SUCCESS'
      | 'WRONG_PARAM'
      | 'DUPLICATE_APPLICATION'
      | 'RECRUTTING_ALREADY_ENDED';
  };
}
