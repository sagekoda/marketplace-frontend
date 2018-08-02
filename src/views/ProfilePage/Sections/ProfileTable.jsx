/**
 * @description The analytic card.
 * @author Mohammed Odunayo
 * @class AnalyticCard
 * @name AnalyticCard
 */

import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const data = [
  { title: 'Post Subject', date: '21-04-2018'},
  { title: 'Post Subject', date: '21-04-2018'},
  { title: 'Post Subject', date: '21-04-2018'},
  { title: 'Post Subject', date: '21-04-2018'},
  { title: 'Post Subject', date: '21-04-2018'},
];

function SimpleTable(props) {
  const { classes, title, Icon, color } = props;

  return (
    <Paper className={classes.paper} elevation={4}>
        <Typography align={"left"} variant={"title"} style={{padding: "15px", backgroundColor: color}} >
            <span>{Icon} {title}</span>
        </Typography>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Post Title</TableCell>
                <TableCell numeric>Post Date</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {data.map((row,key) => {
                return (
                <TableRow key={key}>
                    <TableCell>{row.title}</TableCell>
                    <TableCell numeric>{row.date}</TableCell>
                </TableRow>
                );
            })}
            </TableBody>
        </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (SimpleTable);