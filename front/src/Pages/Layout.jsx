import React, { Component } from 'react';
import { Grid } from '@material-ui/core';

const Layout = (props) => {
    return (
        <Grid
            container
            direction="row"
        >
            <Grid item xs={12}>
                Menú
            </Grid>
            <Grid item xs={12}>
                {props.children}
            </Grid>
        </Grid>
    );
}

export default Layout;