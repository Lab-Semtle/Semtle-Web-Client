import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <div className="logo">로고</div>
        <ul className="flex space-x-4">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/activity">Activity</Link></li>
          <li><Link href="/archive">Archive</Link></li>
          <li><Link href="/join">Join</Link></li>
          <li><Link href="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
