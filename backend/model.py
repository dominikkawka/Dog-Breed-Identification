from pydantic import BaseModel

class prediction(BaseModel):
    predictedBreed: str
    confidence: float
    actualBreed: str
    image: str
    _id: int

class webcamImage(BaseModel):
    image: str