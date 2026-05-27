import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { API_ORIGIN } from '../config/apiConfig';
let stompClient = null;
export const connectWebSocket = (userId, onMessageReceived) => {
    const socket = new SockJS(`${API_ORIGIN}/ws-pos`);
    stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 3000,
        onConnect: () => {
            console.log('Connected to WebSocket');
            
            // Đăng ký nhận tin nhắn
            stompClient.subscribe(`/topic/notifications/${userId}`, (message) => {
                onMessageReceived(message.body); // Gửi tín hiệu về cho Component xử lý
            });
        },
        onStompError: (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
        },
    });

    stompClient.activate();
};

export const disconnectWebSocket = () => {
    if (stompClient) {
        stompClient.deactivate();
        console.log('Disconnected WebSocket');
    }
};
