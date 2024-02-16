'use client';

import Link from 'next/link';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/contexts';

export default function Header() {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();
  const { setPageParam } = useAppContext();

  const handleSearchParam = () => {
    router.replace(`/search?search=${inputValue}`);
    setPageParam('');
  };

  const handlePageParam = () => {
    setPageParam('top_rated');
  };

  return (
    <header className="w-full h-20 bg-secondary-blue flex justify-center px-1 sm:px-10">
      <div className="w-full h-full max-w-screen-xl flex items-center justify-around">
        <Link
          href={'/'}
          className="text-2xl font-bold no-underline cursor-pointer"
          onClick={handlePageParam}
        >
          RSéries
        </Link>
        <div
          id="searchbar"
          className="sm:w-[400px] w-[250px] h-8 bg-white rounded-lg flex items-center justify-between p-1"
        >
          <input
            type="text"
            className="w-11/12 outline-none text-black"
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearchParam();
              }
            }}
          />
          <button onClick={handleSearchParam}>
            <MagnifyingGlassIcon className="text-black w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
