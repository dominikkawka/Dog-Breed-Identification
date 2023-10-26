import React, {useState} from 'react'
import axios from 'axios'

function FileForm() {
   const [image, setImage] = useState(null)
   const [imagePreview, setImagePreview] = useState(null)
   const [prediction, setPrediction]= useState('')

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
         console.log("uploaded picture")
         console.log(response.json)
      } else {
         console.error("upload fail")
      } } catch(error) {
      console.error(error)
      }
   }

   const handlePredictionResults = async () => {
      await axios.get(`http://localhost:8000/getPrediction`, {
         params: {
            "image": image.name,
         }
      })
      .then(response => {
         console.log(response)
         predBreed = response.data.predictedBreed
         predConfidence = response.data.confidence
      })
      .catch(err => {
         console.error(err)
      })

      setPrediction(predBreed + ': ' + predConfidence)
   }

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleImageInputChange}/>
            <button type="submit">Upload Image</button>
         </form>
         <br />
         <button onClick={handlePredictionResults}>View Prediction Results</button>
         <p>Predicted Breed: {prediction}</p>
         {imagePreview && <img src={imagePreview} alt="prediction" width="192px" height="192px"/>}
      </div>
   )
}

export default FileForm