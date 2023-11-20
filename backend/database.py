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

async def fetch_prediction_by_image_name(image):
    document = await collection.find_one({"image":image}, {'_id': 0})
    return document

def save_prediction(prediction):
   document = prediction
   result = collection.insert_one(document)
   return result

async def update_breed(predictedBreed, image, actualBreed):
    query = {"predictedBreed": predictedBreed, "image":image}
    update= {"$set": {"actualBreed": actualBreed}}

    document = await collection.update_one(query, update)
    return document