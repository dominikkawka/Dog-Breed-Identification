import axios from 'axios';

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/uploadImage`, formData);
    return response.data;
  } catch (error) {
    console.error('Error uploading image:', error);
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
    console.error('Error fetching prediction:', error);
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
    console.error('Error patching correct breed:', error);
    console.log("prediction: "+ predictedBreed)
    console.log("image name: "+ imageName)
    console.log("actualBreed: "+ actualBreed)
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
    console.error('Error patching correct breed:', error);
    console.log("prediction: "+ predictedBreed)
    console.log("image name: "+ imageName)
    console.log("username: "+ username)
    throw error;
  }
}

const loginUser = async (username, password) => {
  console.log(import.meta.env.VITE_API_URL) // no workey...
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/loginUser`, {
      'username': username,
      'password': password
    });
    return response.data
  } catch (error) {
    //console.log(error.response.data.detail)
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
    return response.data
  } catch (error) {
    throw error
  }
};

export { uploadImage, getPrediction, patchCorrectBreed, patchUsernameToPrediction, loginUser, createUser };