'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

const NavLink = ({ href, children }: { href: string; children?: ReactNode }) => {
  const pathName= usePathname();
  const isActive= href===pathName
  return (
    <Link href={href} className={`${isActive ? 'text-[#da9e38]' : ""}`}>
      {children}
      
    </Link>
  );
};

export default NavLink;