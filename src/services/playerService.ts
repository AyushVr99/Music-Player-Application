import { Audio, AVPlaybackStatus } from 'expo-av';

let sound: Audio.Sound | null = null;

const ensureAudioMode = async () => {
  await Audio.setAudioModeAsync({
    allowsRecordingIOS: false,
    staysActiveInBackground: true,
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
    playThroughEarpieceAndroid: false,
  });
};

export const unloadPlayer = async () => {
  if (sound) {
    try {
      await sound.unloadAsync();
    } catch {
      // ignore
    } finally {
      sound = null;
    }
  }
};

export const loadAndPlay = async (
  uri: string,
  onStatusUpdate: (status: AVPlaybackStatus) => void
) => {
  await ensureAudioMode();
  await unloadPlayer();

  const { sound: newSound } = await Audio.Sound.createAsync(
    { uri },
    { shouldPlay: true },
    onStatusUpdate
  );

  sound = newSound;
};

export const resume = async () => {
  if (sound) {
    await sound.playAsync();
  }
};

export const pause = async () => {
  if (sound) {
    await sound.pauseAsync();
  }
};

export const seekTo = async (positionMillis: number) => {
  if (sound) {
    await sound.setPositionAsync(positionMillis);
  }
};

