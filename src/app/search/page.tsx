'use client';

import Card from '@/components/card';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { useAppContext } from '@/contexts';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

interface Serie {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  chave: number;
}

export default function Home() {
  const [series, setSeries] = useState<Serie[]>([]);
  const [pages, setPages] = useState<number[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const { pageParam, currentPage, setCurrentPage } = useAppContext();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=pt-BR&query=${search}&page=${currentPage}`;
  const posterBaseUrl = 'https://image.tmdb.org/t/p/w200/';

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParam, currentPage]);

  async function load() {
    try {
      const response = await axios.get(url);
      if (response.data.results.length < 1) {
        setNotFound(true);
        return;
      }
      setSeries(response.data.results);
      const totalPages = Array.from(
        { length: response.data.total_pages },
        (_, index) => index + 1
      );
      setPages(totalPages);
      setNotFound(false);
    } catch (error) {
      console.log('Erro ao carregar informações', error);
      setNotFound(true);
    }
  }

  function handleNextPage() {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const getDate = (date: string) => {
    try {
      const formattedDate = format(new Date(date), 'dd/MM/yyyy');
      return formattedDate;
    } catch {
      return 'Data de lançamento não informada';
    }
  };

  return (
    <Suspense>
      <main className="flex flex-wrap justify-center w-full max-w-screen-2xl pt-3 pb-8 px-12 gap-6">
        {series &&
          series.length > 0 &&
          series.map((serie) => {
            return (
              <Card
                title={serie.name}
                voteAverage={serie.vote_average
                  .toLocaleString('pt-BR', {
                    maximumFractionDigits: 1,
                    minimumFractionDigits: 1
                  })
                  .replace(',', '.')}
                release={getDate(serie.first_air_date)}
                poster={
                  serie.poster_path
                    ? `${posterBaseUrl}${serie.poster_path}`
                    : 'https://hisend.s3.sa-east-1.amazonaws.com/images/not-found-poster.jpg'
                }
                id={serie.id}
                key={serie.id}
              />
            );
          })}
        {notFound ? (
          <h1>Não encontramos resultados para a sua pesquisa.</h1>
        ) : (
          <Pagination>
            <PaginationContent>
              <PaginationItem className="cursor-pointer">
                <PaginationPrevious onClick={handlePrevPage} />
              </PaginationItem>

              <PaginationItem className="cursor-pointer">
                <PaginationNext onClick={handleNextPage} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </main>
    </Suspense>
  );
}
