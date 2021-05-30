import { useEffect, useState } from "react";

export const useMarquee = (string: string) => {
  const [text, setText] = useState(string);
  let i = 0;

  useEffect(() => {
    const timer = setInterval(() => {
      setText(string.substring(i) + string.substring(0, i));
      i = (i + 1) % string.length;}, 300);
    return () => clearInterval(timer);
  }, []);

  return text;
};
