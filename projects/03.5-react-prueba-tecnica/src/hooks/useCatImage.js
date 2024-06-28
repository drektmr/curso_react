import { useState, useEffect } from 'react'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com';

export function useCatImage( { fact } ) {
    const [imageUrl, setImageUrl] = useState()
    //Efecto para recuperar la imagen cuando tenemos el fact
    useEffect(() => {
        if (!fact) return

        const threeFirstWords = fact.split(' ',3).join(' ')

        const imgLink = `${CAT_PREFIX_IMAGE_URL}${threeFirstWords}?size=50&color=red&json=true`

        fetch(imgLink)
        .then(response => response.json())
        .then(data => {
            const { url } = data
            setImageUrl(url)
        })
        .catch(error => {
            console.log(CAT_PREFIX_IMAGE_URL)
            setImageUrl(CAT_PREFIX_IMAGE_URL)
        });
    }, [fact])

    return { imageUrl }

}