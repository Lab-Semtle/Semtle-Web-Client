import { readFileSync } from 'fs';
import { join } from 'path';
import PrivacyModal from '@/components/PrivacyModal';

export default function PrivacyPage() {
  const filePath = join(process.cwd(), 'public/docs/privacy.md');
  const content = readFileSync(filePath, 'utf-8');

  return <PrivacyModal content={content} />;
}
