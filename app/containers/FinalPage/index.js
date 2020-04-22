/**
 *
 * FinalPage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import YouTube from 'react-youtube';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Grid,
  Typography,
  Paper,
  makeStyles,
  Card,
  CardActionArea,
  CardHeader,
  Avatar,
} from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import CommentIcon from '@material-ui/icons/Comment';
import { useSelector } from 'react-redux';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import reducer from './reducer';
import saga from './saga';
import { Wrapper } from '../WordCloudPage/styles';
import CouterWidget from '../../components/CouterWidget';
import { theme } from '../../constants';

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

function decodeHtml(html) {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

export function FinalPage({ match }) {
  useInjectReducer({ key: 'finalPage', reducer });
  useInjectSaga({ key: 'finalPage', saga });
  const classes = useStyles();

  const { query } = match.params;

  const appState = useSelector(state => state.app);
  const { youtubeLoading, mainVideo, comments } = appState;

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
                {`${query} YouTube Insight`}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={3} style={{ marginBottom: 16 }}>
            <Grid item sm={6} xs={6}>
              <CouterWidget
                color={theme.mainOpacity}
                start={0}
                end={13}
                duration={3}
                title="관련 영상 수"
              >
                <YouTubeIcon className={classes.counterIcon} />
              </CouterWidget>
            </Grid>
            <Grid item sm={6} xs={6}>
              <CouterWidget
                color={theme.subOpacity}
                start={0}
                end={90}
                duration={3}
                title="댓글 수"
              >
                <CommentIcon className={classes.counterIcon} />
              </CouterWidget>
            </Grid>
          </Grid>

          {youtubeLoading ? (
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
              <Typography variant="h6">영상을 불러오는 중입니다</Typography>
            </div>
          ) : (
            <div>
              <Card variant="outlined" className={classes.root}>
                <CardHeader title={mainVideo.snippet.channelTitle} />
                <YouTube
                  className="full"
                  videoId={mainVideo.id.videoId} // defaults -> null
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    style={{ color: 'white' }}
                  >
                    {decodeHtml(mainVideo.snippet.title)}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: 'white' }}
                    component="p"
                  >
                    {mainVideo.snippet.description}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          )}
        </Grid>
        <Grid
          item
          sm={8}
          style={{
            padding: 16,
            height: '100%',
            width: '100%',
            overflowY: 'auto',
          }}
        >
          <Grid
            container
            direction="column"
            style={{ height: '100%', width: '100%' }}
          >
            <Grid item md={12}>
              {comments.map(x => (
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar
                        aria-label="recipe"
                        className={classes.avatar}
                        src={x.authorThumb}
                      />
                    }
                    title={x.author}
                    subheader={
                      <Typography style={{ color: 'white', fontSize: 12 }}>
                        {x.time}
                      </Typography>
                    }
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      style={{ color: 'white' }}
                      component="p"
                    >
                      {x.text}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Wrapper>
  );
}

FinalPage.propTypes = {};

export default compose(memo)(FinalPage);
