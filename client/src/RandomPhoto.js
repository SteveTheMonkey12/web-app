import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const RandomPhoto = () => {
  const [photos, setPhotos] = useState([]);
  const [randomPhoto, setRandomPhoto] = useState(null);
  const [seenPhotos, setSeenPhotos] = useState([]);

  const buttonStyle = {
    margin: '10px',
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  };

  const containerStyle = {
    textAlign: 'center',
  };

  const listStyle = {
    listStyleType: 'none',
    padding: '0',
  };

  const getRandomPhoto = (seen) => {
    if (seenPhotos.length < photos.length) {
        const unseenPhotos = photos.filter((photo) => !seen.includes(photo));
        return unseenPhotos[Math.floor(Math.random() * unseenPhotos.length)];
    }
  };

  const handleRandomize = () => {
    if (seenPhotos.length < photos.length) {
      const newRandomPhoto = getRandomPhoto(seenPhotos);
      const newSeenPhotos = [...seenPhotos, newRandomPhoto];
      Cookies.set('seenPhotos', JSON.stringify(newSeenPhotos));
      setRandomPhoto(newRandomPhoto);
      setSeenPhotos(newSeenPhotos);
    }
  };

  const handleRemoveSeen = (photoToRemove) => {
    const newSeenPhotos = seenPhotos.filter((photo) => photo !== photoToRemove);
    Cookies.set('seenPhotos', JSON.stringify(newSeenPhotos));
    setSeenPhotos(newSeenPhotos);
  };

  const handleReset = () => {
    Cookies.remove('seenPhotos');
    setSeenPhotos([]);
    const newRandomPhoto = getRandomPhoto([]); // Pass an empty array to select from all photos
    setRandomPhoto(newRandomPhoto);
  };

  useEffect(() => {
    const getRandomPhoto = (seen) => {
      const unseenPhotos = photos.filter((photo) => !seen.includes(photo));
      return unseenPhotos[Math.floor(Math.random() * unseenPhotos.length)];
    };

    fetch('/api/photos')
      .then((response) => response.json())
      .then((files) => {
        setPhotos(files);
        const savedSeenPhotos = Cookies.get('seenPhotos') ? JSON.parse(Cookies.get('seenPhotos')) : [];
        setSeenPhotos(savedSeenPhotos);
        const newRandomPhoto = getRandomPhoto(savedSeenPhotos);
        setRandomPhoto(newRandomPhoto);
      })
      .catch((error) => {
        console.error('Error fetching photos:', error);
      });
  }, []);

  return (
    <div style={containerStyle}>
      {randomPhoto && <img src={`../public/photos/${randomPhoto}`} alt="Random" style={{ display: 'block', margin: 'auto' }} />}
      <div>
        <button onClick={handleRandomize} disabled={seenPhotos.length >= photos.length} style={buttonStyle}>Randomize</button>
        <button onClick={handleReset} style={buttonStyle}>Reset</button>
      </div>
      <h3 style={containerStyle}>Seen Photos:</h3>
      <ul style={listStyle}>
        {seenPhotos.map((photo, index) => (
          <li key={index} style={containerStyle}>
            {photo} <button onClick={() => handleRemoveSeen(photo)} style={buttonStyle}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RandomPhoto;

