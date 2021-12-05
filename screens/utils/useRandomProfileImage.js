import { useState, useEffect } from 'react';

export default function useRandomProfileImage() {
    
    const [randomImage, setRandomImage] = useState('https://randomuser.me/api/portraits/women/63.jpg');

    useEffect(() => {
        const getProfileImage = async () => {
            const repsonse = await fetch('https://randomuser.me/api/');
            const json = await repsonse.json();
            const imageUrl = json.results[0].picture.large;
            setRandomImage(imageUrl);
        }
        getProfileImage();
    }, []);

    return randomImage;
}