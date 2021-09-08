import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

export const Categories = () => {
    const [categories, setCategories] = useState([])
    const [url, setUrl] = useState('https://opentdb.com/api_category.php')
    const [selectedCategories, setSelectedCategories] = useState([])

    useEffect(() => {
        axios.get(url)
            .then(res => {
                console.log(res.data)
                setCategories(res.data.trivia_categories)
                console.log(categories)
            })
            .catch(err => {
                console.log(err)
            })
    },[url, selectedCategories])

    // const refSelectedCategories = useRef(selectedCategories)
    // const setLength = x => {
    //     refSele.current = x
    //     setSelectedCategories(x)
    // }

    let sortedCategories = categories.sort((a,b) => {
            if (a.name < b.name) {
                return -1
            }
            if (a.name > b.name) {
                return 1
            }
        }
    )

    // now amount is not updating when subtracting category but otherwise working fine
    const handleSelect = event => {
        if (selectedCategories.includes(event.target.value)){
            console.log("I should be removing an item from array", selectedCategories)
            let removeCategory = selectedCategories
            let removeThis = removeCategory.indexOf(event.target.value)
            removeCategory.splice(removeThis,1)
            setSelectedCategories(removeCategory)
            console.log(selectedCategories)
            return
        }
        setSelectedCategories([...selectedCategories,event.target.value])
        console.log(selectedCategories)
        return 
    }

    let showSelectedCategoryAmount = selectedCategories.length

    const renderCategories =
        sortedCategories.map(c => {
            return (<div className="category-item" key={c.id}>
                <input type="checkbox" value={c.name} className="category-checkbox" onChange={handleSelect} /> 
                <span> {c.name}</span>
            </div>)
        })
    
    const seeCategories = () => {
        console.log(selectedCategories)
    }

    return (<section>
        <div className="controls flex-row space-evenly">
            <div>{showSelectedCategoryAmount} categories selected</div>
            <Link to="/quest"> <button>Start game!</button> </Link>
            <button onClick={seeCategories}>Check</button>
        </div>
        <div className="category-list">
            {renderCategories}
        </div>
    </section>)
}