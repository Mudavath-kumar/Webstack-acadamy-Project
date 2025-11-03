import { useEffect, useState } from 'react';

const TypingAnimation = ({ texts, speed = 150, delay = 2000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentIndex];
    let timeout;

    if (!isDeleting && displayText === currentText) {
      timeout = setTimeout(() => setIsDeleting(true), delay);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    } else {
      const nextText = isDeleting
        ? currentText.substring(0, displayText.length - 1)
        : currentText.substring(0, displayText.length + 1);

      timeout = setTimeout(() => setDisplayText(nextText), isDeleting ? speed / 2 : speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts, speed, delay]);

  return (
    <span>
      {displayText}
      <span
        style={{
          display: 'inline-block',
          width: '3px',
          height: '1.2em',
          background: 'currentColor',
          marginLeft: '4px',
          animation: 'blink 1s step-end infinite',
          verticalAlign: 'text-bottom',
        }}
      />
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  );
};

export default TypingAnimation;
