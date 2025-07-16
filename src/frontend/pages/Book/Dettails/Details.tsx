import { useSearchParams } from "react-router-dom";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import coverUrlFactory from "@/utils/coverUrlFactory";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import DetailsLoader from "./DetailsLoader";
import { getDocQueryOptions } from "./useDocSearch";
import { getWorkQueryOptions } from "./useWorkSearch";
import { getEditionQueryOptions } from "./useEditionSearch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

const BookDetails = () => {
  const [searchParams] = useSearchParams();
  const workKey = searchParams.get("workKey") || "";
  const editionKey = searchParams.get("editionKey") || "";
  const q = searchParams.get("q") || "";
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const queryClient = useQueryClient();

  const queries = useQueries({
    queries: [
      getDocQueryOptions(workKey, queryClient, q, page),
      getWorkQueryOptions(workKey),
      getEditionQueryOptions(editionKey),
    ],
  });

  const [docQuery, workQuery, editionQuery] = queries;
  const isPending = queries.some((query) => query.isPending);

  if (isPending) return <DetailsLoader />;

  const doc = docQuery.data;
  const work = workQuery.data;
  const edition = editionQuery.data;

  if (!work || !doc || !edition) return <p>Book not found.</p>;

  return (
    <Card className="m-auto px-6 py-8  shadow-xl  w-full md:w-[80%] lg:w-[60%] overflow-y-auto overflow-x-hidden flex flex-col justify-start">
      <CardHeader className="flex flex-col items-center justify-center">
        <CardTitle className="text-3xl font-bold text-primary mb-4">
          {work.title}
        </CardTitle>
      </CardHeader>
      <div className="flex flex-col  md:flex-row justify-between gap-5">
        <img
          src={coverUrlFactory(work.covers?.[0]).L}
          alt={work.title}
          className="w-[20rem] h-[30rem] object-cover rounded-lg border shadow"
        />
        <CardDescription className="text-muted-foreground md:self-end">
          {doc.author_name?.length > 0 && (
            <p>
              <span className="font-medium text-foreground">Authors:</span>{" "}
              {doc.author_name.join(", ")}
            </p>
          )}
          {edition.publishers?.length > 0 && (
            <p>
              <span className="font-medium text-foreground">Publisher:</span>{" "}
              {edition.publishers.join(", ")}
            </p>
          )}
          {doc.first_publish_year && (
            <p>
              <span className="font-medium text-foreground">Year:</span>{" "}
              {doc.first_publish_year}
            </p>
          )}
        </CardDescription>
      </div>

      <CardContent className=" h-full flex-1 p-0 space-y-4 text-sm text-muted-foreground">
        {work.description && (
          <>
            <h2 className="text-lg font-semibold text-foreground mb-1">
              Description
            </h2>
            <ScrollArea className="h-[70%] w-full pr-3">
              <div className="leading-relaxed">
                {typeof work.description === "string" ? (
                  <ReactMarkdown>{work.description}</ReactMarkdown>
                ) : (
                  <ReactMarkdown>{work.description?.value ?? ""}</ReactMarkdown>
                )}
              </div>
            </ScrollArea>
          </>
        )}
      </CardContent>
      <div className="flex items-center justify-around">
        <a
          href={`https://openlibrary.org${doc.key}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-sm font-medium text-green hover:underline">
          View on Open Library →
        </a>
        {doc.ebook_access === "public" && (
          <Button>
            <a
              href={`https://archive.org/download/${doc.ia?.[0]}/${doc.ia?.[0]}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm font-medium text-green hover:underline">
              Read Pdf
            </a>
          </Button>
        )}
      </div>
    </Card>
  );
};

export default BookDetails;
