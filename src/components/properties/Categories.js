import React from 'react'
import { Link } from 'react-router-dom'
import { CategoriesStyles } from '../../styles/PropertiesStyles'

const Categories = () => {
   const categoriesArr = [
      { name: 'Surfer', image: '/images/emoji-surfer.png' },
      { name: 'Restaurant', image: '/images/emoji-restaurant.png' },
      { name: 'Chillout', image: '/images/emoji-chillout.png' },
      { name: 'Bar', image: '/images/emoji-bar.png' },
      { name: 'Disco', image: '/images/emoji-disco.png' }
   ]

   const allCategories = categoriesArr.map((category, index) => (
      <div key={index}>
         <Link to={`/category/${category.name.toLowerCase()}`}>
            <img src={category.image} alt={category.name} />
            <p>{category.name}</p>
         </Link>
      </div>
   ))

   return <CategoriesStyles>{allCategories}</CategoriesStyles>
}

export default Categories
