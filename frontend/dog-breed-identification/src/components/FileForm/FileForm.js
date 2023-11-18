import React, {useState} from 'react'
import axios from 'axios'
import SelectCorrectBreed from '../SelectCorrectBreed/SelectCorrectBreed'

function FileForm() {
   const [image, setImage] = useState(null)
   const [imagePreview, setImagePreview] = useState(null)
   const [prediction, setPrediction]= useState('')
   const [confidence, setConfidence]= useState('')
   const [actualBreed, setActualBreed] = useState()

   let predBreed = '';
   let predConfidence = '';

   const handleImageInputChange = (event) => {
      setImage(event.target.files[0])
      setImagePreview(URL.createObjectURL(event.target.files[0]))
   }

   const handleSubmit = async (event) => {
      event.preventDefault();

      const formData = new FormData();
      formData.append('image', image)

      try {
         let endpoint = "http://localhost:8000/uploadImage"
         let response = await fetch(endpoint, {
            method: "POST",
            body: formData
         })

      if (response.ok) {
         //console.log("uploaded picture")
      } else {
         //console.error("upload fail")
      } } catch(error) {
      //console.error(error)
      }
   }

   const handlePredictionResults = async () => {
      await axios.get(`http://localhost:8000/getPrediction`, {
         params: {
            "image": image.name,
         }
      })
      .then(response => {
         //console.log(response)
         predBreed = response.data.predictedBreed
         predConfidence = response.data.confidence
      })
      .catch(err => {
         //console.error(err)
      })

      setPrediction(predBreed)
      setConfidence(predConfidence)
   }

   const handleSubmitActualBreed = async (event) => {
      event.preventDefault();

      const formData = new FormData();
      formData.append('image', image)

      console.log("prediction: " + prediction)

      await axios.patch(`http://localhost:8000/prediction`, {
         params: {
            "predictedBreed": prediction,
            "image": image.name,
            "actualBreed": prediction
         }
      })
      .then(response => {
         console.log(response)
      })
      .catch(err => {
         console.log(prediction + ", " + image.name)
         console.error(err)
      })
   }

   return (
      <>
         <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleImageInputChange}/>
            <button type="submit">Upload Image</button>
         </form>
         <br />
         <button onClick={handlePredictionResults}>View Prediction Results</button>
         <p>Predicted Breed: {prediction} + Confidence: {confidence}</p>
         {imagePreview && <img src={imagePreview} alt="prediction" width="192px" height="192px"/>}
         <SelectCorrectBreed />
         <button onClick={handleSubmitActualBreed}>Submit Actual Breed</button>
      </>
   )
}

export default FileForm