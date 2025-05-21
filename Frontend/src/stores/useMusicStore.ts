import { axiosInstance } from "@/lib/axios";
import type { Album, Song } from "@/types"; // @ means inside src folder with chadcnui
import {create} from "zustand";

type MusicStore =  {
	songs: Song[]; // custom type for songs
	albums: Album[]; // custom type for albums
	isLoading: boolean;
	error: string | null;
	
	fetchAlbums: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    songs: [],
    isLoading: false,
    error: null,

    	fetchAlbums: async () => {
		set({ isLoading: true, error: null });

		try {
			const response = await axiosInstance.get("/albums");
			set({ albums: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	    },
}));