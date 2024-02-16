'use client';

import { HeartIcon } from '@heroicons/react/24/solid';
import { StarIcon } from '@heroicons/react/24/solid';
import { PlayCircleIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

interface Props {
  title: string;
  voteAverage: string;
  release: string;
  poster: string;
  id: number;
}

function Card({ title, voteAverage, release, poster, id }: Props) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const router = useRouter();
  return (
    <div className="bg-secondary-blue w-[250px] h-[600px] rounded-lg flex flex-col justify-between relative">
      <HeartIcon
        className="absolute left-2 top-2 w-6 h-6 hover:scale-[1.3] cursor-pointer transition duration-300"
        strokeWidth={2}
        onClick={() => setIsFavorite(!isFavorite)}
        color={isFavorite ? 'red' : 'white'}
      />

      <img
        src={poster}
        alt="poster da série"
        className="w-full h-[350px] rounded-t-lg"
      />

      <div className="h-[250px] w-full p-2 flex flex-col relative">
        <div className="flex items-center gap-x-3 w-full mb-4">
          <StarIcon color="#F5C53B" className="w-6 h-6" />
          <span>{voteAverage}</span>
        </div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <h2 className="text-sm">{release}</h2>
        <div className="absolute bottom-2">
          <Button
            className="bg-primary-blue no-underline rounded-lg flex justify-center items-center cursor-pointer p-2 w-[235px] hover:bg-primary-blue hover:opacity-90"
            onClick={() => router.push(`/details/${id}`)}
          >
            <PlayCircleIcon color="white" className="mr-2 w-6 h-6" />
            <span>Detalhes</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Card;
