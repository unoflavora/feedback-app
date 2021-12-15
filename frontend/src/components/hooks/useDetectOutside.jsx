import { useEffect } from "react";

export default function useDetectOutside(ref, setVisibility) {
  useEffect(() => {
      function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
              setVisibility(false)
          }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  });
}
