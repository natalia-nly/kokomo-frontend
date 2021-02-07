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

   upload = async (files) => {
      try {
         return new Promise((resolve, reject) => {
            if (!files) return resolve(null)
            const formData = new FormData()
            if (files.length === 1) {
               formData.append('file', files[0], files[0].name)
            } else {
               files.forEach((f) => formData.append('file', f, f.name))
            }
            this.service
               .post('/property/upload', formData)
               .then(({ data }) => resolve(data))
               .catch((err) => reject(err))
         })
      } catch (error) {
         console.error(error)
      }
   }
}

export default new MainService()
