import axios from './axios';

export const uploadCloudinary = async(file)=>{
    const formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset','amazon_clone');
    const {data} = await axios.post('https://api.cloudinary.com/v1_1/dy0nyhvyf/image/upload', formData);
    return {publicId: data?.public_id, url:data?.secure_url}
}