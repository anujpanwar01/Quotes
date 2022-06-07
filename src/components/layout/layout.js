import { Route } from "react-router-dom";
import { Fragment, useState } from "react";
import classes from "./Layout.module.css";
import QuoteList from "../quotes/QuoteList";
import QuoteForm from "../quotes/QuoteForm";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  const [quotes, setQuotes] = useState([]);
  const quoteHanlder = (props) => {
    const newQuote = {
      id: Math.random() * 192992,
      author: props.author,
      text: props.text
    };
    setQuotes((prev) => [...prev, newQuote]);
  };

  return (
    <Fragment>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
