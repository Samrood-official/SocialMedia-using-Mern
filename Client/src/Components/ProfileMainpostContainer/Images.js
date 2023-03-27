import React from 'react'
import { useSelector } from 'react-redux'
import Card from '../smallComponants/Card'
const Images = () => {
  const posts = useSelector((state) => state.posts)

  return (

    <div>
      <Card>
        <div>
          <div className='flex gap-2 flex-wap'>
            {posts.map((post) => (
              <div className='h-32 w-60 mb-3'>
                <img src={post.image} alt='post' />
              </div>
            ))}

          </div>
        </div>

      </Card>
    </div>
  )
}

export default Images