from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import shutil
import loadRunModel
import database
import model

app = FastAPI()

origins = ['https://localhost:3000', 'http://localhost:3000', 'http://localhost:5173', 'https://localhost:5173']

app.add_middleware(
   CORSMiddleware,
   allow_origins=origins,
   allow_credentials=True,
   allow_methods=["*"],
   allow_headers=["*"]
)

@app.get("/")
async def root():
   return {"message": "hello world"}

@app.post("/uploadImage")
async def uploadImage(image: UploadFile = File(...)):
   lowercase = (image.filename).lower()
   if ('jpeg' in lowercase or 'jpg' in lowercase or 'png' in lowercase):
      #save file to disc
      with open(""+image.filename, "wb") as buffer:
         shutil.copyfileobj(image.file, buffer)

      result = loadRunModel.modelPrediction(image.filename)
      database.save_prediction(result)
      return result
   else:
      raise HTTPException(status_code=400, detail="wrong file extension, please use png or jpg")
   
@app.post("/webcamImage")
async def readWebcamFeed(base64String: model.webcamImage):
   #https://stackoverflow.com/questions/59929028/python-fastapi-error-422-with-post-request-when-sending-json-data
   result = loadRunModel.webcamBase64toJPG(base64String.image)
   database.save_prediction(result)
   return print(result)

@app.get("/allPredictions")
async def allPredictions(): 
   response = await database.fetch_all_predictions()
   return response

@app.get("/getPrediction")
async def getPrediction(image):
   response = await database.fetch_prediction_by_image_name(image)
   return response

@app.patch("/prediction")
async def patchCorrectBreed(correctBreed: model.submitFeedbackPrediction):
   #https://fastapi.tiangolo.com/tutorial/encoder/
   response = await database.update_breed(correctBreed.predictedBreed, correctBreed.image, correctBreed.actualBreed)
   return response

@app.post("/createUser", response_model=model.user)
async def createUser(user: model.user):
   result = loadRunModel.createUser(user.username, user.email, user.password)
   database.create_user(result)
   return result

@app.post("/loginUser", response_model=model.userLogin)
async def loginUser(user: model.userLogin):
   result = loadRunModel.loginUser(user.username, user.password)
   return result

@app.get("/allUsers")
async def allUsers(): 
   response = await database.fetch_all_users()
   return response

@app.get("/getUser")
async def getUser(username):
   response = await database.fetch_user_by_username(username)
   return response
