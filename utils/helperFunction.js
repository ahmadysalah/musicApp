/* eslint-disable no-nested-ternary */
import { Alert } from 'react-native';
import moment from 'moment';

const BUFFER_TIME = 3;
const LOOP = true;
const confirmationAlert = (title, message, onConfirm, onCancel) => {
  if (typeof message === 'function') {
    onConfirm = message;
  }
  return Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        style: 'ok',
        onPress: onCancel,
      },
      { text: 'OK', onPress: onConfirm },
    ],
    { cancelable: true }
  );
};

const getPostDuration = (date) => {
  const current = new Date(Date.now());
  const previous = new Date(date);

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return `${Math.round(elapsed / 1000)} seconds ago`;
  }

  if (elapsed < msPerHour) {
    return `${Math.round(elapsed / msPerMinute)} minutes ago`;
  }

  if (elapsed < msPerDay) {
    return `${Math.round(elapsed / msPerHour)} hours ago`;
  }

  if (elapsed < msPerMonth) {
    return ` ${Math.round(elapsed / msPerDay)} days ago`;
  }

  if (elapsed < msPerYear) {
    return ` ${Math.round(elapsed / msPerMonth)} months ago`;
  }

  return ` ${Math.round(elapsed / msPerYear)} years ago`;
};

const defaultPlayerStatus = () => ({
  queueStartPosition: 0,
  videoStartTime: 0,
  clockStartTime: moment(),
  status: 'Ended',
});

// If the playlist is very near the end of the current video,
// begin playback at the next video or end the stream
const checkNewPlayerStatus = (
  { queueStartPosition, clockStartTime, videoStartTime },
  playlist,
  newPlayerStatus,
  loop
) => {
  if (newPlayerStatus.queueStartPosition >= playlist.length) {
    return defaultPlayerStatus();
  }

  if (
    playlist[newPlayerStatus.queueStartPosition].length -
      newPlayerStatus.videoStartTime <
    5
  ) {
    // The current video is very near to the end
    let nextPosition = newPlayerStatus.queueStartPosition + 1;
    if (nextPosition === playlist.length && loop) {
      // If channel loops and the end of the playlist has been reached,
      // return to the first video in the playlist
      nextPosition = 0;
    }

    if (nextPosition < playlist.length) {
      // Skip to the next video
      return calculateNextPlayerStatus(
        { queueStartPosition, clockStartTime, videoStartTime },
        playlist,
        nextPosition
      );
    }
    // Consider the stream ended
    return defaultPlayerStatus();
  }

  return newPlayerStatus;
};

const calculateNextPlayerStatus = (
  { queueStartPosition, clockStartTime, videoStartTime },
  playlist,
  nextPosition
) => {
  const newPlayerStatus = {
    queueStartPosition: nextPosition,
    videoStartTime: 0,
    status: 'Playing',
  };

  let queuePosition = queueStartPosition + 1;
  let elapsedTime =
    playlist[queueStartPosition].length - videoStartTime + BUFFER_TIME;
  while (queuePosition < nextPosition) {
    elapsedTime += playlist[queuePosition].length + BUFFER_TIME;
    queuePosition++;
  }

  newPlayerStatus.clockStartTime = moment(clockStartTime).add(
    elapsedTime,
    'seconds'
  );

  return newPlayerStatus;
};

const calculatePlayerStatus = (
  { queueStartPosition, clockStartTime, videoStartTime, status },
  playlist,
  getCurrentOnly,
  currTime = moment(),
  loop = true
) => {
  if (playlist.length === 0 || status === 'Ended') {
    return defaultPlayerStatus();
  }

  const momentStartTime = moment(clockStartTime);

  const newPlayerStatus = {
    queueStartPosition,
    videoStartTime,
    clockStartTime: momentStartTime,
    status,
  };

  if (status === 'Paused') return newPlayerStatus;

  if (getCurrentOnly) {
  } else if (currTime - momentStartTime >= 0) {
    // The user has joined an active channel
    // They will begin buffering at a bufferTime seconds into the future
    currTime.add(BUFFER_TIME, 'seconds');
    newPlayerStatus.clockStartTime = currTime;
  } else {
    return checkNewPlayerStatus(
      { queueStartPosition, clockStartTime, videoStartTime },
      playlist,
      newPlayerStatus,
      loop
    );
  }

  const msToS = 1 / 1000;
  const elapsedTime = (currTime - momentStartTime) * msToS;
  newPlayerStatus.videoStartTime += elapsedTime;
  while (newPlayerStatus.queueStartPosition < playlist.length) {
    const currVideoTime = playlist[newPlayerStatus.queueStartPosition].length;
    if (newPlayerStatus.videoStartTime > currVideoTime) {
      newPlayerStatus.queueStartPosition++;

      if (newPlayerStatus.queueStartPosition === playlist.length) {
        if (loop) {
          // Return to the first video in the playlist
          newPlayerStatus.queueStartPosition = 0;
        } else {
          // The stream has ended
          return defaultPlayerStatus();
        }
      }

      // Subtract the video length from the elapsed time
      // Also subtract buffer time in between this video and the next
      newPlayerStatus.videoStartTime -= currVideoTime + BUFFER_TIME;

      if (newPlayerStatus.videoStartTime < 0) {
        // The user has joined the channel in between videos
        // Re-add the buffer time between this video and the next
        // This is the time the user will begin watching the video
        newPlayerStatus.videoStartTime += BUFFER_TIME;
        break;
      }
    } else {
      break;
    }
  }

  if (getCurrentOnly) {
    if (newPlayerStatus.queueStartPosition >= playlist.length) {
      if (loop) {
        newPlayerStatus.queueStartPosition = 0;
        newPlayerStatus.videoStartTime = 0;
      } else {
        return defaultPlayerStatus();
      }
    }

    return newPlayerStatus;
  }

  return checkNewPlayerStatus(
    { queueStartPosition, clockStartTime, videoStartTime },
    playlist,
    newPlayerStatus,
    loop
  );
};

const mapVideoStatuses = (playlist, currPosition, status) =>
  playlist.map((video, position) => {
    const videoStatus =
      position < currPosition
        ? 'ended'
        : position > currPosition
        ? 'queued'
        : status.toLowerCase();

    return {
      ...video,
      status: videoStatus,
    };
  });

const playNextVideo = (playerStatus, playlist, queueList) => {
  let nextPosition = playerStatus.queueStartPosition + 1;
  if (nextPosition === playlist.length && LOOP) {
    nextPosition = 0;
  }

  if (playlist.length > nextPosition) {
    let newQueueList = null;
    if (nextPosition === 0) {
      // Reset video statuses when restarting playlist from beginning
      newQueueList = mapVideoStatuses(
        playlist,
        nextPosition,
        playerStatus.status
      );
    } else {
      newQueueList = [...queueList];
      newQueueList[nextPosition].status = playerStatus.status.toLowerCase();
      newQueueList[nextPosition - 1].status = 'ended';
    }

    const nextPlayerStatus = calculateNextPlayerStatus(
      playerStatus,
      playlist,
      nextPosition
    );

    console.log(nextPlayerStatus);
  }
};

export {
  confirmationAlert,
  getPostDuration,
  defaultPlayerStatus,
  calculateNextPlayerStatus,
  calculatePlayerStatus,
  BUFFER_TIME,
  LOOP,
};
