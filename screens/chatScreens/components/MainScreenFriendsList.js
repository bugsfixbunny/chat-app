import { Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { selectAllFriends, selectFriendsLoaded } from '../../../redux/friendsSlice';
import MainScreenSingleFriend from './MainScreenSingleFriend';

export default function MainScreenFriendsList() {

    const friendsLoaded = useSelector(selectFriendsLoaded);
    let friends = null;

    if(friendsLoaded) {
        friends = useSelector(state => selectAllFriends(state));
    }

    if(friends) return <FlatList 
                            initialNumToRender={20}
                            data={friends}
                            extraData={friends}
                            removeClippedSubview={true}
                            renderItem={({item}) => 
                                <MainScreenSingleFriend
                                    key={item.id}
                                    friend={item}
                                />
                            }
                        />
                    

    return (
        <Text>You have no friends?</Text>
    );
}
