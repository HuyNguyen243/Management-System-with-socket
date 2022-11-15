import { io } from "socket.io-client";
const URL = process.env.REACT_APP_API || process.env.REACT_APP_DEV_API

export const socket = io(URL);
