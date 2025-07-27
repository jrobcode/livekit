const express = require('express');
const { AccessToken } = require('@livekit/server-sdk');

const app = express();
app.use(express.json());

const apiKey = process.env.LIVEKIT_API_KEY;
const apiSecret = process.env.LIVEKIT_API_SECRET;

app.post('/token', (req, res) => {
  const { user_id, room, role } = req.body;

  const token = new AccessToken(apiKey, apiSecret, {
    identity: user_id,
    name: user_id,
  });

  token.addGrant({
    room,
    roomJoin: true,
    canPublish: role === 'host',
    canSubscribe: true,
  });

  res.json({ token: token.toJwt(), ws_url: process.env.LIVEKIT_URL });
});

app.listen(3000, () => console.log('LiveKit token server running'));
