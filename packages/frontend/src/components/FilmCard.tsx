import { Box, Typography, IconButton, CircularProgress } from '@mui/material';
import { East } from '@mui/icons-material';
import styled from '@emotion/styled';
import { useState, useRef, useEffect } from 'react';
import { flipCardStyles } from '~/styles/components/flip-card';

interface Film {
  id: string;
  title: string;
  image: string;
  movieBanner: string;
  description: string;
  director: string;
  releaseDate: string;
  runningTime: number;
  rtScore: number;
}

interface FilmCardProps {
  title: string;
  backgroundColor: string;
  loading: boolean;
  loaded: boolean;
  filmData?: Film;
  onClick: () => void;
  onHover?: () => void;
  onHoverEnd?: () => void;
}

const CardContainer = styled(Box, {
  shouldForwardProp: (prop) =>
    !['backgroundColor', 'isHovered', 'isFlipped', 'hasFilmData'].includes(
      prop as string,
    ),
})<{
  backgroundColor: string;
  isHovered: boolean;
  isFlipped: boolean;
  hasFilmData: boolean;
}>`
  background-color: ${(props) =>
    props.hasFilmData && props.isFlipped ? 'white' : props.backgroundColor};
  border-radius: 20px;
  border: 4px solid white;
  min-height: 350px;

  width: 100%;
  aspect-ratio: 3/4;
  cursor: pointer;
  transition:
    transform 0.6s cubic-bezier(0.4, 0, 0.2, 1),
    background-color 0.3s ease-in-out;
  transform-style: preserve-3d;
  transform: translateY(${(props) => (props.isHovered ? '-8px' : '0px')})
    ${(props) => (props.isFlipped ? 'rotateY(180deg)' : '')};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  ${flipCardStyles.container}
`;

const CardFace = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isFlipped',
})<{ isFlipped: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  ${flipCardStyles.front}
  opacity: ${(props) => (props.isFlipped ? 0 : 1)};
  transition: opacity 0.3s ease-in-out;
`;

const CardBack = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isFlipped',
})<{ isFlipped: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 0;
  ${flipCardStyles.back}
  opacity: ${(props) => (props.isFlipped ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const WhiteOverlay = styled(Box)`
  z-index: 1;
  background-color: white;
  width: 101%;
  height: 66.67%; /* Two thirds of the card height */
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 1.5rem;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
`;

const BackgroundImage = styled(Box, {
  shouldForwardProp: (prop) => !['imageUrl', 'loaded'].includes(prop as string),
})<{ imageUrl?: string; loaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: ${(props) =>
    props.imageUrl ? `url(${props.imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: opacity 0.5s ease-in-out;
  opacity: ${(props) => (props.loaded ? 1 : 0)};
`;

const CardTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'loaded',
})<{ loaded: boolean }>`
  color: white;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.4;
  text-align: center;
  transition: opacity 0.5s ease-in-out;
  opacity: ${(props) => (props.loaded ? 0 : 1)};
`;

const ArrowButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'loaded',
})<{ loaded: boolean }>`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background-color: transparent;
  color: white;
  width: 56px;
  height: 56px;
  border: 2px solid white;
  transition:
    background-color 0.2s ease-in-out,
    opacity 0.5s ease-in-out;
  opacity: ${(props) => (props.loaded ? 0 : 1)};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const BackDescription = styled(Typography)`
  color: #666;
  font-size: 0.85rem;
  line-height: 1.3;
  text-align: left;
  margin-bottom: 1rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  position: relative;
  min-height: 5.2em; /* 4 lines * 1.3 line-height */
`;

const BackDetails = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  justify-content: space-between;
`;

const DetailRow = styled(Box)`
  display: flex;
  justify-content: flex-start;
  gap: 0.25rem;
  align-items: center;
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
`;

const DetailLabel = styled(Typography)`
  font-weight: 300;
  font-style: italic;
  color: #555;
`;

const DetailValue = styled(Typography)`
  color: #333;
  font-weight: 700;
  font-style: italic;
  white-space: nowrap;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RottenTomatoesScore = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.5rem;
  color: #004915;
  font-weight: 600;
  font-size: 2.2rem;
  width: 100%;
`;

const FilmCard = ({
  title,
  backgroundColor,
  loading,
  loaded,
  filmData,
  onClick,
  onHover,
  onHoverEnd,
}: FilmCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const flipBackTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const FLIP_BACK_DELAY = 500; // 500ms delay before flipping back

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (flipBackTimeoutRef.current) {
        clearTimeout(flipBackTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Clear any pending flip back timeout
    if (flipBackTimeoutRef.current) {
      clearTimeout(flipBackTimeoutRef.current);
    }

    // Set timeout to flip back after delay
    if (loaded && filmData) {
      flipBackTimeoutRef.current = setTimeout(() => {
        setIsFlipped(false);
      }, FLIP_BACK_DELAY);
    }

    if (onHoverEnd) {
      onHoverEnd();
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Clear any pending flip back timeout
    if (flipBackTimeoutRef.current) {
      clearTimeout(flipBackTimeoutRef.current);
      flipBackTimeoutRef.current = null;
    }

    // Immediately flip on hover if data is loaded
    if (loaded && filmData) {
      setIsFlipped(true);
    }

    if (onHover) {
      onHover();
    }
  };

  const handleCardClick = () => {
    if (loaded && filmData) {
      setIsFlipped(!isFlipped);
    } else {
      onClick();
    }
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).getFullYear().toString();
  };

  return (
    <CardContainer
      backgroundColor={backgroundColor}
      isHovered={isHovered}
      isFlipped={isFlipped}
      hasFilmData={!!filmData}
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Front Face */}
      <CardFace isFlipped={isFlipped}>
        <BackgroundImage imageUrl={filmData?.image} loaded={loaded} />
        <CardTitle variant="h6" loaded={loaded}>
          {loaded && filmData ? filmData.title : title}
        </CardTitle>
        <ArrowButton size="small" loaded={loaded}>
          {loading ? (
            <CircularProgress size={24} sx={{ color: 'white' }} />
          ) : (
            <East />
          )}
        </ArrowButton>
      </CardFace>

      {/* Back Face */}
      {loaded && filmData && (
        <CardBack isFlipped={isFlipped}>
          <BackgroundImage imageUrl={filmData.image} loaded={true} />
          <WhiteOverlay>
            <BackDescription variant="body2">
              {filmData.description}
            </BackDescription>
            <BackDetails>
              <Box>
                <DetailRow>
                  <DetailLabel variant="body2">Runtime: </DetailLabel>
                  <DetailValue variant="body2">
                    {formatRuntime(filmData.runningTime)}
                  </DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel variant="body2">Director: </DetailLabel>
                  <DetailValue variant="body2">{filmData.director}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel variant="body2">Released: </DetailLabel>
                  <DetailValue variant="body2">
                    {formatDate(filmData.releaseDate)}
                  </DetailValue>
                </DetailRow>
              </Box>

              <RottenTomatoesScore>
                <img
                  src="https://www.clipartmax.com/png/small/146-1460784_certified-fresh-rotten-tomatoes-fresh-logo.png"
                  alt="Rotten Tomatoes"
                  style={{ height: '2.2rem', width: 'auto' }}
                />
                <span style={{ marginLeft: '0.25rem', marginTop: '0.25rem' }}>
                  {filmData.rtScore}%
                </span>
              </RottenTomatoesScore>
            </BackDetails>
          </WhiteOverlay>
        </CardBack>
      )}
    </CardContainer>
  );
};

export default FilmCard;
