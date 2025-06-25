import { useNavigate, type RelativeRoutingType } from "react-router-dom";

type QueryParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams;

type NavigateOptions = {
  shouldNavigate?: boolean;
  onAfterNavigate?: () => void;
  flushSync?: boolean;
  preventScrollReset?: boolean;
  relative?: RelativeRoutingType;
  replace?: boolean;
  viewTransition?: boolean;
};

export function useNavigateToParams(
  basePath: string,
  options?: NavigateOptions
) {
  const navigate = useNavigate();

  return (queryParams: QueryParams) => {
    const { shouldNavigate, onAfterNavigate, ...navigateOptions } =
      options ?? {};
    if (shouldNavigate === false) return;

    const params = new URLSearchParams(queryParams);
    navigate(`${basePath}?${params.toString()}`, navigateOptions);

    onAfterNavigate?.();
  };
}
