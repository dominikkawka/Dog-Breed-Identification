from pydantic import BaseModel

class prediction(BaseModel):
    predictedBreed: str
    confidence: float
    actualBreed: str
    image: str
    imageFile: str
    username: str
    date: str
    secondPredictedBreed: str
    secondConfidence: float
    thirdPredictedBreed: str
    thirdConfidence: float
    _id: int

class submitFeedbackPrediction(BaseModel):
    predictedBreed: str
    actualBreed: str
    image: str

class addUserToPrediction(BaseModel):
    predictedBreed: str
    image: str
    username: str

class webcamImage(BaseModel):
    image: str
    imageName: str

class user(BaseModel):
    username: str
    email: str
    password: str
    _id: int

class userLogin(BaseModel):
    #username: str
    #password: str
    access_token: str
    token_type: str
    _id: int