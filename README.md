[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/10920/badge)](https://www.bestpractices.dev/projects/10920)

# Dog Breed Identifier using tensorflow image classification. 

#### Dataset used: [Stanford Dogs Dataset](https://www.kaggle.com/datasets/jessicali9530/stanford-dogs-dataset)

I've also used other images for extra dog breeds. I will create a link to a google drive featuring the latest built models. 

## Technologies

### FARM Stack
- FastAPI
- React
- MongoDB

### + Other
- Tensorflow 2.15
- TypeScript
- Vite.js

## Installation

### Docker Compose

`docker compose up`

This is the only command needed to run the application locally, apart from the model itself.

### Local

If you don't have docker installed or want to use docker, you can run these commands instead. Before running the backend though, you will need to change each of the imports from `from backend import...` to `import ...`.

`cd backend`

`pip install -r ../requirements.txt`

`uvicorn main:app --reload`

If you wish to use your GPU to build the model yourself, please follow [this guide](https://www.tensorflow.org/install/pip). 

`cd frontend`

`npm install`

`npm run dev`

#### Other

I haven't uploaded the model itself since there seems to be a bug with git lfs, when downloaded the model is corrupted. In backend, create a folder named model and insert the model from this [google drive download link](https://drive.google.com/file/d/1msjLsnz-Zqua8dRYwe3HL2ofQ36XA5GR/view?usp=sharing). 
