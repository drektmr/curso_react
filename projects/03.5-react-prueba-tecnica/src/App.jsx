import { useState, useEffect } from "react";

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'
export function App(){
    const catEndpoint = (word) => `https://cataas.com/cat/says/${word}?json=true&size=50&color=red`
    const [fact, setFact] = useState('gatitos')
    const [image, setImage] = useState('')
    
    useEffect(() => {
        fetch('https://catfact.ninja/fact')
        .then(response => response.json())
        .then(data => {
            setFact(data.fact)
        })
    }, [])
    
    useEffect(() => {
        const firstWord = fact.split(' ')[0].toLowerCase()
        const imgLink = catEndpoint(firstWord)
        console.log(imgLink)
        fetch(imgLink)
        .then(response => response.json())
        .then(data => {
            setImage(data.file)
        })
    }, [fact])

    return(
        <main>
            {fact && <p>{fact}</p>}
            {image && <img src={`${CAT_PREFIX_IMAGE_URL}/${image}`} alt={`Image extracted using the first word of the fact`} />}
        </main>
    );
}