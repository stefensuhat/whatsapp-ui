import http from '@/lib/http'
import Cookie from 'js-cookie'
import Echo from 'laravel-echo'
import pusher from 'pusher-js'

// @ts-ignore
window.Pusher = pusher

// @ts-ignore
const echo = new Echo({
  broadcaster: 'reverb',
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST,
  wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
  wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
  forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
  enabledTransports: ['ws', 'wss'],
  // authEndpoint: `http://localhost:8000/broadcasting/auth`,
  authorizer: (channel, _options) => {
    return {
      authorize: (socketId, callback) => {
        http
          .post('/broadcasting/auth', {
            socket_id: socketId,
            channel_name: channel.name,
          })
          .then((response) => {
            callback(false, response)
          })
          .catch((error) => {
            callback(true, error)
          })
      },
    }
  },
  // auth: {
  //   headers: {
  //     Authorization: `Bearer ${Cookie.get('access-token')}`,
  //   },
  // },
})

window.Echo = echo

export default echo
