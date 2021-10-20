import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
// import { choseCategory } from "../redux/actions"
import { Link } from "react-router-dom"
 


export const Categories = () => {

    const dispatch = useDispatch()
    const [categories, setCategories] = useState([])
    // const [chosen, setChosen] = useState(false)
    // const [selectedCategories, setSelectedCategories] = useState([])
    const url = 'https://opentdb.com/api_category.php'
    const chosenValues = useSelector(state => state.setup)
    // const buildFetchURL

    useEffect(() => {
        axios.get(url)
            .then(res => setCategories(res.data.trivia_categories))
            .catch(err => console.log(err))
    },[])

    // const refSelectedCategories = useRef(selectedCategories)
    // const setLength = x => {
    //     refSele.current = x
    //     setSelectedCategories(x)
    // }

    // sort categories by default
    let sortedCategories = categories.sort((a,b) => {
            if (a.name < b.name) {
                return -1
            }
            if (a.name > b.name) {
                return 1
            }
            return a
        }
    )

    // now amount is not updating when subtracting category but otherwise working fine
    // const handleSelect = event => {
    //     if (selectedCategories.includes(event.target.value)){
    //         console.log("I should be removing an item from array", selectedCategories)
    //         let removeCategory = selectedCategories
    //         let removeThis = removeCategory.indexOf(event.target.value)
    //         removeCategory.splice(removeThis,1)
    //         setSelectedCategories(removeCategory)
    //         console.log(selectedCategories)
    //         return
    //     }
    //     setSelectedCategories([...selectedCategories,event.target.value])
    //     console.log(selectedCategories)
    //     return 
    // }

    // let showSelectedCategoryAmount = selectedCategories.length

    const chooseCategory = id => {
        // console.log(id)
        dispatch({type:'triviaSetup/choseCategory', payload:id})
        // setChosen(true)
    }

    const renderCategories =
        sortedCategories.map(c => {
            if (c.id === chosenValues.category) return (
                <div className="category-item chosen" key={c.id} id={c.id} onClick={() => chooseCategory(c.id)}>
                {/* <input type="checkbox" value={c.name} className="category-checkbox" onChange={handleSelect} />  */}
                <span> {c.name}</span>
            </div>
            )
            return (<div className="category-item" key={c.id} id={c.id} onClick={() => chooseCategory(c.id)}>
                {/* <input type="checkbox" value={c.name} className="category-checkbox" onChange={handleSelect} />  */}
                <span> {c.name}</span>
            </div>)
        })
    
    // const seeCategories = () => {
    //     console.log(chosenValues)
    // }

    return (<section>
        <div className="controls">
            {/* <div>{showSelectedCategoryAmount} categories selected</div> */}
            <Link to="/quest"><button>Start game!</button></Link>
            {/* <button onClick={seeCategories}>Check</button> */}
        </div>
        <div className="category-list">
            {renderCategories}
        </div>
    </section>)
}