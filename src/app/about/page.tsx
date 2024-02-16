function About() {
  return (
    <main className="flex justify-center w-full max-w-screen-2xl pt-3 pb-8 sm:px-[200px] px-4 text-justify">
      Essa é uma aplicação React com Typescript que traz diversas informações
      sobre séries de TV. O nome RSéries remete à sigla do meu nome: Rodrigo
      Serrasqueiro - R.S. Para acessar essas informações utilizei a API do
      tmdb.org . Nesse projeto usei Next na versão 14 com app router, Tailwind
      css e a biblioteca Shadcn que são as mais novas tecnologias do front-end.
      Totalmente responsiva, com design moderno e interativo, essa aplicação
      ainda pode melhorar muito. A ideia é construir uma API própria para
      possibilitar cadastro de usuários e também possibilitar que usuários
      postem comentários nas séries.
    </main>
  );
}

export default About;
