/**
 *
 * WordCloudPage
 *
 */

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { compose } from 'redux';
import { Grid, Card, CardContent, Typography, Paper } from '@material-ui/core';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import ReactWordcloud from 'react-wordcloud';
import GridLoader from 'react-spinners/GridLoader';
import Highlighter from 'react-highlight-words';

import reducer from './reducer';
import saga from './saga';
import { Wrapper } from './styles';
import { theme } from '../../constants';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 16,
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

const options = {
  colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'],
  fontSizes: [16, 60],
  deterministic: false,
  enableTooltip: false,
  rotations: 1,
  rotationAngles: [0],
  transitionDuration: 1000,
};

export function WordCloudPage() {
  useInjectReducer({ key: 'wordCloudPage', reducer });
  useInjectSaga({ key: 'wordCloudPage', saga });

  const appState = useSelector(state => state.app);
  const { words, loading, articleList } = appState;
  const classes = useStyles();

  return (
    <Wrapper>
      <>
        <Grid container>
          <Grid
            item
            sm={4}
            style={{ overflowY: 'auto', height: '100%', padding: 16 }}
          >
            <Typography gutterBottom variant="h4" component="h4">
              SK 키워드 추출
            </Typography>
            {articleList.map(x => (
              <Card className={classes.root} key={x._id}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    {x.publisher}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    <Highlighter
                      highlightStyle={{
                        backgroundColor: '#f6ecf5',
                        borderRadius: 10,
                      }}
                      searchWords={x.keywords}
                      autoEscape
                      textToHighlight={x.title}
                    />
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {x.author}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {x.content}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Grid>
          <Grid
            item
            sm={8}
            style={{ padding: 16, height: '100%', width: '100%' }}
          >
            <Paper
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {loading ? (
                <GridLoader />
              ) : (
                <ReactWordcloud options={options} words={words} />
              )}
            </Paper>
          </Grid>
        </Grid>
      </>
    </Wrapper>
  );
}

WordCloudPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default compose(memo)(WordCloudPage);
