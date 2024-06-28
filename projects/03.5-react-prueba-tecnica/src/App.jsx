import './App.css';
import { useCatImage } from './hooks/useCatImage.js';
import { useCatFact } from './hooks/useCatFact.js';

export function App(){
    const { fact, refreshFact } = useCatFact()
    const { imageUrl } = useCatImage({ fact })


    const handleClick = async () => {
        refreshFact()
    }
    
    return(
        <main>
            <button onClick={ handleClick }>Get new Fact</button>
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={`${imageUrl}`} alt={`Image extracted using the first three words of ${fact}`} />}
        </main>
    );
}