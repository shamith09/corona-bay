import React, { useEffect } from "react";
import { Card, CardContent, Typography, Grid, ButtonBase, Button } from "@material-ui/core"


const NewsCard = (props) => {

    return (
        <div style={{ margin: "3%" }}>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase>
                                <img src={props.article.urlToImage} alt="Article Icon" style={{ width: 250, height: 150 }} />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" style={{fontWeight: "bold"}}>
                                        {props.article.title}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        {props.article.description}
                                    </Typography>
                                    <br />
                                    <Typography variant="body2" gutterBottom>
                                        {props.article.author}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                <Button color="primary" href={props.article.url} target="_blank">
                                    View Article
                                </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}

export default NewsCard;