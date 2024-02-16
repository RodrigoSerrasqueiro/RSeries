interface SeasonProps {
  episode: number;
  name: string;
  overview: string;
  poster: string;
}

function SeasonCard({ episode, name, overview, poster }: SeasonProps) {
  return (
    <div className="bg-secondary-blue sm:w-[650px] w-[300px] sm:h-[200px] h-[650px] rounded-2xl shadow-3xl mb-[40px] flex sm:flex-row flex-col sm:items-start items-center">
      <img
        src={poster}
        alt="poster temporada"
        className="sm:h-[200px] h-[280px] sm:w-[130px] w-full sm:rounded-l-2xl rounded-t-2xl"
      />
      <div className="flex flex-col items-center sm:items-start sm:w-[520px] w-[300px] sm:px-[30px] px-2 gap-3">
        <h3 className="text-base sm:text-left text-center font-bold">{name}</h3>
        <span className="font-bold text-left">{`${episode} ${episode > 1 ? 'episódios' : 'episódios'}`}</span>
        <div className="sm:h-[100px] h-[300px] overflow-y-auto text-justify px-1">
          <p className="text-left">
            {overview ? overview : 'Descrição não informada'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SeasonCard;
