import { Box, Typography, Grid } from '@mui/material';
import styled from '@emotion/styled';
import FilmCard from '~/components/FilmCard';

const SkyBackground = styled(Box)`
  background-image: url('/src/assets/blue_sky.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const HeaderContainer = styled(Box)`
  text-align: center;
  margin-bottom: 1rem;
`;

const MainHeader = styled(Typography)`
  color: #000000;
  font-weight: 700;
  margin-bottom: 0.2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SubHeader = styled(Typography)`
  color: #000000;
  font-weight: 400;
`;

const CardsContainer = styled(Box)`
  width: 100%;
  max-width: 1280px;
  margin-top: 2rem;
`;

const handleFilmClick = (filmTitle: string) => {
  // TODO: Implement film data fetching in subsequent sub-tasks
  // eslint-disable-next-line no-console
  console.log(`Clicked on ${filmTitle}`);
};

const handleFilmHover = (filmTitle: string) => {
  // TODO: Implement hover effects in subsequent sub-tasks
  // eslint-disable-next-line no-console
  console.log(`Hovered on ${filmTitle}`);
};

const handleFilmHoverEnd = (filmTitle: string) => {
  // TODO: Implement hover end effects in subsequent sub-tasks
  // eslint-disable-next-line no-console
  console.log(`Stopped hovering on ${filmTitle}`);
};

const Home = () => {
  const films = [
    {
      title: 'My Neighbor Totoro',
      backgroundColor: '#d79a68',
      id: '58611129-2dbc-4a81-a72f-77ddfc1b1b49',
    },
    {
      title: 'Spirited Away',
      backgroundColor: '#c24646',
      id: '2baf70d1-42bb-443b-b751-5a8c2b26813b',
    },
    {
      title: 'Princess Mononoke',
      backgroundColor: '#279094',
      id: '0440483e-ca0e-4120-8c50-4c8cd9b965d6',
    },
    {
      title: "Howl's Moving Castle",
      backgroundColor: '#3e6cac',
      id: '90b72513-afd4-4570-84de-a56c312fdf81',
    },
  ];

  return (
    <SkyBackground>
      <HeaderContainer>
        <MainHeader variant="h2">Discover Studio Ghibli Films</MainHeader>
        <SubHeader variant="h5">
          {`Select a film & hover to learn more`}
        </SubHeader>
      </HeaderContainer>

      <CardsContainer>
        <Grid container spacing={3} justifyContent="center">
          {films.map((film) => (
            <Grid item xs={12} sm={6} md={3} key={film.id}>
              <FilmCard
                title={film.title}
                backgroundColor={film.backgroundColor}
                onClick={() => handleFilmClick(film.title)}
                onHover={() => handleFilmHover(film.title)}
                onHoverEnd={() => handleFilmHoverEnd(film.title)}
              />
            </Grid>
          ))}
        </Grid>
      </CardsContainer>
    </SkyBackground>
  );
};

export default Home;
