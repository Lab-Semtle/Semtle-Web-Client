import { Button } from '@/components/ui/button';
import Link from 'next/link';

type ButtonLinkProps = {
  buttonName: string;
  link: string;
};

const ButtonLink: React.FC<ButtonLinkProps> = ({ buttonName, link }) => {
  return (
    <Link href={link}>
      <Button className="mr-4 h-[30px] w-[170px]">{buttonName}</Button>{' '}
    </Link>
  );
};

export default ButtonLink;
