import React, {useState} from "react";
import {FaStar} from "react-icons/fa"


const StarRating = () => {


    const [rating, setRating] = useState([3])
    const [hover, setHover] = useState([3])

    
    return <div>
  
        {[...Array(5)].map((star, i) => {

            const ratingValue = i +1;

            return (
                

                <label>
                    <input 
                        //radio hidden:shows only stars
                        type="radio" hidden
                        precision={0.5}
                        name="rating" 
                        value={ratingValue} 
                        onClick={() => setRating(ratingValue)}
                        
                    />
                    <FaStar 
                        precision={0.5}
                        className="star" 
                        color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                        size={30}
                        name="half-rating" 
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                        />
 
                </label>
            )  
        })}
        {rating}/5

        
    </div>

}

export default StarRating;