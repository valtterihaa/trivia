import axios from "axios"
import { useState, useEffect } from "react"

export const Categories = () => {
    const [categories, setCategories] = useState([])
    const [url, setUrl] = useState('https://opentdb.com/api_category.php')

    useEffect(() => {
        axios.get(url)
            .then(res => {
                console.log(res.data)
                setCategories(res.data.trivia_categories)
                res.data.trivia_categories.map(c => {
                    console.log(c)
                })
                console.log(categories)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    const renderCategories = 
        categories.map(c => {
            return (<div className="category-item" key={c.id}>
                {c.name}
            </div>)
        })
    

    return (<section>
        henlo this is categ's
        <div className="category-list">
            {renderCategories}
        </div>
    </section>)
}