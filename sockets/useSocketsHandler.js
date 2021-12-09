import { useSelector, useDispatch } from 'react-redux';
import { selectValidToken } from '../redux/userSlice';
import { newMessageIncoming, socket } from '../redux/messagesSlice';
import { newMessageMine } from '../redux/friendsSlice';

export default function useSocketsHandler() {

    const userToken = useSelector(selectValidToken);
    const dispatch = useDispatch();

    const socketsEvents = async (event, data) => {
        if(event === 'private message'){
            sendMessageToFriend(data);
        }
        if(event === 'seen message'){
            seenFriendMessage(data);
        }
    }

    const sendMessageToFriend = async data => {
        const { message, friendId } = data;
        await socket.emit('private message', {data: {message, userToken, receiver_id: friendId}}, res => {
            dispatch(newMessageIncoming(res));
            dispatch(newMessageMine(res));
        });
    }

   const seenFriendMessage = async data => {
       await socket.emit('seen message', data);
   }

    return socketsEvents;
}