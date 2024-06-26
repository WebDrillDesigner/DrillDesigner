import React from "react";
import { Button } from "antd";

interface PlayButtonComponentProps {
  toggleShowPlayingOnClick: () => void;
  showPlaying: boolean;
}

const PlayButtonComponent: React.FC<PlayButtonComponentProps> = ({
  toggleShowPlayingOnClick: playOrPauseShow,
  showPlaying: playing,
}) => {
  const buttonText = playing ? "Pause" : "Play";

  return (
    <div>
      <Button onClick={playOrPauseShow}>{buttonText}</Button>
    </div>
  );
};

export default PlayButtonComponent;
