import {Song} from "../models/songModel.js";
import {Album} from "../models/albumModel.js";
import cloudinary from "../lib/cloudinary.js"; // Import Cloudinary configuration

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
		if (!req.files || !req.files.audioFile) {
			return res.status(400).json({ message: "No audio file uploaded" });
		}

		const { title, artist, albumId, duration } = req.body; // added duration to destructure
		const audioFile = req.files.audioFile;
		const imageFile = req.files.imageFile;

		const audioUrl = audioFile ? await uploadToCloudinary(audioFile) : null;
		const imageUrl = imageFile ? await uploadToCloudinary(imageFile) : null;

		const song = new Song({
			title,
			artist,
			audioUrl,
			imageUrl,
			duration,
			album: albumId || null,
		});

		await song.save();

		if (albumId) {
			await Album.findByIdAndUpdate(albumId, { $push: { songs: song._id } });
		}

		res.status(201).json({ message: "Song created successfully", song }); // ✅ fixed line

	} catch (error) {
		console.error("Error in createSong:", error); // more helpful log
		next(error);
	}
};
export const deleteSong = async (req, res, next) => {
	try {
		const { id } = req.params;

		const song = await Song.findById(id); // Find the song by ID

        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }

		// if song belongs to an album, update the album's songs array
		if (song.albumId) {
			await Album.findByIdAndUpdate(song.albumId, {
				$pull: { songs: song._id },
			});
		}

		await Song.findByIdAndDelete(id); // Delete the song from the database

		res.status(200).json({ message: "Song deleted successfully" });
	} catch (error) {
		console.log("Error in deleteSong", error);
		next(error);
	}
};

export const createAlbum = async (req, res, next) => {
	try {
		const { title, artist, releaseYear } = req.body;
		const { imageFile } = req.files;

		const imageUrl = await uploadToCloudinary(imageFile);

		const album = new Album({
			title,
			artist,
			imageUrl,
			releaseYear,
		});

		await album.save();

		res.status(201).json(album);
	} catch (error) {
		console.log("Error in createAlbum", error);
		next(error);
	}
};

export const deleteAlbum = async (req, res, next) => {
	try {
		const { id } = req.params;
		await Song.deleteMany({ albumId: id });
		await Album.findByIdAndDelete(id);
		res.status(200).json({ message: "Album deleted successfully" });
	} catch (error) {
		console.log("Error in deleteAlbum", error);
		next(error);
	}
};

export const checkAdmin = async (req, res, next) => {
	res.status(200).json({ admin: true });
};