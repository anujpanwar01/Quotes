import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HignlightedQuote from "../components/quotes/HighlightedQuote";
import { getSingleQuote } from "../lib/api";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = () => {
  const { quoteId } = useParams();
  const { path, url } = useRouteMatch();
  const { sendRequest, status, data: loadedQuote, error } = useHttp(
    getSingleQuote,
    true
  );

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "error") {
    return <p className="centered">{error}</p>;
  }
  if (status === "completed" && !loadedQuote.text) {
    return <p>No Quote found</p>;
  }

  return (
    <Fragment>
      <HignlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      {/* I want to show only this link to if comments not shown */}
      <Route path={path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};
export default QuoteDetail;
