from keras.saving import load_model

def modelPredictionH5():
    print("loading .h5 model")
    loadModel = load_model('model/InceptionV3-2.15-27Mar-122-Augmented.h5')
    print("loading .h5 model complete")

def modelPredictionKeras():
    print("loading .keras model")
    loadModel = load_model('model/InceptionV3-2.15-27Mar-122-Augmented.keras')
    print("loading .keras model complete")

def modelPredictionFile():
    print("loading file model")
    loadModel = load_model('model/InceptionV3-2.15-8Apr-122-Augmented')
    print("loading file model complete")

#modelPredictionH5()
#modelPredictionKeras()
modelPredictionFile()