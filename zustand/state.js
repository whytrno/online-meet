import {create} from "zustand";

export const useIsLoading = create((set) => ({
    isLoading: true,
    setIsLoading: (isLoading) => {
        set({isLoading: isLoading})
    }
}))