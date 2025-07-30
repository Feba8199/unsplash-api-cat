import { useQuery } from '@tanstack/react-query';
import React from 'react';
import axios from 'axios';
import { useGlobalContext } from './context';

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const response = useQuery({
    queryKey: ['images', searchTerm],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchTerm}`);
      // console.log(result.data);
      return result.data;
    },
  });

  if (response.isLoading) {
    return <section>Loading...</section>;
  }

  if (response.isError) {
    return <section>Error: {response.error.message}</section>;
  }

  const results = response.data.results;
  // console.log(results);

  if (results.length < 1) {
    return <section className="image-container">No images found</section>;
  }

  return (
    <section className="image-container">
      {results.map((image) => {
        const url = image?.urls?.regular;
        return (
          <img
            src={url}
            key={image.id}
            alt={image.alt_description}
            className="img"
          />
        );
      })}
    </section>
  );
};

export default Gallery;
