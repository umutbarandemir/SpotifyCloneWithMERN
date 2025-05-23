import { axiosInstance } from '@/lib/axios';
import {create} from 'zustand';

type ChatStore = {
    users: any[]; // Replace with actual type
    isLoading: boolean;
    error: string | null;

    fetchUsers: () => Promise<void>;
}

export const useChatStore = create<ChatStore>((set) => ({
    users: [],
    isLoading: false,
    error: null,
    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/users');
            set({ users: response.data });
        } catch (error: any) {
            console.error('Error fetching users:', error);
            set({ error: error.response?.data?.message || 'An error occurred' });
        } finally {
            set({ isLoading: false });
        }
    },
}));