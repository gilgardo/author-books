import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { type SetURLSearchParams } from "react-router-dom";

const PageNavigation = ({
  page,
  setSearchParams,
}: {
  page: number;
  setSearchParams: SetURLSearchParams;
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() =>
              setSearchParams((params) => {
                params.set("page", (page + 1).toString());
                return params;
              })
            }
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {page}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{page + 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">{page + 2}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            onClick={() =>
              setSearchParams((params) => {
                params.set("page", (page + 1).toString());
                return params;
              })
            }
            href="#"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default PageNavigation;
