import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { Grid } from "@material-ui/core";

export default function TableSkeleton() {
    return (
        <div>
            <Skeleton variant='rect' height={35} style={{widht: '100%'}} />
            <Grid container>
                <Grid item xs={1}>
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                </Grid>
                <Grid item xs={5}>
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                </Grid>
                <Grid item xs={4}>
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                </Grid>
                <Grid item xs={2}>
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                    <Skeleton variant='text' width='90%' height={25} />
                </Grid>
            </Grid>

            <Skeleton variant='rect' height={55} />
        </div>
    );
}
