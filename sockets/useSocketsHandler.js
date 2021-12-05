import { useSelector, useDispatch } from 'react-redux';
import { selectValidToken } from '../redux/userSlice';
import { socket } from '../redux/messagesSlice';


export default function useSocketsHandler() {

    const userToken = useSelector(selectValidToken);
    const dispatch = useDispatch();

    const socketsEvents = async (event, data) => {
        if(event === 'private message'){
            sendMessageToFriend(data);
        }
    }

    const sendMessageToFriend = async data => {
        const { message, friendId } = data;
        await socket.emit('private message', {data: {message, userToken, receiver_id: friendId}});
    }

    return socketsEvents;
}