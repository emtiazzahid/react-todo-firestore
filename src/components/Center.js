import * as React from 'react';
import {Grid} from "@mui/material";

function Center(props) {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Grid item xs={3}>
                {props.children}
            </Grid>
        </Grid>
    );
}

export default Center;
