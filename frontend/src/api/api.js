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

const patchCorrectBreed = async (predictedBreed, imageName, actualBreed) => {
  try {
    const response = await axios.patch('http://localhost:8000/prediction', {
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
    const response = await axios.patch('http://localhost:8000/predictionUser', {
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
  try {
    const response = await axios.post('http://localhost:8000/loginUser', {
      'username': username,
      'password': password
    });
    return response.data
  } catch (error) {
    throw error
  }
};

const createUser = async (username, email, password) => {
  try {
    const response = await axios.post('http://localhost:8000/createUser', {
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