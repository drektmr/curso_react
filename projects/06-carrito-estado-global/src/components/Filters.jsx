import { useId, useState } from 'react';
import './Filters.css';
import { useFilters } from '../hooks/useFilters';

export function Filters(){
    const { filters, setFilters } = useFilters()
    
    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    const handleChangeMinPrice = (event) => {
        const newMinPrice = event.target.value
        setFilters(prevState => (
            {
                ...prevState,
                minPrice: newMinPrice
            }
        ))
    }

    const handleChangeCategory = (event) => {
        const newCategory = event.target.value
        setFilters(prevState => (
            {
                ...prevState,
                category: newCategory
            }
        ))
    }

    return (
        <section className='filters'>
            <div id='prices'>
                <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
                <input type='range' id={minPriceFilterId} min='0' max='1000' onChange={handleChangeMinPrice}/>
                <span>${filters.minPrice}</span>
            </div>
            <div id='categories'>
                <label htmlFor={categoryFilterId}>Categoria</label>
                <select id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value='all' defaultValue={filters.category === 'all'}>Todas</option>
                    <option value='laptops' defaultValue={filters.category === 'laptops'}>Portátiles</option>
                    <option value='smartphones' defaultValue={filters.category === 'smartphones'}>Móviles</option>
                </select>
            </div>
        </section>
    )
}