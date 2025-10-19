import { Box, Typography, IconButton } from '@mui/material';
import { East } from '@mui/icons-material';
import styled from '@emotion/styled';
import { useState } from 'react';

interface FilmCardProps {
  title: string;
  backgroundColor: string;
  onClick: () => void;
  onHover?: () => void;
  onHoverEnd?: () => void;
}

const CardContainer = styled(Box)<{
  backgroundColor: string;
  rotateX: number;
  rotateY: number;
  isHovered: boolean;
}>`
  background-color: ${(props) => props.backgroundColor};
  border-radius: 20px;
  border: 4px solid white;
  padding: 2rem;
  min-height: 300px;
  width: 100%;
  aspect-ratio: 3/4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease-out;
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateX(${(props) => props.rotateX}deg)
    rotateY(${(props) => props.rotateY}deg)
    translateY(${(props) => (props.isHovered ? '-8px' : '0px')});
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  position: relative;
`;

const CardTitle = styled(Typography)`
  color: white;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.4;
  text-align: center;
`;

const ArrowButton = styled(IconButton)`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background-color: transparent;
  color: white;
  width: 56px;
  height: 56px;
  border: 2px solid white;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const FilmCard = ({
  title,
  backgroundColor,
  onClick,
  onHover,
  onHoverEnd,
}: FilmCardProps) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (centerY - e.clientY) / (rect.height / 2);

    setRotateY(deltaX * 5); // Max 5 degrees tilt
    setRotateX(deltaY * 5);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
    if (onHoverEnd) {
      onHoverEnd();
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHover) {
      onHover();
    }
  };

  return (
    <CardContainer
      backgroundColor={backgroundColor}
      rotateX={rotateX}
      rotateY={rotateY}
      isHovered={isHovered}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <CardTitle variant="h6">{title}</CardTitle>
      <ArrowButton size="small">
        <East />
      </ArrowButton>
    </CardContainer>
  );
};

export default FilmCard;
