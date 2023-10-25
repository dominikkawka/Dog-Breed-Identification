import motor.motor_asyncio
from model import prediction
import commonVariables as val

uri = val.uri
client = motor.motor_asyncio.AsyncIOMotorClient(uri)

dogBreedDatabase = client.dogBreed
collection = dogBreedDatabase.prediction

async def fetch_all_predictions():
    predictions = []
    cursor = collection.find({})
    async for document in cursor:
        predictions.append(prediction(**document))
    return predictions

async def fetch_prediction_by_image_name(dogBreedImage):
    document = await collection.find_one({"image":dogBreedImage})
    return document

def save_prediction(prediction):
   document = prediction
   result = collection.insert_one(document)
   return result