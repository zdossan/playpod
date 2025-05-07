import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();

  const getKey = () => {
    return song?.key || song?.id; 
  };

  const getTitle = () => {
    return song?.title || song?.attributes?.name;
  };

  const getSubtitle = () => {
    return song?.subtitle || song?.attributes?.artistName;
  };

  const getCoverArt = () => {
    if (song?.images?.coverart) return song.images.coverart;
    if (song?.attributes?.artwork?.url) {
      return song.attributes.artwork.url.replace('{w}x{h}bb', '400x400');
    }
    return 'https://via.placeholder.com/400';
  };

  const getArtistId = () => {
    if (song?.artists?.[0]?.adamid) return song.artists[0].adamid;
    if (song?.relationships?.artists?.data?.[0]?.id) {
      return song.relationships.artists.data[0].id;
    }
    return null;
  };

  const getPreviewUrl = () => {
    if (song?.hub?.actions?.[1]?.uri) return song.hub.actions[1].uri;
    if (song?.attributes?.previews?.[0]?.url) {
      return song.attributes.previews[0].url;
    }
    return null;
  };

  const isActive = activeSong?.key === getKey() || 
                   activeSong?.id === getKey();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    const songData = {
      key: getKey(),
      title: getTitle(),
      subtitle: getSubtitle(),
      images: { coverart: getCoverArt() },
      artists: [{ adamid: getArtistId() }],
      hub: {
        actions: getPreviewUrl() ? [{}, { uri: getPreviewUrl() }] : []
      }
    };

    dispatch(setActiveSong({ 
      song: songData, 
      data: data.map(item => ({
        key: item.key || item.id,
        title: item.title || item.attributes?.name,
        subtitle: item.subtitle || item.attributes?.artistName,
        images: { 
          coverart: item.images?.coverart || 
                  item.attributes?.artwork?.url?.replace('{w}x{h}bb', '400x400')
        },
        artists: [{ 
          adamid: item.artists?.[0]?.adamid || 
                item.relationships?.artists?.data?.[0]?.id 
        }],
        hub: {
          actions: item.hub?.actions || 
                 item.attributes?.previews?.map(preview => ({ uri: preview.url }))
        }
      })), 
      i 
    }));
    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${isActive ? 'flex bg-black bg-opacity-70' : 'hidden'}`}>
          <PlayPause
            isPlaying={isPlaying && isActive}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img 
          alt="song_img" 
          src={getCoverArt()} 
          className="w-full h-full rounded-lg"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://via.placeholder.com/400';
          }}
        />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${getKey()}`}>
            {getTitle() || 'Unknown Title'}
          </Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link to={getArtistId() ? `/artists/${getArtistId()}` : '/top-artists'}>
            {getSubtitle() || 'Unknown Artist'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;