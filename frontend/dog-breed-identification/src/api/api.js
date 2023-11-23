import axios from 'axios';

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = await axios.post('http://localhost:8000/uploadImage', formData);
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

const getPrediction = async (imageName) => {
  try {
    const response = await axios.get('http://localhost:8000/getPrediction', {
      params: {
        image: imageName,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching prediction:', error);
    throw error;
  }
};

export { uploadImage, getPrediction };