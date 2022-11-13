import { useEffect, useRef, useState } from 'react';
import classes from '../Header/Header.module.css';

export function useHeader() {
  const [loginStatus, setLoginStatus] = useState(false);
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

  return {
    loginStatus,
    setLoginStatus,
    headerWrapper,
  };
}
