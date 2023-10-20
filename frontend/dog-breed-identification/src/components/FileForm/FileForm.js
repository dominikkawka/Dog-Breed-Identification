import React, {useState} from 'react'
import axios from 'axios'

function FileForm() {
   const [image, setImage] = useState(null)
   const [imagePreview, setImagePreview] = useState(null)
   let predResults = null

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
      const result = await axios.get(`http://localhost:8000/prediction`)
      return console.log(result)
   }

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleImageInputChange}/>
            <button type="submit">Upload Image</button>
            <button onClick={handlePredictionResults}>View All Prediction Results</button>
         </form>
         {imagePreview && <img src={imagePreview} alt="uploaded image" width="192px" height="192px"/>}
      </div>
   )
}

export default FileForm