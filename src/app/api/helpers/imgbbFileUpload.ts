import { IMGBB_API_URL, ImageInput, IMGBB, IMGBBResponse } from "@/app/constants/backend";
import axios from "axios";

/* API Details
* URL : https://api.imgbb.com/1/upload
* Method : POST
* Parameters:
* - key (required): The API key.
* - image (required): A binary file, base64 data, or a URL for an image. (up to 32 MB)
* - name (optional): The name of the file, this is automatically detected if uploading a file with a POST and multipart/form-data
* - expiration (optional): Enable this if you want to force uploads to be auto deleted after certain time (in seconds 60-15552000)
*/

async function getImgbbUrl(image: ImageInput): Promise<IMGBBResponse> {
    // API Key
    const api_key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    // Request Body - Form Data
    const formData = new FormData();
    formData.append("image", image);

    try {
        // Fetch Request
        const res = await axios.post(IMGBB_API_URL + `${api_key}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        const data = res.data;
        if (!data.success) {
            console.error("Error uploading image to imgbb:", data.error.message);
            throw new Error("Image upload failed");
        }
        const imgdata = data.data;

        return {
            success: true,
            imageURL: {
                url: imgdata.image?.url || null,
                thumb: imgdata.thumb?.url || null,
            },
        };
    } catch (error) {
        console.error("Error uploading image to imgbb:", error);
        throw new Error("Error uploading image");
    }
}

// give this function a file and it will return 2 strings in an object 
export default async function createImgbbUrl(
    image: ImageInput,
): Promise<IMGBB | null> {
    const response = await getImgbbUrl(image);
    return response.imageURL;
}
