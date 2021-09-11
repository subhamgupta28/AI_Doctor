import {Button, Card, CardActions, CardContent, Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const cardstyle = makeStyles({
    root: {
        minWidth: 275,
        margin: 20,
        borderRadius: 10
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
export default function OutlinedCard() {
    const classes = cardstyle();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root} elevation={20}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="h2">
                    be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    adjective
                </Typography>
                <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br/>
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant={"contained"} size="small">
                    Cancel
                </Button>
            </CardActions>
        </Card>
    );
}