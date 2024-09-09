import React, { useState, useEffect } from 'react';


const getRandomValue = (min: number, max: number) => Math.random() * (max - min) + min;

const BlurSpot: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(!visible);
    }, getRandomValue(3000, 8000)); 

    return () => clearTimeout(timeout);
  }, [visible]);

  const size = getRandomValue(244, 319); 
  const left = getRandomValue(-size / 2, window.innerWidth - size / 2); 
  const top = getRandomValue(-size / 2, window.innerHeight - size / 2); 

  return (
    <div
      className={`absolute bg-accent rounded-full blur-3xl transition-all duration-[4000ms] ease-in-out ${visible ? 'opacity-25 scale-100' : 'opacity-0 scale-75'}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}px`,
        top: `${top}px`,
      }}
    />
  );
};

const BackgroundBlurs: React.FC = () => {
  const spots = Array.from({ length: 5 }); 

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {spots.map((_, index) => (
        <BlurSpot key={index} />
      ))}
    </div>
  );
};

export default BackgroundBlurs;