import {Song} from "../models/songModel.js";
import {Album} from "../models/albumModel.js";

// Function to upload a file to Cloudinary
const uploadToCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto", // Automatically determine the resource type (image/audio)
            // folder: "songs", // Specify the folder in Cloudinary
        });
        return result.secure_url; // Return the secure URL of the uploaded file
    } catch (error) {
        console.log("Error uploading to Cloudinary:", error);
        throw new Error("Failed to upload file to Cloudinary"); // Throw an error if the upload fails       
    }
}

export const createSong = async (req, res, next) => {
    try {
        if(!req.files || !req.files.audioFile) { //
            return res.status(400).json({ message: "No audio file uploaded" });
        }

        const { title, artist, albumId} = req.body; // Destructure the request body
        const audioFile = req.files.audioFile; // Get the audio file from the request
        const imageFile = req.files.imageFile; // Get the image file from the request

        const audioUrl = audioFile ? await uploadToCloudinary(audioFile) : null; // Upload the audio file to Cloudinary
        const imageUrl = imageFile ? await uploadToCloudinary(imageFile) : null; // Upload the image file to Cloudinary if provided

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            duration,
            album: albumId|| null, // Set the album ID if provided
        });

        await song.save(); // Save the song to the database

        // If an album ID is provided, update the album with the new song
        if (albumId) {
          await Album.findByIdAndUpdate(albumId, { $push: { songs: song._id } });
        }

        res.statues(201).json({message: "Song created successfully",song});

    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }

}