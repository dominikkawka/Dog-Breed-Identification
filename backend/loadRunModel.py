import numpy as np
import tensorflow as tf
#keras.models works for .h5, keras.saving is for .keras files
#from keras.models import load_model
from keras.saving import load_model

import random
import base64
import mimetypes
from PIL import Image
import io
import bcrypt
import datetime
import jwt

from backend import commonVariables as val

def modelPrediction(dogBreedImage):
    loadModel = load_model('model/InceptionV3-2.15-22Mar-122-Augmented.h5') #backend/model/InceptionV3-2.15-22Mar-122-Augmented.h5
    #convert image
    
    valueBreed = tf.keras.utils.load_img(dogBreedImage, target_size=(val.image_size,val.image_size))

    img_array = tf.keras.utils.img_to_array(valueBreed)
    img_array = tf.expand_dims(img_array, 0) # Create a batch

    predictions = loadModel.predict(img_array)

    top_k = tf.keras.backend.eval(tf.nn.top_k(predictions[0], k=3))

    top_indices = top_k.indices
    top_scores = top_k.values

    top_predictions = [(val.breedLabel[i], score) for i, score in zip(top_indices, top_scores)]

    first_prediction_label, first_prediction_confidence = top_predictions[0]
    second_prediction_label, second_prediction_confidence = top_predictions[1]
    third_prediction_label, third_prediction_confidence = top_predictions[2]

    first_confidence_percentage = "{:.2f}".format(first_prediction_confidence * 100)
    second_confidence_percentage = "{:.2f}".format(second_prediction_confidence * 100)
    third_confidence_percentage = "{:.2f}".format(third_prediction_confidence * 100)

    print("First Prediction:", first_prediction_label, "Confidence:", first_confidence_percentage)
    print("Second Prediction:", second_prediction_label, "Confidence:", second_confidence_percentage)
    print("Third Prediction:", third_prediction_label, "Confidence:", third_confidence_percentage)

    data = {"predictedBreed": first_prediction_label,
            "confidence": first_confidence_percentage,
            "actualBreed": first_prediction_label,
            "image": dogBreedImage,
            "imageFile": imageToBase64(dogBreedImage),
            "username": 'guest',
            "date": datetime.datetime.now().isoformat() ,
            "secondPredictedBreed": second_prediction_label,
            "secondConfidence": second_confidence_percentage,
            "thirdPredictedBreed": third_prediction_label,
            "thirdConfidence": third_confidence_percentage
            }
    
    #return print(data)
    return data

def imageToBase64(image):
    with open(image, "rb") as imageFile:
        file_type, _ = mimetypes.guess_type(image)
        base64_str = base64.b64encode(imageFile.read()).decode('utf-8')
        base64_data = f"data:{file_type};base64,{base64_str}"
    return base64_data

def webcamBase64toJPG(base64String, imageName):
    img = Image.open(io.BytesIO(base64.decodebytes(bytes(base64String, "utf-8"))))
    result = imageName
    img.save(result)
    result = modelPrediction(result)
    return result
#data:image/jpeg;base64,

def createUser(username, email, password):
    #user validation, is username/email taken? is email valid? etc.

    #password encryption
    passw = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(passw, salt)

    data = {"username": username,
            "email": email,
            "password": hash
            }
    
    return data

def comparePasswords(password, encryptedPassword):
    passw = password.encode('utf-8')
    if bcrypt.checkpw(passw, encryptedPassword):
        return True
    else:
        return False
    
def createAccessToken(data: dict, expires_delta: datetime.timedelta):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, val.secret_key, algorithm=val.algorithm)
    return encoded_jwt

def verifyToken(token: str):
    try:
        payload = jwt.decode(token, val.secret_key, algorithms=[val.algorithm])
        return payload.get("sub")
    except jwt.PyJWTError:
        raise "Invalid credentials"
        