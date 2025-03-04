/** 배너 타입 정의 */
export interface Banner {
  bannerId: number;
  imagePath: string;
  targetPath: string;
  altText?: string;
  postTitle: string;
  createdAt: string;
  imageUrl?: string | null;
}
