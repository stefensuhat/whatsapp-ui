import http from '@/lib/http'
import { queryClient } from '@/lib/query'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useRoomsQuery() {
  return useQuery({
    queryKey: ['rooms', 'list'],
    queryFn: async (): Promise<any[]> => {
      return await http.get('chatrooms')
    },
    initialData: [],
  })
}

export function useRoomsDetailQuery(roomId: string) {
  return useQuery({
    queryKey: ['rooms', 'detail', roomId],
    queryFn: async (): Promise<Record<string, any>> => {
      return await http.get(`chatrooms/${roomId}`)
    },
    initialData: [],
    enabled: !!roomId,
  })
}

export function useCreateRoomMutation() {
  return useMutation({
    mutationFn: async (values: any) => {
      return await http.post('chatrooms', values)
    },
    onSuccess: async (_data) => {
      await queryClient.invalidateQueries({ queryKey: ['rooms', 'list'] })
    },
  })
}

export function useJoinRoomQuery() {
  return useMutation({
    mutationFn: async ({ roomId }: { roomId: string }): Promise<Record<string, any>> => {
      return await http.post(`chatrooms/${roomId}/join`, roomId)
    },
  })
}

export function useLeaveRoomMutation() {
  return useMutation({
    mutationFn: async (roomId: string) => {
      return await http.post(`chatrooms/${roomId}/leave`)
    },
  })
}

export function useGetMessages(roomId: string) {
  return useQuery({
    queryKey: ['messages', 'list', roomId],
    queryFn: async (): Promise<any[]> => {
      return await http.get(`chatrooms/${roomId}/messages`)
    },
    initialData: [],
    refetchInterval: false,
  })
}

export function useSendMessageMutation(roomId: string) {
  return useMutation({
    mutationFn: async (values: any) => {
      return await http.post(`chatrooms/${roomId}/messages`, values)
    },
  })
}
