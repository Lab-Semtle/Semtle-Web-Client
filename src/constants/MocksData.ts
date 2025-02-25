/** 유저 */
import { User } from '@/types/data';

export const MOCK_USERS = new Map<string, User>([
  [
    '8f2b7a1e-3a4d-4b6b-a9c7-1d5f6e7a8b9c', // 실제 UUID 형식 적용
    {
      uuid: '8f2b7a1e-3a4d-4b6b-a9c7-1d5f6e7a8b9c',
      studentId: '20241001',
      name: '김민수',
      birth: '1999-06-12',
      phone: '010-5678-1234',
      email: 'minsu.kim@example.com',
      profileImageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      role: 'USER',
      manageApprovalStatus: 'approved',
      createdAt: '2023-08-15T09:30:00Z',
    },
  ],
  [
    'd94f1a3b-0c5d-48f8-8fcb-4b92e7f8a0e2',
    {
      uuid: 'd94f1a3b-0c5d-48f8-8fcb-4b92e7f8a0e2',
      studentId: '20231102',
      name: '이서연',
      birth: '2001-02-25',
      phone: '010-2345-6789',
      email: 'seoyeon.lee@example.com',
      profileImageUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
      role: 'ADMIN',
      manageApprovalStatus: 'approved',
      createdAt: '2024-01-10T14:45:00Z',
    },
  ],
  [
    'c4d2a8f1-7e6b-48d1-a9f5-5b9c3e7a8d4f',
    {
      uuid: 'c4d2a8f1-7e6b-48d1-a9f5-5b9c3e7a8d4f',
      studentId: '20230123',
      name: '정혜린',
      birth: '2002-04-17',
      phone: '010-9876-5432',
      email: 'hyelin.jung@example.com',
      profileImageUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
      role: 'USER',
      manageApprovalStatus: 'pending',
      createdAt: '2023-04-30T11:10:00Z',
    },
  ],
]);
