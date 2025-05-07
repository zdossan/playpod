import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();


  const getArtistId = () => {
    if (track?.artists?.[0]?.adamid) return track.artists[0].adamid;
    if (track?.relationships?.artists?.data?.[0]?.id) {
      return track.relationships.artists.data[0].id;
    }
    return null;
  };

  const getArtistName = () => {
    if (track?.subtitle) return track.subtitle;
    if (track?.attributes?.artistName) return track.attributes.artistName;
    return 'Unknown Artist';
  };

  const getCoverArt = () => {
    if (track?.images?.coverart) return track.images.coverart;
    if (track?.attributes?.artwork?.url) {
      return track.attributes.artwork.url.replace('{w}x{h}bb', '400x400');
    }
    return 'https://via.placeholder.com/400';
  };

  const handleClick = () => {
    const artistId = getArtistId();
    if (artistId) {
      navigate(`/artists/${artistId}`);
    }
  };

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={handleClick}
    >
      <img 
        alt="artist_img" 
        src={getCoverArt()} 
        className="w-full h-56 rounded-lg"
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = 'https://via.placeholder.com/400';
        }}
      />
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {getArtistName()}
      </p>
    </div>
  );
};

export default ArtistCard;