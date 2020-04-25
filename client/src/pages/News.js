import React, { useState, useEffect } from "react";
import { Container, Button, Grid } from "@material-ui/core";
import NewsCard from "../components/NewsCard";
import axios from "axios"

const News = () => {

  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getArticles()
  }, [])

  useEffect(() => {
    const currentPage = page;
    if(articles === null) setPage(currentPage + 1)
    if(articles === undefined) if(page !== 1) setPage(currentPage - 1)
  }, [articles])

  useEffect(() => {
    getArticles()
  }, [page])

  const getArticles = () => {
    axios.get("https://newsapi.org/v2/everything?language=en&pageSize=10&page=" + page + "&qInTitle=coronavirus&sortBy=publishedAt&apiKey=0a1ebfe8485546fcb93822669d1ec8fb")
      .then(res => {
        setArticles(res.data.articles)
        setIsLoading(false);
      })
      .catch(err => console.log(err))
  }

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      {isLoading || articles == null ? null :
        <Container>
          {
            articles.map((article) => <NewsCard article={article} />)
          }
        </Container>
      }
      <Grid container direction="row" justify="center" alignItems="center">
        <Button variant="contained" size="large" color="primary" onClick={() => {
          setArticles(undefined)
        }}>
          Previous Page
        </Button>
        <div style={{ margin: "2%" }} />
        <Button variant="contained" size="large" color="primary" onClick={() => {
          setArticles(null)
        }}>
          Next Page
      </Button>
      </Grid>
      <div style={{ margin: "2%" }} />
    </Grid>
  )
};

export default News;
