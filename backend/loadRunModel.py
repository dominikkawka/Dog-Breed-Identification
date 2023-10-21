import numpy as np
import tensorflow as tf
from keras.models import load_model
import cv2

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

def webcamFeed():
    cam = cv2.VideoCapture(0)
    cam.set(cv2.CAP_PROP_FRAME_WIDTH, val.image_size)
    cam.set(cv2.CAP_PROP_FRAME_HEIGHT, val.image_size)

    # While cam is opened, the camera will take constant pictures, 
    # if a button is pressed, it will save the photo and then upload it to the model
    # after the image is updated to the model, close the camera. 
    while cam.isOpened():
        ret, frame = cam.read()
        cv2.imwrite('cameraPhoto.jpg', frame)
        #modelPrediction('cameraPhoto.jpg')
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    cam.release()