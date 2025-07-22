import { useEffect, useRef } from "react";

export function useOutsideClick(close) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          close();
        }
      }

      document.addEventListener("mousedown", handleClick);

      return () => document.removeEventListener("mousedown", handleClick);
    },
    [close]
  );

  return ref;
}
