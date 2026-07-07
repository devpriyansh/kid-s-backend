const userSocketMap = {} // userId -> socketId
const socketUserMap = {} // socketId -> userId

function addUserSocket (userId, socketId) {
  userSocketMap[userId] = socketId
  socketUserMap[socketId] = userId
}

function removeUserSocket (socketId) {
  const userId = socketUserMap[socketId]
  if (userId) {
    delete userSocketMap[userId]
    delete socketUserMap[socketId]
  }
}

function getSocketsByUserId (io, userId) {
  const nsp = io.of('/') // default namespace
  const roomName = String(userId) // normalize
  const room = nsp.adapter.rooms.get(roomName) // Set<socketId> | undefined
  if (!room) return []
  const get = [...room].map((sid) => nsp.sockets.get(sid)).filter(Boolean)
  const getId = get.map((s) => s.data.userId)
  return getId?.length > 0 ? Number(getId[0]) : ''
}

function getUserIdBySocketId (socketId) {
  return socketUserMap[socketId]
}

export default {
  addUserSocket,
  removeUserSocket,
  getSocketsByUserId,
  getUserIdBySocketId
}
