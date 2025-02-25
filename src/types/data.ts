export interface User {
  uuid: string;
  studentId: string;
  name: string;
  birth: string;
  phone: string;
  email: string;
  profileImageUrl?: string;
  role: string;
  manageApprovalStatus: string;
  createdAt: string;
}
