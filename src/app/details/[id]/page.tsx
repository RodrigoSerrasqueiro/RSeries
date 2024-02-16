'use client';

import { Button } from '@/components/ui/button';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { StarIcon } from '@heroicons/react/24/solid';
import SeasonCard from '@/components/seasonCard';

interface Details {
  poster_path: string;
  name: string;
  vote_average: number;
  overview: string;
}

interface Season {
  id: string;
  name: string;
  poster_path: string;
  episode_count: number;
  overview: string;
}

function Details() {
  const router = useRouter();
  const [details, setDetails] = useState<Details>({
    poster_path: '',
    vote_average: 0,
    overview: '',
    name: ''
  });
  const [seasons, setSeasons] = useState<Season[]>([]);
  const params = useParams();
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const apiurl = `https://api.themoviedb.org/3/tv/${params.id}?api_key=${apiKey}&language=pt-BR`;
  const poster404 =
    'https://hisend.s3.sa-east-1.amazonaws.com/images/not-found-poster.jpg';
  const imageUrl = 'https://image.tmdb.org/t/p/w500/';
  const seasonPoster = `https://image.tmdb.org/t/p/w200/`;

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function load() {
    try {
      const resposta = await axios.get(apiurl);
      setDetails(resposta.data);
      setSeasons(resposta.data.seasons);
    } catch (error) {
      console.log('Erro ao obter detalhes da série', error);
    }
  }
  return (
    <div className="flex flex-col items-center w-full max-w-screen-2xl pt-3 pb-8 px-12 gap-6">
      <div className="w-full flex justify-center items-center h-9">
        <Button
          className="bg-white text-black hover:bg-white hover:opacity-95"
          onClick={() => router.back()}
        >
          <ArrowUturnLeftIcon className="w-4 h-4 mr-2" />
          <span>Voltar</span>
        </Button>
      </div>

      <div className="flex sm:flex-row flex-col sm:w-[650px] w-full items-center sm:items-start bg-secondary-blue rounded-2xl shadow-3xl">
        <img
          src={
            details.poster_path
              ? `${imageUrl}${details.poster_path}`
              : poster404
          }
          alt="poster da série"
          className="sm:w-[250px] w-full h-[500px] rounded-lg"
        />
        <div className="flex flex-col items-center h-[500px] sm:w-[400px] w-[300px]">
          <h1 className="text-3xl font-bold text-center">{details.name}</h1>
          <div className="flex items-center justify-center gap-x-3 w-full h-[30px]">
            <StarIcon color="#F5C53B" className="w-6 h-6" />
            {details.vote_average.toFixed(1)}
          </div>
          <div className="w-full max-w-full h-full max-h-[370px] overflow-auto px:1 sm:px-4 mt-3">
            <p className="text-justify">{details.overview}</p>
          </div>
        </div>
      </div>

      <div className="w-[650px] flex flex-col items-center">
        <h2 className="font-bold tracking-[.2rem] text-xl">Temporadas</h2>
        {seasons &&
          seasons.length > 1 &&
          seasons.map((season) => (
            <SeasonCard
              key={season.id}
              name={season.name}
              episode={season.episode_count}
              poster={
                season.poster_path
                  ? `${seasonPoster}${season.poster_path}`
                  : poster404
              }
              overview={season.overview}
            />
          ))}
      </div>
    </div>
  );
}

export default Details;
