import { useEffect, useRef } from 'react';
import classes from '../Header/Header.module.css';

export function useHeader() {
  const headerWrapper = useRef<HTMLDivElement | null>(null);

  const scroll = () => {
    if (headerWrapper.current) {
      window.pageYOffset > 0
        ? headerWrapper.current.classList.add(`${classes.sticky}`)
        : headerWrapper.current.classList.remove(`${classes.sticky}`);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', scroll);
  }, []);

  return headerWrapper;
}
