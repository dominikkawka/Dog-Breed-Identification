import motor.motor_asyncio
from model import prediction, user
import commonVariables as val

uri = val.uri
client = motor.motor_asyncio.AsyncIOMotorClient(uri)

dogBreedDatabase = client.dogBreed
predictionCollection = dogBreedDatabase.prediction
userCollection = dogBreedDatabase.user

#------------------------
#
#   DOG BREED PREDICTIONS
#
#------------------------

async def fetch_all_predictions():
    predictions = []
    cursor = predictionCollection.find({})
    async for document in cursor:
        predictions.append(prediction(**document))
    return predictions

async def fetch_prediction_by_image_name(image):
    document = await predictionCollection.find_one({"image":image}, {'_id': 0})
    return document

def save_prediction(prediction):
   document = prediction
   result = predictionCollection.insert_one(document)
   return result

async def update_breed(predictedBreed, image, actualBreed):
    query = {"predictedBreed": predictedBreed, "image":image}
    update= {"$set": {"actualBreed": actualBreed}}

    document = await predictionCollection.update_one(query, update)
    return document

#------------------------
#
#   USERS
#
#------------------------
async def fetch_all_users():
    users = []
    cursor = userCollection.find({})
    async for document in cursor:
        users.append(user(**document))
    return users

def save_user():
    document = user
    result = userCollection.insert_one(document)
    return result