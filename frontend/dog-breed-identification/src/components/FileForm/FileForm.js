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
      const result = await axios.get(`http://localhost:8000/allPredictions`)

      // This gets the information from the database rather than from the model directly
      // Hypothetically: If somebody else were to use the app at the same time, 
      // and uploaded an image, it would get the wrong prediction.

      predBreed = result.data[result.data.length-1].predictedBreed
      predConfidence = result.data[result.data.length-1].confidence

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