import { Box, Typography, Grid } from '@mui/material';
import styled from '@emotion/styled';
import FilmCard from '~/components/FilmCard';
import { useFilmData } from '~/hooks/useFilmData';

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

const Home = () => {
  const { films, fetchFilm } = useFilmData();

  const handleFilmClick = (filmId: string) => {
    fetchFilm(filmId);
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
                loading={film.loading}
                loaded={film.loaded}
                filmData={
                  film.data
                    ? {
                        image: film.data.image,
                        title: film.data.title,
                      }
                    : undefined
                }
                onClick={() => handleFilmClick(film.id)}
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
