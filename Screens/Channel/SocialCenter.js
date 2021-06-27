import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { Avatar } from 'react-native-elements';
import * as Animation from 'react-native-animatable';
import { Typography, InputText } from '../../components';
import { HartIcon, SmilerEmoji, CommitIcon } from '../../assets/Icons';
import styles from './style';
import { DEVICE } from '../../utils/constants';
import { getPostDuration } from '../../utils/helperFunction';
import { Delete, post } from '../../utils/ApiRequest';

const Channel = ({ social, refreshChannel, isAdmin }) => {
  const [newPost, setNewPost] = useState();
  const [newComment, setNewComment] = useState();
  const { posts, channel } = social;
  const [love, setLove] = useState(false);
  // const [message, setMessage] = useState();

  // console.log(social.posts);
  const handleRefresh = async () => {
    setLove(true);
    await refreshChannel();
    // setMessage('Added success');
    setNewComment();
    setNewPost();
  };

  const onPressSendPost = () => {
    if (newPost)
      post.addPost(channel.id, newPost).then(handleRefresh).catch(console.log);
  };

  const onPressSendComment = (postId) => {
    if (newComment)
      post
        .addComment({ postId, content: newComment })
        .then(handleRefresh)
        .catch(console.log);
  };

  // { postId, commentId }
  const addLike = (like, isLike) => {
    (isLike ? Delete.deleteLike : post.addLike)(like)
      .then(handleRefresh)
      .catch(console.log);
  };
  return (
    <>
      <View style={styles.postSection}>
        <View style={styles.writePostSection}>
          <Typography size="h4">Announcements</Typography>
          {isAdmin && (
            <InputText
              placeholder="Post something.."
              value={newPost}
              onChange={setNewPost}
              containerStyle={{ paddingTop: 16 }}
              inputColor="#f2f2f2"
              RightIcon={() => (
                <View style={{ paddingHorizontal: 16 }}>
                  <TouchableOpacity onPress={onPressSendPost}>
                    <Typography color="highlight" type="h6" bold>
                      Post
                    </Typography>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>
        {posts ? (
          Object.values(posts).map(
            (
              {
                author,
                createdAt,
                content,
                likeCount,
                commentCount,
                comments,
                id,
                liked,
              },
              index
            ) => (
              <View key={index.toString()}>
                <View style={styles.post}>
                  <View style={styles.postHeader}>
                    <Avatar
                      source={{
                        uri: author.avatar,
                      }}
                      size="medium"
                      containerStyle={{ height: 40, width: 40 }}
                      rounded
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Typography type="h5">{author.username}</Typography>
                      <Typography type="h6" color="secondary">
                        {getPostDuration(createdAt)}
                      </Typography>
                    </View>
                  </View>
                  <Typography style={styles.postText} type="h6">
                    {content}
                  </Typography>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <SmilerEmoji />
                    <Typography
                      style={{ marginLeft: '2%' }}
                      color="secondary"
                      type="h6"
                    >
                      {likeCount}
                    </Typography>
                    <Typography
                      style={{ marginLeft: '10%' }}
                      type="h6"
                      color="secondary"
                    >
                      {commentCount} Comments
                    </Typography>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}
                  >
                    <HartIcon
                      onPress={() => {
                        setLove(index);
                        addLike({ postId: id }, liked);
                      }}
                      colored={liked}
                    />
                    <Typography type="h5" color="secondary">
                      Like
                    </Typography>
                    <CommitIcon />
                    <Typography type="h5" color="secondary">
                      Comments
                    </Typography>
                  </View>
                </View>
                {index === love && (
                  <Animation.View
                    onAnimationEnd={() => setLove(false)}
                    animation={love ? 'flash' : 'fadeOut'}
                    style={styles.heartView}
                  >
                    <HartIcon colored max />
                  </Animation.View>
                )}
                <View style={styles.comments}>
                  <Typography type="h6" color="secondary">
                    View more comments
                  </Typography>
                  {comments.length > 0 &&
                    comments.map((e, commentIndex) => (
                      <View
                        style={[styles.postHeader, { marginTop: 9 }]}
                        key={commentIndex.toString()}
                      >
                        <Avatar
                          source={{
                            uri: social.comments[e].author.avatar,
                          }}
                          size="small"
                          rounded
                          containerStyle={{
                            height: 30,
                            width: 30,
                            marginRight: 10,
                            alignSelf: 'flex-start',
                          }}
                        />
                        <View style={{ width: '85%' }}>
                          <Typography type="h5">
                            {social.comments[e].author.username}
                          </Typography>
                          <Typography type="h6">
                            {social.comments[e].content}
                          </Typography>
                          <Typography type="h6" color="secondary">
                            {getPostDuration(social.comments[e].createdAt)}
                          </Typography>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignSelf: 'flex-start',
                          }}
                        >
                          <Typography type="h6" color="secondary">
                            {social.comments[e].likeCount}
                          </Typography>
                          <HartIcon
                            colored={social.comments[e].liked}
                            comment
                            onPress={() =>
                              addLike(
                                { commentId: social.comments[e].id },
                                social.comments[e].liked
                              )
                            }
                          />
                        </View>
                      </View>
                    ))}
                  <View style={styles.postForm}>
                    <InputText
                      placeholder="Add a comment"
                      value={newComment}
                      onChange={setNewComment}
                      boxStyle={{
                        width: DEVICE.width * 0.9,
                        height: DEVICE.height * 0.05,
                        marginBottom: 14,
                      }}
                      // containerStyle={{ height: 20 }}
                      style={{ height: 10 }}
                      RightIcon={() => (
                        <TouchableOpacity
                          onPress={() => onPressSendComment(id)}
                          style={{ marginLeft: 12 }}
                        >
                          <Typography color="highlight" type="h4" bold>
                            Send
                          </Typography>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </View>
              </View>
            )
          )
        ) : (
          <View style={styles.emptyText}>
            <Typography type="h7" color="secondary">
              There are no announcements.
            </Typography>
          </View>
        )}
      </View>
    </>
  );
};

export default Channel;
