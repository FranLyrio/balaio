import { useCallback, type Ref } from "react";

type PossibleRef<T> = Ref<T> | undefined;

function setRef<T>(ref: PossibleRef<T>, value: T | null) {
  if (typeof ref === "function") return ref(value);
  if (ref) (ref as { current: T | null }).current = value;
}

/** Junta duas refs numa só (ex.: a ref interna e a do consumidor). */
export function useComposedRefs<T>(a: PossibleRef<T>, b: PossibleRef<T>) {
  return useCallback(
    (node: T | null) => {
      setRef(a, node);
      setRef(b, node);
    },
    [a, b],
  );
}
