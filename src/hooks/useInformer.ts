import { useEffect, useState } from "react";
import { SnackbarKey, useSnackbar } from "notistack";
import { Subject } from "rxjs";
import { distinct } from "rxjs/operators";

export type TypeStatus = "train" | "upward" | "downward" | "untrained" | null;

export const useInformer = (source: Subject<TypeStatus>) => {
  const [type, setType] = useState<TypeStatus>("train");

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    const subscription = source
      .pipe(distinct())
      .subscribe((type: TypeStatus) => {
        setType(type);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [source]);

  useEffect(() => {
    let key: SnackbarKey | null = null;
    if (type) {
      const msg =
        type === "train"
          ? "Net is warming, please wait. Open console for more info"
          : type === "upward"
          ? "Trend is upward"
          : type === "downward"
          ? "Trend is downward"
          : "";
      const variant =
        type === "train"
          ? "warning"
          : type === "upward"
          ? "success"
          : type === "downward"
          ? "error"
          : "";
      if (msg && variant) {
        key = enqueueSnackbar(msg, {
          variant,
          persist: true,
        });
      }
      return () => {
        if (key) {
          closeSnackbar(key);
        }
      };
    }
    return undefined;
  }, [type, enqueueSnackbar, closeSnackbar]);
};

export default useInformer;
