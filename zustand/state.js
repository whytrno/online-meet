import {create} from "zustand";

export const useIsLoading = create((set) => ({
    isLoading: true,
    setIsLoading: (isLoading) => {
        set({isLoading: isLoading})
    }
}))

export const useMeetingId = create((set) => ({
    meetingId: null,
    setMeetingId: (meetingId) => {
        set({meetingId: meetingId})
    }
}))

export const useUserAuth = create((set) => ({
    userAuth: null,
    setUserAuth: (userAuth) => {
        set({userAuth: userAuth})
    }
}))