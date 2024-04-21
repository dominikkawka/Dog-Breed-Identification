import axios from 'axios';

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/uploadImage`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getPrediction = async (imageName) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/getPrediction`, {
      params: {
        image: imageName,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const patchCorrectBreed = async (predictedBreed, imageName, actualBreed) => {
  try {
    const response = await axios.patch(`${import.meta.env.VITE_API_URL}/prediction`, {
        'predictedBreed': predictedBreed,
        'actualBreed': actualBreed,
        'image': imageName,
      });
    return response.data;
  } catch (error) {

    throw error;
  }
};

const patchUsernameToPrediction = async (predictedBreed, imageName, username) => {
  try {
    const response = await axios.patch(`${import.meta.env.VITE_API_URL}/predictionUser`, {
        'predictedBreed': predictedBreed,
        'image': imageName,
        'username': username
      });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const loginUser = async (username, password) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/loginUserAuth`, formData);
    localStorage.setItem('token', response.data.access_token)
    sessionStorage.setItem('username', username)
    window.location.replace(`/`)
    return response.data
  } catch (error) {
    throw error
  }
};

const createUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/createUser`, {
      'username': username,
      'email': email,
      'password': password
    });
    window.location.replace(`/`)
    return response.data
  } catch (error) {
    throw error
  }
};

export { uploadImage, getPrediction, patchCorrectBreed, patchUsernameToPrediction, loginUser, createUser };