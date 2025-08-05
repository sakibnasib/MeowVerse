import axios from "axios"

export const imageUpload=async imageData =>{
    const imageFormData = new FormData()
  imageFormData.append('image', imageData)
  console.log(imageFormData)
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=4bf307bd7fe356fa7b4c940abc922d0f`,
    imageFormData
  )
  // image url response from imgbb

  return data?.data?.display_url
};

export const saveUserDB= async user =>{
  const {data}=await axios.post(`http://localhost:3000/user`,user)
  return data;
}