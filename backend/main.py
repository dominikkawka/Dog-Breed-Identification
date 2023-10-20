from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import shutil
import loadRunModel
import database

app = FastAPI()

origins = ['https://localhost:3000', 'http://localhost:3000']

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
      #database.save_prediction(result)
      return print(result)
   else:
      raise HTTPException(status_code=400, detail="wrong file extension, please use png or jpg")
   
@app.post("/webcamImage")
async def readWebcamFeed():
   #goes into a infinite loop when testing in swaggerUI
   result = loadRunModel.webcamFeed()
   return result


@app.get("/prediction")
async def prediction(): 
   response = await database.fetch_all_predictions()
   return response