import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { searchArtists, searchSongs } from '@api/musicApi';
import { MusicArtist, MusicSong } from '@app-types/music.types';
import { usePlayerStore } from '@store/playerStore';
import { styles } from './HomeScreen.styles';

type TopTab = 'Suggested' | 'Songs' | 'Artists' | 'Albums' | 'Podcasts';

const topTabs: TopTab[] = ['Suggested', 'Songs', 'Artists', 'Albums', 'Podcasts'];

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = React.useState<TopTab>('Suggested');
   const navigation = useNavigation();
  const { current, status, playSong, togglePlayPause, playNext } = usePlayerStore();

  const recentlyPlayedQuery = useQuery({
    queryKey: ['home', 'recently-played'],
    queryFn: () => searchSongs({ query: 'latest', page: 1, limit: 6 }),
  });

  const mostPlayedQuery = useQuery({
    queryKey: ['home', 'most-played'],
    queryFn: () => searchSongs({ query: 'trending', page: 1, limit: 6 }),
  });

  const artistsQuery = useQuery({
    queryKey: ['home', 'artists'],
    queryFn: () => searchArtists({ query: 'arijit', page: 1, limit: 12 }),
  });

  const songsQuery = useInfiniteQuery({
    queryKey: ['home', 'songs-feed'],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      searchSongs({
        query: 'hindi hits',
        page: pageParam,
        limit: 12,
      }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : undefined,
  });

  const songs = React.useMemo(
    () => songsQuery.data?.pages.flatMap((page) => page.results) ?? [],
    [songsQuery.data]
  );
  const recentlyPlayed = recentlyPlayedQuery.data?.results.slice(0, 3) ?? [];
  const mostPlayed = mostPlayedQuery.data?.results.slice(0, 3) ?? [];
  const artists = artistsQuery.data?.results ?? [];
  const totalArtists = artistsQuery.data?.total ?? artists.length;
  const totalSongs = songsQuery.data?.pages[0]?.total ?? songs.length;

  const handlePlaySong = (item: MusicSong) => {
    const idx = songs.findIndex((s) => s.id === item.id);
    void playSong(item, songs, idx >= 0 ? idx : 0);
  };

  const handlePlayFromSuggested = (item: MusicSong, queue: MusicSong[]) => {
    const idx = queue.findIndex((s) => s.id === item.id);
    void playSong(item, queue, idx >= 0 ? idx : 0);
  };

  const SongRow = ({ item, onPlaySong }: { item: MusicSong; onPlaySong: (item: MusicSong) => void }) => {
    const { current, status, togglePlayPause } = usePlayerStore();
    const isCurrentTrack = current?.id === item.id;
    const iconName = isCurrentTrack && status === 'playing' ? 'pause' : 'play';

    return (
      <TouchableOpacity
        style={styles.songRow}
        activeOpacity={0.7}
        onPress={() => {
          if (isCurrentTrack) {
            navigation.navigate('Player' as never);
          } else {
            onPlaySong(item);
            setTimeout(() => {
              navigation.navigate('Player' as never);
            }, 100);
          }
        }}
      >
        <Image source={{ uri: item.image }} style={styles.songCover} />
        <View style={styles.songDetail}>
          <Text numberOfLines={1} style={styles.songName}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={styles.songSub}>
            {item.artist} {'  |  '} {item.duration} mins
          </Text>
        </View>
        <TouchableOpacity
          style={styles.playButton}
          onPress={(e) => {
            e.stopPropagation();
            if (isCurrentTrack) {
              void togglePlayPause();
            } else {
              onPlaySong(item);
            }
          }}
        >
          <Ionicons name={iconName} size={14} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.moreButton}
          onPress={(e) => {
            e.stopPropagation();
          }}
        >
          <Ionicons name="ellipsis-vertical" size={17} color="#333333" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderSongRow = ({ item }: { item: MusicSong }) => (
    <SongRow key={item.id} item={item} onPlaySong={handlePlaySong} />
  );

  const renderCard = (item: MusicSong, queue: MusicSong[]) => (
    <TouchableOpacity
      key={item.id}
      style={styles.cardItem}
      activeOpacity={0.7}
      onPress={() => handlePlayFromSuggested(item, queue)}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text numberOfLines={2} style={styles.cardTitle}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  const renderArtist = (artist: MusicArtist) => (
    <View key={artist.id} style={styles.artistItem}>
      <Image source={{ uri: artist.image }} style={styles.artistImage} />
      <Text numberOfLines={1} style={styles.artistName}>
        {artist.name}
      </Text>
    </View>
  );

  const renderArtistRow = ({ item }: { item: MusicArtist }) => (
    <View key={item.id} style={styles.artistRow}>
      <Image source={{ uri: item.image }} style={styles.artistRowAvatar} />
      <View style={styles.artistRowInfo}>
        <Text numberOfLines={1} style={styles.artistRowName}>
          {item.name}
        </Text>
        <Text numberOfLines={1} style={styles.artistRowMeta}>
          Artist
        </Text>
      </View>
      <TouchableOpacity style={styles.artistRowMore}>
        <Ionicons name="ellipsis-vertical" size={18} color="#333333" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top + 6 }]}>
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <Ionicons name="musical-notes" size={27} color="#F59E0B" />
          <Text style={styles.brandTitle}>Mume</Text>
        </View>
        <TouchableOpacity>
          <Feather name="search" size={27} color="#343434" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.topTabsRow}
        style={styles.topTabsScrollView}
      >
        {topTabs.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <TouchableOpacity
              key={tab}
              style={styles.topTab}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <Text style={[styles.topTabText, isActive && styles.topTabTextActive]}>{tab}</Text>
              {isActive ? <View style={styles.activeTabUnderline} /> : null}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {activeTab === 'Songs' ? (
        <View style={styles.songsContainer}>
          <View style={styles.songMetaHeader}>
            <Text style={styles.songCount}>{totalSongs} songs</Text>
            <View style={styles.sortRow}>
              <Text style={styles.sortText}>Ascending</Text>
              <Ionicons name="swap-vertical-outline" size={16} color="#F59E0B" />
            </View>
          </View>

          {songsQuery.isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#F59E0B" />
            </View>
          ) : songsQuery.isError ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.errorText}>Unable to load songs.</Text>
            </View>
          ) : (
            <FlatList
              data={songs}
              renderItem={renderSongRow}
              keyExtractor={(item) => item.id}
              extraData={`${current?.id}-${status}`}
              showsVerticalScrollIndicator={false}
              style={styles.songList}
              contentContainerStyle={[
                styles.songListContainer,
                current && { paddingBottom: 150 },
              ]}
              onEndReachedThreshold={0.3}
              onEndReached={() => {
                if (songsQuery.hasNextPage && !songsQuery.isFetchingNextPage) {
                  songsQuery.fetchNextPage();
                }
              }}
              ListFooterComponent={
                songsQuery.isFetchingNextPage ? (
                  <View style={styles.paginationLoader}>
                    <ActivityIndicator color="#F59E0B" />
                  </View>
                ) : null
              }
            />
          )}

        </View>
      ) : activeTab === 'Artists' ? (
        <View style={styles.artistsScreenContainer}>
          <View style={styles.artistMetaHeader}>
            <Text style={styles.artistCount}>{totalArtists} artists</Text>
            <View style={styles.sortRow}>
              <Text style={styles.sortText}>Date Added</Text>
              <Ionicons name="swap-vertical-outline" size={16} color="#F59E0B" />
            </View>
          </View>

          {artistsQuery.isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#F59E0B" />
            </View>
          ) : artistsQuery.isError ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.errorText}>Unable to load artists.</Text>
            </View>
          ) : (
            <FlatList
              data={artists}
              keyExtractor={(item) => item.id}
              renderItem={renderArtistRow}
              showsVerticalScrollIndicator={false}
              style={styles.artistList}
              contentContainerStyle={[
                styles.artistListContainer,
                current && { paddingBottom: 150 },
              ]}
            />
          )}
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.suggestedContainer,
            current && { paddingBottom: 150 },
          ]}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recently Played</Text>
            <Text style={styles.sectionAction}>See All</Text>
          </View>
          {recentlyPlayedQuery.isLoading ? (
            <ActivityIndicator color="#F59E0B" />
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {recentlyPlayed.map((item) => renderCard(item, recentlyPlayed))}
            </ScrollView>
          )}

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Artists</Text>
            <Text style={styles.sectionAction}>See All</Text>
          </View>
          {artistsQuery.isLoading ? (
            <ActivityIndicator color="#F59E0B" />
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {artists.map(renderArtist)}
            </ScrollView>
          )}

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Most Played</Text>
            <Text style={styles.sectionAction}>See All</Text>
          </View>
          {mostPlayedQuery.isLoading ? (
            <ActivityIndicator color="#F59E0B" />
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {mostPlayed.map((item) => renderCard(item, mostPlayed))}
            </ScrollView>
          )}
        </ScrollView>
      )}

      {current ? (
        <View
          style={[styles.miniPlayer, { bottom: insets.bottom + 78 }]}
          pointerEvents="box-none"
        >
          <TouchableOpacity
            style={styles.miniPlayerContent}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Player' as never)}
          >
            <Image source={{ uri: current.image }} style={styles.miniCover} />
            <Text numberOfLines={1} style={styles.miniText}>
              {current.title} - {current.artist}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.miniPlayerIconBtn}
            onPress={() => void togglePlayPause()}
          >
            <Ionicons
              name={status === 'playing' ? 'pause' : 'play'}
              size={22}
              color="#F59E0B"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.miniPlayerIconBtn}
            onPress={() => void playNext()}
          >
            <Ionicons name="play-skip-forward" size={22} color="#F59E0B" />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default HomeScreen;