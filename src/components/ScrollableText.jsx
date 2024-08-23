import { useEffect, useRef, useState } from 'react';

// eslint-disable-next-line react/prop-types
const ScrollableText = ({ text }) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;

    if (textElement.scrollWidth > 400) {
      setIsOverflowing(true);
    } else {
      setIsOverflowing(false);
    }
  }, [text]);

  return (
    <div className="scroll-container">
      <h1
        className={`scroll-text ${isOverflowing ? 'scrolling' : ''}`}
        ref={textRef}
      >
        {text}
      </h1>
    </div>
  );
};

export default ScrollableText;
