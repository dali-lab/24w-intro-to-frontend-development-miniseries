import axios from 'axios';
import { useState, useEffect, useRef } from 'react';

function About() {
  const [catImage, setCatImage] = useState(null);
  const isFirstRender = useRef(true);

  const fetchCatImage = async () => {
    if (!isFirstRender.current) return;

    try {
      const response = await axios.get('https://cataas.com/cat?json=true');
      const imageUrl = `https://cataas.com/cat/${response.data._id}`;
      setCatImage(imageUrl);
    } catch (error) {
      console.error('Error fetching cat image:', error);
    }
  };

  useEffect(() => {
    fetchCatImage();
    isFirstRender.current = false;
  }, []);

  return (
    <div>
      <h2>About</h2>
      <p>This is a simple to-do list app created with React.</p>
      {catImage && <img src={catImage} alt="Random cat" />}
    </div>
  );
}

export default About;
