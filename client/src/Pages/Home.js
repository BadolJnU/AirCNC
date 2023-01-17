import React, { useEffect, useState } from 'react'
import SearchForm from '../Components/Form/SearchForm'
import { Link } from "react-router-dom";
import ExpCard from '../Components/Card/ExpCard'
const Home = () => {
  const [loading, setLoading] = useState(false)
  const [experience, setExperience] = useState([])
  useEffect(() => {
    fetch('expdata.json')
    .then(result=>result.json())
    .then(data=>setExperience(data))
  }, [])
  return (
    <div className='md:flex justify-center gap-10 px-6 md:px-10 lg:px-20'>
      <div className='mt-8'>
        <SearchForm/>
      </div>
      <div className='flex-1'>
        <div>Home Cards</div>
        <div>
          <div className='flex justify-between px-4'>
            <p className='text-xl font-bold'>Experiences</p>
            <Link to='/commingSoon'>See All</Link>
          </div>
          <div className='container pb-8 pt-4 mx-auto'>
            <div className='flex flex-wrap'>
              {
                experience.slice(0, 4).map((exp,i) => 
                  <ExpCard key={i} exp={exp} />
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
