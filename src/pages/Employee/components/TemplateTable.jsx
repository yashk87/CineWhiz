import React from "react";

const handleClick = (title) => {
  console.log(`You clicked me! ${title}`);
};

export const columns = [
  {
    name: "Title",
    selector: "title",
    sortable: true,
  },
  {
    name: "Director",
    selector: "director",
    sortable: true,
    cell: (d) => (
      <a href="https://google.com" target="_blank" className="dlink">
        {d.director}
      </a>
    ),
  },
  {
    name: "Genres",
    selector: "genres",
    sortable: true,
    cell: (d) => <span>{d.genres.join(", ")}</span>,
  },
  {
    name: "Year",
    selector: "year",
    sortable: true,
  },
  {
    name: "Action",
    sortable: false,
    selector: "null",
    cell: (d) => [
      <i
        key={d.title}
        onClick={handleClick.bind(this, d.title)}
        className="first fas fa-pen"
      ></i>,
      <i
        onClick={handleClick.bind(this, d.title)}
        className="fas fa-trash-alt"
      ></i>,
    ],
  },
];

export const data = [
  {
    id: 136,
    title: "Shogun",
    year: "1980",
    runtime: "60",
    genres: ["Adventure", "Drama", "History"],
    director: "N/A",
    actors: "Richard Chamberlain, Toshirô Mifune, Yôko Shimada, Furankî Sakai",
    plot: "A English navigator becomes both a player and pawn in the complex political games in feudal Japan.",
    posterUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY1ODI4NzYxMl5BMl5BanBnXkFtZTcwNDA4MzUxMQ@@._V1_SX300.jpg",
  },
  {
    id: 137,
    title: "Spotlight",
    year: "2015",
    runtime: "128",
    genres: ["Biography", "Crime", "Drama"],
    director: "Tom McCarthy",
    actors: "Mark Ruffalo, Michael Keaton, Rachel McAdams, Liev Schreiber",
    plot: "The true story of how the Boston Globe uncovered the massive scandal of child molestation and cover-up within the local Catholic Archdiocese, shaking the entire Catholic Church to its core.",
    posterUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMjIyOTM5OTIzNV5BMl5BanBnXkFtZTgwMDkzODE2NjE@._V1_SX300.jpg",
  },
  {
    id: 138,
    title: "Vertigo",
    year: "1958",
    runtime: "128",
    genres: ["Mystery", "Romance", "Thriller"],
    director: "Alfred Hitchcock",
    actors: "James Stewart, Kim Novak, Barbara Bel Geddes, Tom Helmore",
    plot: "A San Francisco detective suffering from acrophobia investigates the strange activities of an old friend's wife, all the while becoming dangerously obsessed with her.",
    posterUrl:
      "http://ia.media-imdb.com/images/M/MV5BNzY0NzQyNzQzOF5BMl5BanBnXkFtZTcwMTgwNTk4OQ@@._V1_SX300.jpg",
  },
  {
    id: 139,
    title: "Whiplash",
    year: "2014",
    runtime: "107",
    genres: ["Drama", "Music"],
    director: "Damien Chazelle",
    actors: "Miles Teller, J.K. Simmons, Paul Reiser, Melissa Benoist",
    plot: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    posterUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTU4OTQ3MDUyMV5BMl5BanBnXkFtZTgwOTA2MjU0MjE@._V1_SX300.jpg",
  },
  {
    id: 140,
    title: "The Lives of Others",
    year: "2006",
    runtime: "137",
    genres: ["Drama", "Thriller"],
    director: "Florian Henckel von Donnersmarck",
    actors: "Martina Gedeck, Ulrich Mühe, Sebastian Koch, Ulrich Tukur",
    plot: "In 1984 East Berlin, an agent of the secret police, conducting surveillance on a writer and his lover, finds himself becoming increasingly absorbed by their lives.",
    posterUrl:
      "http://ia.media-imdb.com/images/M/MV5BNDUzNjYwNDYyNl5BMl5BanBnXkFtZTcwNjU3ODQ0MQ@@._V1_SX300.jpg",
  },
  {
    id: 141,
    title: "Hotel Rwanda",
    year: "2004",
    runtime: "121",
    genres: ["Drama", "History", "War"],
    director: "Terry George",
    actors: "Xolani Mali, Don Cheadle, Desmond Dube, Hakeem Kae-Kazim",
    plot: "Paul Rusesabagina was a hotel manager who housed over a thousand Tutsi refugees during their struggle against the Hutu militia in Rwanda.",
    posterUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTI2MzQyNTc1M15BMl5BanBnXkFtZTYwMjExNjc3._V1_SX300.jpg",
  },
  {
    id: 142,
    title: "The Martian",
    year: "2015",
    runtime: "144",
    genres: ["Adventure", "Drama", "Sci-Fi"],
    director: "Ridley Scott",
    actors: "Matt Damon, Jessica Chastain, Kristen Wiig, Jeff Daniels",
    plot: "An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.",
    posterUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMTc2MTQ3MDA1Nl5BMl5BanBnXkFtZTgwODA3OTI4NjE@._V1_SX300.jpg",
  },
  {
    id: 143,
    title: "To Kill a Mockingbird",
    year: "1962",
    runtime: "129",
    genres: ["Crime", "Drama"],
    director: "Robert Mulligan",
    actors: "Gregory Peck, John Megna, Frank Overton, Rosemary Murphy",
    plot: "Atticus Finch, a lawyer in the Depression-era South, defends a black man against an undeserved rape charge, and his kids against prejudice.",
    posterUrl:
      "http://ia.media-imdb.com/images/M/MV5BMjA4MzI1NDY2Nl5BMl5BanBnXkFtZTcwMTcyODc5Mw@@._V1_SX300.jpg",
  },
  {
    id: 144,
    title: "The Hateful Eight",
    year: "2015",
    runtime: "187",
    genres: ["Crime", "Drama", "Mystery"],
    director: "Quentin Tarantino",
    actors:
      "Samuel L. Jackson, Kurt Russell, Jennifer Jason Leigh, Walton Goggins",
    plot: "In the dead of a Wyoming winter, a bounty hunter and his prisoner find shelter in a cabin currently inhabited by a collection of nefarious characters.",
    posterUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA1MTc1NTg5NV5BMl5BanBnXkFtZTgwOTM2MDEzNzE@._V1_SX300.jpg",
  },
  {
    id: 145,
    title: "A Separation",
    year: "2011",
    runtime: "123",
    genres: ["Drama", "Mystery"],
    director: "Asghar Farhadi",
    actors: "Peyman Moaadi, Leila Hatami, Sareh Bayat, Shahab Hosseini",
    plot: "A married couple are faced with a difficult decision - to improve the life of their child by moving to another country or to stay in Iran and look after a deteriorating parent who has Alzheimer's disease.",
    posterUrl:
      "http://ia.media-imdb.com/images/M/MV5BMTYzMzU4NDUwOF5BMl5BanBnXkFtZTcwMTM5MjA5Ng@@._V1_SX300.jpg",
  },
  {
    id: 146,
    title: "The Big Short",
    year: "2015",
    runtime: "130",
    genres: ["Biography", "Comedy", "Drama"],
    director: "Adam McKay",
    actors: "Ryan Gosling, Rudy Eisenzopf, Casey Groves, Charlie Talbert",
    plot: "Four denizens in the world of high-finance predict the credit and housing bubble collapse of the mid-2000s, and decide to take on the big banks for their greed and lack of foresight.",
    posterUrl:
      "https://images-na.ssl-images-amazon.com/images/M/MV5BNDc4MThhN2EtZjMzNC00ZDJmLThiZTgtNThlY2UxZWMzNjdkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
  },
];
