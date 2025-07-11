import { useSearchParams } from "react-router-dom";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { getDocQueryOptions } from "../useQueryCustomHooks/useDocSearch";
import { getWorkQueryOptions } from "../useQueryCustomHooks/useWorkSearch";
import BookDetailLoader from "../loaders/BookDetailLoader";
import coverUrlFactory from "@/utils/coverUrlFactory";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const BookDetails = () => {
  const [searchParams] = useSearchParams();
  const key = searchParams.get("key") || "";
  const q = searchParams.get("q") || "";
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const queryClient = useQueryClient();

  const queries = useQueries({
    queries: [
      getDocQueryOptions(key, queryClient, q, page),
      getWorkQueryOptions(key, queryClient, q, page),
    ],
  });

  const [docQuery, workQuery] = queries;
  const isPending = queries.some((query) => query.isPending);

  if (isPending) return <BookDetailLoader />;

  const doc = docQuery.data;
  const work = workQuery.data;

  if (!work || !doc) return <p>Book not found.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
      <Card className="p-6 shadow-xl space-y-6">
        <CardHeader className="p-0">
          <CardTitle className="text-3xl font-bold text-primary mb-4">
            {work.title}
          </CardTitle>
          {doc.author_name?.length > 0 && (
            <CardDescription className="text-muted-foreground">
              By {doc.author_name.join(", ")}
            </CardDescription>
          )}
        </CardHeader>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cover Image */}
          <div className="flex-shrink-0 mx-auto lg:mx-0">
            <img
              src={coverUrlFactory(work.covers?.[0]).L}
              alt={work.title}
              className="w-[230px] h-[320px] object-cover rounded-lg border shadow"
            />
          </div>

          {/* Book Meta */}
          <CardContent className="flex-1 p-0 space-y-4 text-sm text-muted-foreground">
            {work.description && (
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">
                  Description
                </h2>
                <p className="leading-relaxed">
                  {typeof work.description === "string"
                    ? work.description
                    : work.description?.value ?? ""}
                </p>
              </div>
            )}

            <div className="grkey grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {/* {doc?.length > 0 && (
                <p>
                  <span className="font-medium text-foreground">Publisher:</span>{" "}
                  {doc.publisher.join(", ")}
                </p>
              )} */}

              {doc.first_publish_year && (
                <p>
                  <span className="font-medium text-foreground">
                    Published:
                  </span>{" "}
                  {doc.first_publish_year}
                </p>
              )}

              {/* {work.subjects && (
                <p>
                  <span className="font-medium text-foreground">Subjects:</span>{" "}
                  {work.subjects}
                </p>
              )} */}

              {/* {doc.number_of_pages_median && (
                <p>
                  <span className="font-medium text-foreground">Pages:</span>{" "}
                  {doc.number_of_pages_median}
                </p>
              )} */}
            </div>
            <div>
              <a
                href={`https://openlibrary.org${doc.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-medium text-green hover:underline">
                View on Open Library →
              </a>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default BookDetails;
