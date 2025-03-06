import { useState, useEffect } from 'react';
import { API_ROUTES } from '@/constants/ApiRoutes';
import { useSession } from 'next-auth/react';

/** 유저 목록 데이터 타입 */
export type UserListResponse = {
  success: boolean;
  message: string;
  data: {
    totalMembers: number;
    currentPage: number;
    totalPages: number;
    members: string[]; // UUID 리스트
  };
  error: null | string;
};

/** UUID 기반 개별 회원 정보 타입 */
export type UserDetail = {
  uuid: string;
  email: string;
  studentId: string | null;
  username: string;
  birth: string; // ISO 8601 형식
  phone: string; // 010-1234-5678
  role: 'ADMIN' | 'USER';
  manageApprovalStatus: boolean;
  password?: string;
  profileUrl?: string;
};

/** 회원 목록을 가져오는 커스텀 훅 */
export function useFetchMembers(
  page: number,
  size: number,
  searchName?: string,
) {
  const { data: session } = useSession();
  const accessToken = session?.accessToken as string | undefined;

  const [members, setMembers] = useState<UserDetail[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 데이터를 새로 불러오는 refetch 함수 추가
  const fetchMembers = async () => {
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('page :', page);
      console.log('size :', size);
      console.log('searchName :', searchName);
      const url = API_ROUTES.GET_MEMBER_LIST(page, size, searchName);
      const response = await fetch(url, {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        throw new Error(
          `회원 목록을 불러오는 데 실패했습니다. (HTTP ${response.status})`,
        );
      }

      const userList: UserListResponse = await response.json();
      console.log(userList);
      console.log(userList.data);

      // Step 2: 개별 회원 정보 조회 (UUID 기반)
      const memberDetails = await Promise.all(
        userList.data.members.map(async (uuid) => {
          const detailUrl = API_ROUTES.GET_MEMBER_DETAIL(uuid);
          const detailResponse = await fetch(detailUrl, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          if (!detailResponse.ok) {
            throw new Error(
              `회원 상세 정보를 불러오는 데 실패했습니다. (UUID: ${uuid})`,
            );
          }

          const detailData = await detailResponse.json();
          return detailData.data as UserDetail;
        }),
      );

      setMembers(memberDetails);
      setTotalPages(userList.data.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류 발생');
    } finally {
      setIsLoading(false);
    }
  };

  // `useEffect`에서 `fetchMembers` 실행
  useEffect(() => {
    fetchMembers();
  }, [accessToken, page, size, searchName]);

  return { members, totalPages, isLoading, error, refetch: fetchMembers };
}
