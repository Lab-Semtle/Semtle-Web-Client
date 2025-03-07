import { readFileSync } from 'fs';
import { join } from 'path';
import TermsModal from '@/components/TermsModal';

export default function TermsPage() {
  const filePath = join(process.cwd(), 'public/docs/terms.md');
  const content = readFileSync(filePath, 'utf-8');

  return <TermsModal content={content} />;
}
