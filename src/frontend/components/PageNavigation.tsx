import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPaginationSlots } from "@/utils/getPaginationSlot";
import { useLocation } from "react-router-dom";

const PageNavigation = ({
  page,
  searchParams,
  maxPage,
}: {
  page: number;
  searchParams: URLSearchParams;
  maxPage: number;
}) => {
  const { pathname } = useLocation();
  const linkForPage = (target: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", target.toString());
    return { pathname, search: `?${params.toString()}` };
  };

  const slots = getPaginationSlots(page, maxPage);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious to={linkForPage(Math.max(1, page - 1))} />
        </PaginationItem>

        {slots.map((slot, i) =>
          slot.isEllipsis ? (
            <PaginationEllipsis key={`ellipsis-${i}`} />
          ) : (
            <PaginationLink
              key={slot.page}
              to={linkForPage(slot.page)}
              isActive={slot.page === page}>
              {slot.page}
            </PaginationLink>
          )
        )}

        <PaginationItem>
          <PaginationNext to={linkForPage(Math.min(maxPage, page + 1))} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default PageNavigation;
