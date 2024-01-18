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

async def patch_user_to_prediction(predictedBreed, image, username):
    query = {"predictedBreed": predictedBreed, "image":image}
    update= {"$set": {"username": username}}

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

async def fetch_user_by_username(username):
    document = await userCollection.find_one({"username":username}, {'_id': 0})
    return document

def create_user(user):
    #if user already exists in collection, return 409 conflict error
    document = user
    result = userCollection.insert_one(document)
    return result