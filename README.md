# Dog Breed Identifier using tensorflow image classification. 

#### Database used: [Stanford Dogs Dataset](https://www.kaggle.com/datasets/jessicali9530/stanford-dogs-dataset)

## FARM Stack+
- FastAPI
- React
- MongoDB
- Python
- Tensorflow

## Installation

`cd backend`

`pip install -r requirements.txt`

`uvicorn main:app --reload`

If you want to build the model yourself, make sure to set up Nvidia CUDA and CuDNN with the appropriate tensorflow version. For more information check this [LINK](https://www.tensorflow.org/install/source#gpu_support_2).  tensorflow 2.8 requires CuDNN 8.1 and CUDA 11.2

`cd frontend/dog-breed-identification`

`npm install`

`npm start`

HEADS UP:
In the directory `backend/commonVariables.py`, make sure to change the datasetDir variable to the dataset.