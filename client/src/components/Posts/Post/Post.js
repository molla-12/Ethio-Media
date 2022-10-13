import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import { deletePost, likePost } from '../../../actions/posts'
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewDetail = () => navigate(`/posts/${post._id}`);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{ likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{ likes.length } { likes.length === 1 ? 'Like' : 'Likes' }</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  return (
    <Card className={ classes.card } >
      <ButtonBase className={ classes.cardAction } onClick={ viewDetail }>
        <CardMedia className={ classes.media } image={ post.selectedFile } title={ post.title } />
        <div className={ classes.overlay }>
          <Typography variant='h6'>{ post.name }</Typography>
          <Typography variant='body2'>{ moment(post.createdAt).fromNow() }</Typography>
        </div>
        <div className={ classes.overlay2 }>
          <Button onClick={ (e) => {
            e.stopPropagation();
            setCurrentId(post._id);
          } }
            style={ { color: 'white' } }
            size="small">
            <MoreHorizIcon fontSize='medium' />
          </Button>
        </div>
        <div className={ classes.details }>
          <Typography variant='body2' color="textSecondary">{ post.tags.map((tag) => `#${tag} `) }</Typography>
        </div>
        <CardContent>
          <Typography className={ classes.title } variant='h5' gutterBottom>{ post.title }</Typography>
        </CardContent>
        <CardContent>
          <Typography className={ classes.details } variant='body2' gutterBottom>{ post.message }</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={ classes.cardActions }>
        <Button size="small" color="primary" disabled={ !user?.result } onClick={ handleLike }>
          <Likes />
        </Button>
        { (user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="secondary" onClick={ () => dispatch(deletePost(post._id)) }>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        ) }
      </CardActions>
    </Card>
  );
}

export default Post;
