export const fileUpload = async(file) => {
  if(!file) throw new Error('No file provided')
  const baseURL = import.meta.env.VITE_CLOUDINARY_URL
  const name = import.meta.env.VITE_CLOUDINARY_NAME
  const cloudUrl = `${baseURL}/${name}/upload`
  const formData = new FormData()

  formData.append('upload_preset', 'react18-journal')
  formData.append('file', file)
  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData
    })
    if(!resp.ok) throw new Error('Upload failed')
    const { secure_url } = await resp.json()
    return secure_url
  }catch(error) {
    throw new Error(error.message)
  }
}

