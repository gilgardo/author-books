import type { NavigateFunction, RelativeRoutingType } from "react-router-dom";

type QueryParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams;

export const generateNavigateToParams = (
  navigate: NavigateFunction,
  basePath: string,
  options?: {
    shouldNavigate?: boolean;
    onAfterNavigate?: () => void;
    flushSync?: boolean;
    preventScrollReset?: boolean;
    relative?: RelativeRoutingType;
    replace?: boolean;
    viewTransition?: boolean;
  }
) => {
  return (queryParams: QueryParams) => {
    const { shouldNavigate, onAfterNavigate, ...navigateOptions } =
      options ?? {};
    if (shouldNavigate === false) return;
    const params = new URLSearchParams(queryParams);
    navigate(basePath + "?" + params.toString(), navigateOptions);
    if (onAfterNavigate) onAfterNavigate();
  };
};
