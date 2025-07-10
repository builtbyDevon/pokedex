"use client";
import { Button } from './ui/button';
import { TooltipOrPopover } from './ui/tooltip-or-popover';

import React, { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import { AudioLines, Play } from 'lucide-react';

interface AudioPlayer {
    src: string;
}

const AudioPlayer = ({ src }: AudioPlayer) => {
  const soundRef = useRef<Howl | null>(null);
  const [soundPlaying, setSoundPlaying] = useState(false);

  console.log('sound playiong ? ', soundPlaying);

  useEffect(() => {
    // Don't initialize if no src is provided
    if (!src) {
      return;
    }
   
    soundRef.current = new Howl({
      src: [src],
      format: ['ogg', 'mp3'], 
      volume: 0.3  , 
      onend: () => {
        setSoundPlaying(false);
      },
    });

   
    return () => {
      if (soundRef.current) {
        setSoundPlaying(false);
        soundRef.current.unload();
      }
    };
  }, [src]);

  const playAudio = () => {
    setSoundPlaying(true);

    if (soundRef.current) {
      soundRef.current.play();
    }
  };

  // Don't render if no src is provided
  if (!src) {
    return null;
  }

  return (
    <div className="absolute bottom-2 left-2">
      <TooltipOrPopover content="Listen to Cry">
        <Button variant="outline" className={`cursor-pointer rounded-full w-12 h-12 ${soundPlaying && "pointer-events-none"} `} onClick={playAudio}>{soundPlaying ? <AudioLines /> : <Play />}</Button>
      </TooltipOrPopover>
    </div>
  );
};

export default AudioPlayer;