import React from 'react'
import Strips from './Strips'
import Text from './Text'


const Featured = (props) => {


    return (
        <div className="bck_blue"   >
            <div className="featured_wrapper">
              <Strips />
              <Text />
            </div>
        </div>

    )
}

export default Featured;