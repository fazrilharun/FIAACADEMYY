import React, { useEffect, useState } from 'react';

interface XPAnimationProps {
  amount: number;
  id: number;
}

export const XPAnimation: React.FC<XPAnimationProps> = ({ amount, id }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, [id]);

  if (!visible) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none">
      <div className="animate-bounce-up text-4xl font-black text-yellow-400 drop-shadow-lg flex items-center gap-2">
        <span className="text-5xl">✨</span>
        +{amount} XP
      </div>
    </div>
  );
};
