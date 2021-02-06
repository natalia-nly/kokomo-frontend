import axios from 'axios'
class MainService {
   constructor() {
      let service = axios.create({
         baseURL: process.env.REACT_APP_API_URL,
         withCredentials: true
      })
      this.service = service
   }

   getData = (url) => {
      return this.service.get(url).then(({ data }) => data)
   }

   postData = (url, body) => {
      return this.service.post(url, body).then(({ data }) => data)
   }

   updateData = (url, body) => {
      return this.service.put(url, body).then(({ data }) => data)
   }

   deleteData = (url) => {
      return this.service.delete(url).then(({ data }) => data)
   }

   upload = (file) => {
      console.log(file)
      const image = new FormData()
      image.append('image', file)
      return this.service.put('/upload', image).then(({ data }) => data)
   }
}

export default new MainService()
