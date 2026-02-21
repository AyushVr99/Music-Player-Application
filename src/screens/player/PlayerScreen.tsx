import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { usePlayerStore } from '@store/playerStore';

const formatTime = (millis: number) => {
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const PlayerScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const {
    current,
    position,
    duration,
    status,
    togglePlayPause,
    seek,
    playNext,
    playPrevious,
    skipForward10,
    skipBackward10,
  } = usePlayerStore();

  const safeDuration = duration || 1;
  const progress = Math.min(Math.max(position / safeDuration, 0), 1);

  const handleSlidingComplete = (value: number) => {
    const nextPosition = value * safeDuration;
    void seek(nextPosition);
  };

  const isPlaying = status === 'playing';

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 12, bottom: 12, left: 10, right: 12 }}
        >
          <Ionicons name="chevron-back" size={28} color="#1F1F1F" />
        </TouchableOpacity>
        <TouchableOpacity >
          <Ionicons name="ellipsis-vertical" size={22} color="#1F1F1F" />
        </TouchableOpacity>
      </View>

      {!current ? (
        <View style={styles.emptyWrapper}>
          <Text style={styles.emptyText}>No song is currently playing.</Text>
        </View>
      ) : (
        <>
          {/* Album art */}
          <View style={styles.artworkWrapper}>
            <Image source={{ uri: current.image }} style={styles.artwork} />
          </View>

          {/* Song info */}
          <View style={styles.infoSection}>
            <Text numberOfLines={1} style={styles.title}>
              {current.title}
            </Text>
            <Text numberOfLines={1} style={styles.subTitle}>
              {current.artist}
            </Text>
          </View>

          {/* Seek bar */}
          <View style={styles.sliderSection}>
            <Slider
              value={progress}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#F59E0B"
              maximumTrackTintColor="#D4D4D4"
              thumbTintColor="#F59E0B"
              onSlidingComplete={handleSlidingComplete}
            />
            <View style={styles.timeRow}>
              <Text style={styles.timeText}>{formatTime(position)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </View>

          {/* Main controls: prev | -10s | play | +10s | next */}
          <View style={styles.controlsRow}>
            <TouchableOpacity
              style={styles.smallControl}
              onPress={() => void playPrevious()}
            >
              <Ionicons name="play-skip-back" size={28} color="#4B5563" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.skipControl}
              onPress={() => void skipBackward10()}
            >
              <Ionicons name="play-back" size={20} color="#4B5563" />
              <Text style={styles.skipLabel}>10</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.playControl}
              onPress={() => void togglePlayPause()}
            >
              <Ionicons name={isPlaying ? 'pause' : 'play'} size={36} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.skipControl}
              onPress={() => void skipForward10()}
            >
              <Ionicons name="play-forward" size={20} color="#4B5563" />
              <Text style={styles.skipLabel}>10</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.smallControl}
              onPress={() => void playNext()}
            >
              <Ionicons name="play-skip-forward" size={28} color="#4B5563" />
            </TouchableOpacity>
          </View>

        </>
      )}
    </View>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6B7280',
  },
  artworkWrapper: {
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 28,
  },
  artwork: {
    width: 300,
    height: 300,
    borderRadius: 32,
    backgroundColor: '#E5E7EB',
  },
  infoSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  subTitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  sliderSection: {
    marginBottom: 24,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 14,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000000',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  smallControl: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipControl: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E7EB',
  },
  skipLabel: {
    fontSize: 10,
    color: '#4B5563',
    fontWeight: '600',
    marginTop: 2,
  },
  playControl: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F59E0B',
  },
});
