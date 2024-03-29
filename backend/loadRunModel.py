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
    print("loading .keras model")
    loadModel = load_model('model/InceptionV3-2.15-22Mar-122-Augmented.h5') #backend/model/InceptionV3-2.15-22Mar-122-Augmented.h5
    print("loading .keras model complete")
    #convert image
    
    valueBreed = tf.keras.utils.load_img(dogBreedImage, target_size=(val.image_size,val.image_size))

    img_array = tf.keras.utils.img_to_array(valueBreed)
    img_array = tf.expand_dims(img_array, 0) # Create a batch

    predictions = loadModel.predict(img_array)

    # each result here has 0.00 ... instead of a full number in front, which is why the confidence is low no matter what.
    # even when using the pretrained images, it'll get the breed right, but the confidence will always stay around 1-2%
    score = tf.nn.softmax(predictions[0])

    #print(score) 
    #print("--------")

    confidence = np.max(predictions[0])
    confidencePercentage = ("{:.2f}").format(confidence) #+ "%"

    data = {"predictedBreed": val.breedLabel[np.argmax(score)],
            "confidence": confidencePercentage,
            "actualBreed": val.breedLabel[np.argmax(score)],
            "image": dogBreedImage,
            "imageFile": imageToBase64(dogBreedImage),
            "username": 'guest',
            "date": datetime.datetime.now().isoformat() 
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
        