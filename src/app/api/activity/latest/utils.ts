type NewsData = {
  id?: number;
  imageSrc: string;
  newsTitle: string;
  newsContent: string;
  created_at?: string;
  link_url?: string;
  index: number;
};
export async function fetchLatestNews() {
  const res = await fetch('/api/activity/latest', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch latest news');
  }
  const news:NewsData[]=await res.json();
  return news;
}
