/**
 *
 * WordCloudPage
 *
 */

import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { compose } from 'redux';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Divider,
} from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PersonPinIcon from '@material-ui/icons/PersonPin';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import ReactWordcloud from 'react-wordcloud';
import GridLoader from 'react-spinners/GridLoader';
import Highlighter from 'react-highlight-words';

import { push } from 'connected-react-router';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import reducer from './reducer';
import saga from './saga';
import { Wrapper } from './styles';
import { theme, compList } from '../../constants';
import CouterWidget from '../../components/CouterWidget';
import { getArticleAction, getYoutubeAction } from '../App/actions';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 16,
    backgroundColor: 'transparent',
    color: 'white',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  pos: {
    marginBottom: 12,
    color: 'white',
  },
  counterIcon: {
    color: 'white',
    opacity: 0.7,
    fontSize: 84,
  },
});

const options = {
  colors: [
    theme.mainColor,
    theme.sapphireColor,
    theme.steelColor,
    theme.turkishBlueColor,
    theme.thirdColor,
    theme.azureColor,
    theme.cornflowerColor,
  ],
  fontSizes: [16, 60],
  deterministic: true,
  enableTooltip: false,
  rotations: 1,
  padding: 5,
  rotationAngles: [0],
  transitionDuration: 1000,
};

export function WordCloudPage({ match }) {
  useInjectReducer({ key: 'wordCloudPage', reducer });
  useInjectSaga({ key: 'wordCloudPage', saga });

  const appState = useSelector(state => state.app);
  const {
    words,
    loading,
    articleList,
    uniquePeople,
    dates,
    createdAt,
  } = appState;
  const classes = useStyles();
  const { compId } = match.params;
  const dispatch = useDispatch();

  const targetComp = compList.find(x => x.id === Number(compId));

  const callbacks = {
    onWordClick: word => {
      dispatch(push(`/final/${targetComp.name}${word.text}`));
      dispatch(getYoutubeAction({ query: `${targetComp.value} ${word.text}` }));
    },
  };

  const onClickLine = data => {
    dispatch(getArticleAction({ createdAt: data.name }));
  };

  return (
    <Wrapper>
      <Grid container>
        <Grid
          item
          sm={4}
          style={{ overflowY: 'auto', height: '100%', padding: 16 }}
        >
          <Grid container>
            <Grid item sm={12} style={{ paddingTop: 16, paddingBottom: 16 }}>
              <Typography style={{ color: 'white' }} variant="h4">
                {`${targetComp.name} News Insight`}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3} style={{ marginBottom: 16 }}>
            <Grid item sm={6} xs={6}>
              <CouterWidget
                color={theme.mainOpacity}
                start={0}
                end={words.length}
                duration={3}
                title="키워드 추출 수"
              >
                <VpnKeyIcon className={classes.counterIcon} />
              </CouterWidget>
            </Grid>
            <Grid item sm={6} xs={6}>
              <CouterWidget
                color={theme.subOpacity}
                start={0}
                end={uniquePeople.length}
                duration={3}
                title="인물 추출 수"
              >
                <PersonPinIcon className={classes.counterIcon} />
              </CouterWidget>
            </Grid>
          </Grid>

          {loading ? (
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh',
              }}
            >
              <Typography style={{ color: 'white' }} variant="h5">
                {createdAt}
              </Typography>
              <Typography style={{ color: 'white' }} variant="h6">
                기사를 불러오는 중입니다
              </Typography>
            </div>
          ) : (
            articleList.map(x => (
              <Card className={classes.root} key={x._id}>
                <CardContent>
                  <Typography className={classes.title} gutterBottom>
                    {x.publisher}
                  </Typography>
                  <Typography variant="h5" component="h2">
                    <Highlighter
                      highlightStyle={{
                        borderBottom: `3px solid ${theme.subColor}`,
                        color: 'white',
                        backgroundColor: 'transparent',
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
            ))
          )}
        </Grid>
        <Grid
          item
          sm={8}
          style={{ padding: 16, height: '100%', width: '100%' }}
        >
          <Grid
            container
            direction="column"
            spacing={2}
            style={{ height: '100%', width: '100%' }}
          >
            <Grid item style={{ height: '40%', width: '100%' }}>
              <Paper
                style={{
                  height: '100%',
                  width: '100%',
                  padding: 16,
                  backgroundColor: 'transparent',
                }}
              >
                <ResponsiveContainer>
                  <BarChart data={dates}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="name"
                      tickLine={false}
                      tick={{ stroke: 'white' }}
                      onClick={onClickLine}
                      padding={{ left: 50, right: 50 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ stroke: 'white' }}
                    />
                    <Bar
                      barSize={40}
                      onClick={onClickLine}
                      type="monotone"
                      dataKey="count"
                      fill="white"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
            <Grid item style={{ height: '60%', width: '100%' }}>
              <Paper
                style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255,255,255,0.7)',
                }}
              >
                {loading ? (
                  <GridLoader color={theme.mainColor} />
                ) : (
                  <ReactWordcloud
                    callbacks={callbacks}
                    options={options}
                    words={words}
                    maxWords={100}
                  />
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

WordCloudPage.propTypes = {};

export default compose(memo)(WordCloudPage);
