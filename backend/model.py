from pydantic import BaseModel

class prediction(BaseModel):
    predictedBreed: str
    confidence: float
    actualBreed: str
    image: str
    _id: int

class submitFeedbackPrediction(BaseModel):
    predictedBreed: str
    actualBreed: str
    image: str

class webcamImage(BaseModel):
    image: str

class user(BaseModel):
    username: str
    email: str
    password: str
    _id: int

class userLogin(BaseModel):
    username: str
    password: str
    _id: int