import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, useWindowDimensions, View } from 'react-native';
import Video, {
  type OnBufferData,
  type OnLoadData,
  type VideoRef,
} from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache-control';
import { Colors, Metrics } from '../../theme';
import ProgressiveImage from './ProgressiveImage';
import styles from './styles';
import { StroyTypes, type StoryViewProps } from './types';
import GradientBackground from './GradientBackground';

const BUFFER_TIME = 1000 * 60;

const StoryView = (props: StoryViewProps) => {
  const [loading, setLoading] = useState(true);
  const [buffering, setBuffering] = useState(true);
  const source = props?.stories?.[props?.progressIndex];

  const videoRef = useRef<VideoRef>(null);
  const videoData = useRef<OnLoadData>();
  const isCurrentIndex = props?.index === props?.storyIndex;

  useEffect(() => {
    if (props?.index === props?.storyIndex) {
      videoRef?.current?.seek(0);
    }
  }, [props?.storyIndex, props?.index]);

  const onLoadStart = () => {
    setLoading(true);
  };

  const loadVideo = () => {
    if (isCurrentIndex) {
      if (videoData.current === undefined) return;
      setLoading(false);
      setBuffering(false);
      props?.onVideoLoaded?.(videoData.current);
    }
  };

  const onBuffer = (data: OnBufferData) => {
    setBuffering(data.isBuffering);
  };

  const { height, width } = useWindowDimensions();

  const renderContent = () => {
    if (source?.type === StroyTypes.GradientBackground && source?.gradient) {
      return <GradientBackground {...source?.gradient} />;
    }

    if (source?.type === StroyTypes.Image) {
      return (
        <ProgressiveImage
          viewStyle={props?.imageStyle ?? styles.imgStyle}
          imgSource={{ uri: source.url ?? '' }}
          thumbnailSource={{ uri: source.url ?? '' }}
          onImageLoaded={props.onImageLoaded}
        />
      );
    }

    if (source?.type === StroyTypes.Video && isCurrentIndex) {
      return (
        <>
          <Video
            ref={videoRef}
            resizeMode="contain"
            paused={props.pause || loading}
            source={{
              uri: convertToProxyURL({
                url: source?.url!,
              }),
            }}
            onEnd={props?.onVideoEnd}
            onError={(_error: any) => {
              setLoading(false);
            }}
            onProgress={data => {
              if (isCurrentIndex) {
                props?.onVideoProgress?.(data);
              }
            }}
            bufferConfig={{
              minBufferMs: BUFFER_TIME,
              bufferForPlaybackMs: BUFFER_TIME,
              bufferForPlaybackAfterRebufferMs: BUFFER_TIME,
            }}
            onBuffer={onBuffer}
            onLoadStart={onLoadStart}
            onLoad={(item: OnLoadData) => {
              videoData.current = item;
              !Metrics.isIOS && loadVideo();
            }}
            onReadyForDisplay={loadVideo}
            style={styles.contentVideoView}
            {...props?.videoProps}
          />
          {(loading || buffering) && props?.showSourceIndicator && (
            <ActivityIndicator
              animating
              pointerEvents="none"
              color={Colors.loaderColor}
              size="small"
              style={styles.loaderView}
              {...props?.sourceIndicatorProps}
            />
          )}
        </>
      );
    }

    return null;
  };

  return (
    <View style={[styles.divStory, { height, width }]} ref={props?.viewRef}>
      {renderContent()}
    </View>
  );
};

export default StoryView;
