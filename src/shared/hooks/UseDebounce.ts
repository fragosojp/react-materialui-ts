import { useCallback, useRef } from "react";
/**
 * função para impedir que o frontEnd faças pesquisas desnecessarias ao backEnd
 */
export const UseDebounce = (delay = 300, noteDelayInFristTime = true) => {
  const isFirsTime = useRef(noteDelayInFristTime);
  const debouncing = useRef<NodeJS.Timeout>();
  const debounce = useCallback(
    (func: () => void) => {
      if (isFirsTime.current) {
        isFirsTime.current = false;
        func();
      } else {
        if (debouncing.current) {
          clearTimeout(debouncing.current);
        }
        debouncing.current = setTimeout(() => func(), delay);
      }
    },
    [delay]
  );
  return { debounce };
};
