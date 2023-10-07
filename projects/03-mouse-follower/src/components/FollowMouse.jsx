import { useEffect, useState } from 'react';

export function FollowMouse(){
    const [enabled, setEnabled] = useState(false);
    const [position, setPosition] = useState({x: 0, y: 0});
    
    /**
     * 1. Agregar un evento de mousemove al window
     * 2. Actualizar el estado position con las coordenadas del mouse
     * 3. Remover el evento al desmontar el componente
     * 4. Usar el estado enabled para determinar si el evento se agrega o no
     * 5. Usar el estado position para actualizar la posición del div
     * 6. Usar el estado enabled para determinar si el div se muestra o no
     */
    useEffect(() =>{
        const handleMove = (event) =>{
        const {clientX, clientY} = event;
        setPosition({x: clientX, y: clientY});
        }
        if(enabled){
            window.addEventListener('mousemove', handleMove)
        }
        return () => {
            window.removeEventListener('mousemove', handleMove);
        }
    },[enabled])

    /**
     * 1. Agregar una clase al body del documento que oculte el cursor
     * 2. Remover la clase al desmontar el componente
     * 3. Usar el estado enabled para determinar si la clase se agrega o no
     */
    useEffect(() =>{
        document.body.classList.toggle('no-cursor', enabled)

        return () => document.body.classList.remove('no-cursor')
    },[enabled])
        return (
            <>
                <div style={{
                    position: 'absolute',
                    backgroundColor: 'rgba(0,0,0,.5)',
                    border: '1px solid #fff',
                    borderRadius: '50%',
                    opacity: 0.8,
                    pointerEvents: 'none',
                    width: 50,
                    height: 50,
                    left: -25,
                    top: -25,
                    transform: `translate(${position.x}px,${position.y}px)`,
                }}/>
                    <button onClick={()=>setEnabled(!enabled)}>
                        {enabled ? 'Desactivar' : 'Activar' } seguir puntero
                    </button>
            </>
        );
}