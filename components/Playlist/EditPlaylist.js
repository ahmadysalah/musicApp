import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AutoDragSortableView } from 'react-native-drag-sort';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import Typography from '../Typography';
import { Handle, DeleteIcon } from '../../assets/Icons';
import { patch } from '../../utils/ApiRequest';
import SimpleAlert from '../Alert';
import { DEVICE } from '../../utils/constants';
import styles from './style';

const Order = ({ data, onPressDeleteVD, channelId, refresh }) => {
  const [message, setMessage] = useState();
  const [confirmation, setConfirmation] = useState();

  const swapVideos = async (oldIndex, newIndex) => {
    try {
      await patch.swapVideos(channelId, { oldIndex, newIndex });
      refresh && (await refresh());
    } catch (error) {
      console.log(error);
    }
  };
  const renderItem = (item, index) => (
    <View style={styles.item}>
      <Handle />
      <Typography
        type="h6"
        style={{ width: '80%', paddingHorizontal: 8 }}
        numberOfLines={1}
        align="left"
      >
        {item.videoInfo.title}
      </Typography>
      <TouchableOpacity onPress={() => setConfirmation(item.id)}>
        <DeleteIcon />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <View
        style={{
          height: '100%',
        }}
      >
        <AutoDragSortableView
          dataSource={data}
          parentWidth={DEVICE.width}
          childrenWidth={DEVICE.width * 0.95}
          childrenHeight={40}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item, index) => renderItem(item, index)}
          marginChildrenBottom={20}
          onDragEnd={swapVideos}
        />
        <SimpleAlert message={message} setMessage={setMessage} />
      </View>

      <SimpleAlert
        title={message}
        toggleAlert={() => setMessage()}
        simpleAlert
        isModalVisible={!!message}
        style={{ backgroundColor: '#000', width: DEVICE.width * 0.9 }}
      />

      <SimpleAlert
        toggleAlert={() => setConfirmation()}
        content="Are You Sure you want to delete this video!!"
        onPressConfirm={() => setConfirmation()}
        isModalVisible={!!confirmation}
        onPressCancel={() => {
          setConfirmation();
          onPressDeleteVD(confirmation).then(() =>
            setMessage('Your Video Was deleted Successfully')
          );
        }}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={styles.confirmMessage}
        confirmTitle="Cancel"
        btnWidth="30%"
        btnHeight={35}
      />
    </>
  );
};

export default Order;
