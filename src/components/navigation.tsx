'use client';

import { useAppContext } from '@/contexts';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface MenuItens {
  title: string;
  href: string;
}

export default function Navigation() {
  const path = usePathname();
  const router = useRouter();
  const { pageParam, setPageParam, setCurrentPage } = useAppContext();
  const menuItens: Array<MenuItens> = [
    { title: 'Mais votadas', href: 'top_rated' },
    { title: 'Populares', href: 'popular' },
    { title: 'Lançamentos', href: 'on_the_air' }
  ];

  const handlePage = (param: string) => {
    setPageParam(param);
    router.push('/');
    setCurrentPage(1);
  };

  return (
    <div className="w-full min-h-[80px] gap-3 flex flex-wrap items-center justify-center cursor-pointer">
      {menuItens.map((menuItem, index: number) => (
        <span
          key={index}
          className={`${pageParam === menuItem.href ? 'opacity-100 border-b border-destak' : 'opacity-40'} no-underline font-bold text-2xl py-1 px-3`}
          onClick={() => handlePage(menuItem.href)}
        >
          {menuItem.title}
        </span>
      ))}

      <Link
        href={'/about'}
        className={`${path === '/about' ? 'opacity-100 border-b border-destak' : 'opacity-40'} no-underline font-bold text-2xl py-1 px-3`}
        onClick={() => setPageParam('about')}
      >
        <span>Sobre</span>
      </Link>
    </div>
  );
}
