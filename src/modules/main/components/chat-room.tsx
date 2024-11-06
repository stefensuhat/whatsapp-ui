import echo from '@/lib/echo'
import { useGetMessages, useJoinRoomMutation, useRoomsDetailQuery } from '@/modules/main/actions'
import { MessageInput } from '@/modules/main/components/MessageInput'
import { Box, Flex, Loader, Paper, Stack, Text, Title } from '@mantine/core'
import { useWindowScroll } from '@mantine/hooks'
import { Link } from '@tanstack/react-router'
import { useEffect } from 'react'

export function ChatRoom({ roomId }: { roomId: string }) {
  const { data } = useRoomsDetailQuery(roomId)
  const joinMutation = useJoinRoomMutation()
  const { data: messages, isLoading, refetch } = useGetMessages(roomId)
  const [_scroll, scrollTo] = useWindowScroll()

  const connectWebSocket = () => {
    echo.private(`chatroom`).listen('MessageSent', async () => {
      await refetch()
    })
  }

  useEffect(() => {
    scrollTo({ y: document.body.scrollHeight })
  }, [messages])

  useEffect(() => {
    connectWebSocket()
    joinMutation.mutate(roomId)
    return () => {
      echo.leaveChannel('chatroom')
    }
  }, [])

  return (
    <Paper>
      <Title>Chat Room: {data.name}</Title>

      <Paper pos="relative">
        <Box pb={100}>
          {isLoading ? (
            <Loader />
          ) : (
            messages?.map((message, index) => {
              return (
                <Stack
                  key={index}
                  justify="space-between"
                  mb="sm"
                  w="100%"
                  p="xs"
                  style={{ borderBottom: '1px solid var(--mantine-color-gray-9)' }}
                >
                  <Flex justify="space-between" ta="right" align="center">
                    <Text size="sm" c="dimmed" mt="xs">
                      {new Date(message.created_at).toLocaleString()}
                    </Text>
                    <Text c="lime">{message.user.username}</Text>
                  </Flex>

                  {message.attachment_path ? (
                    <Link replace target="_blank" to={message.attachment_path}>
                      {message.attachment_path}
                    </Link>
                  ) : (
                    <Text>{message.content}</Text>
                  )}
                </Stack>
              )
            })
          )}
        </Box>
        <MessageInput roomId={roomId} />
      </Paper>
    </Paper>
  )
}
