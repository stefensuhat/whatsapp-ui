import { useRoomsQuery } from '@/modules/main/actions'
import { Button, Flex, List, Loader, Paper, Text, Title } from '@mantine/core'

type RoomListsProps = {
  onJoinClick: (roomId: string) => void
}

export function RoomLists({ onJoinClick }: RoomListsProps) {
  const { data, isLoading } = useRoomsQuery()

  return (
    <Paper mt="md" withBorder p="md">
      <Title order={2}>Room Lists</Title>
      {isLoading ? (
        <Loader />
      ) : data.length === 0 ? (
        <Text>No Rooms</Text>
      ) : (
        <List type="ordered">
          {data.map((room, index) => {
            return (
              <Flex key={room.id} justify="space-between" mb="md">
                {index + 1}. {room.name}
                <Button size="compact-sm" onClick={() => onJoinClick(room.id)}>
                  Join
                </Button>
              </Flex>
            )
          })}
        </List>
      )}
    </Paper>
  )
}
