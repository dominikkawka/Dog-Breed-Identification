import numpy as np
import tensorflow as tf
from keras.models import load_model

import random
import base64
from PIL import Image
import io

import commonVariables as val

def modelPrediction(dogBreedImage):
    loadModel = load_model('model/InceptionV3-2.8-Augmented.keras')

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

    confidence = 100 * np.max(score)
    confidencePercentage = ("{:.2f}").format(confidence) #+ "%"

    data = {"predictedBreed": val.breedLabel[np.argmax(score)],
            "confidence": confidencePercentage,
            "actualBreed": dogBreedImage,
            "image": dogBreedImage,
            }
    
    #return print(data)
    return data

def webcamBase64toJPG(base64String):
    img = Image.open(io.BytesIO(base64.decodebytes(bytes(base64String, "utf-8"))))
    randomInt = str(random.randint(0, 10000))
    result = 'webcamImage-'+randomInt+'.jpeg'
    img.save(result)
    result = modelPrediction(result)
    return result
#data:image/jpeg;base64,
