import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies';

export function useMovies ({ search, sort }){
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previousSearch = useRef(search)
    
    //Lo mismo que el useMemo pero para funciones
    const getMovies = useCallback(async ({ search }) => {
        if (search === previousSearch.current) return

        try{
            setLoading(true)
            setError(null)
            previousSearch.current = search
            const newMovies = await searchMovies({ search })
            setMovies(newMovies)
        }catch(error){
            setError(error.message)
        } finally{
            setLoading(false)
        }
    }, [])

    
    /* Para definir cuando ejecutar algunos calculos teniendo en cuenta algunas dependencias como en el useEffect */
    const sortedMovies = useMemo(()=>{
        return sort
        ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
        : movies
    }, [sort, movies])


    return { movies:sortedMovies, loading, getMovies }
  }