import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  header: {
    paddingHorizontal: 22,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandTitle: {
    fontSize: 39 / 2,
    fontWeight: '700',
    color: '#1F1F1F',
  },
  topTabsScrollView: {
    flexGrow: 0,
    flexShrink: 0,
  },
  topTabsRow: {
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
  },
  topTab: {
    marginRight: 26,
    paddingVertical: 10,
    alignItems: 'center',
  },
  topTabText: {
    fontSize: 31 / 2,
    color: '#A8A8A8',
    fontWeight: '500',
  },
  topTabTextActive: {
    color: '#F59E0B',
  },
  activeTabUnderline: {
    height: 3,
    borderRadius: 6,
    width: '100%',
    backgroundColor: '#F59E0B',
    marginTop: 8,
  },
  suggestedContainer: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 120,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 14,
  },
  sectionTitle: {
    fontSize: 35 / 2,
    fontWeight: '700',
    color: '#222222',
  },
  sectionAction: {
    fontSize: 28 / 2,
    fontWeight: '600',
    color: '#DA982D',
  },
  cardItem: {
    width: 112,
    marginRight: 13,
  },
  cardImage: {
    width: 112,
    height: 112,
    borderRadius: 16,
    marginBottom: 8,
    backgroundColor: '#DDDDDD',
  },
  cardTitle: {
    fontSize: 16,
    color: '#222222',
    fontWeight: '600',
  },
  artistItem: {
    width: 112,
    marginRight: 13,
    alignItems: 'center',
  },
  artistImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 10,
    backgroundColor: '#DDDDDD',
  },
  artistName: {
    fontSize: 17,
    color: '#222222',
    fontWeight: '600',
    textAlign: 'center',
  },
  songsContainer: {
    flex: 1,
  },
  songMetaHeader: {
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  songCount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#202020',
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  sortText: {
    color: '#DA982D',
    fontSize: 16,
    fontWeight: '600',
  },
  songList: {
    flex: 1,
  },
  songListContainer: {
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 80,
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
  },
  songCover: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#DDDDDD',
  },
  songDetail: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },
  songName: {
    fontSize: 33 / 2,
    fontWeight: '700',
    color: '#232323',
  },
  songSub: {
    marginTop: 4,
    fontSize: 14,
    color: '#8D8D8D',
  },
  playButton: {
    width: 29,
    height: 29,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F59E0B',
    marginRight: 9,
  },
  moreButton: {
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
  miniPlayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 56,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 12,
  },
  miniPlayerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minWidth: 0,
  },
  miniPlayerIconBtn: {
    padding: 8,
  },
  miniCover: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  miniText: {
    flex: 1,
    fontSize: 15,
    color: '#252525',
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    color: '#A23D3D',
    fontSize: 15,
    fontWeight: '500',
  },
  paginationLoader: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  artistsScreenContainer: {
    flex: 1,
  },
  artistMetaHeader: {
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ECECEC',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  artistCount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#202020',
  },
  artistList: {
    flex: 1,
  },
  artistListContainer: {
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 40,
  },
  artistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  artistRowAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#DDDDDD',
  },
  artistRowInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 10,
  },
  artistRowName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#232323',
  },
  artistRowMeta: {
    marginTop: 2,
    fontSize: 13,
    color: '#8D8D8D',
  },
  artistRowMore: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
});
