import React from 'react'
import jersey from '../../../Resources/images/jersey.jpg'
import Zoom from 'react-reveal/Zoom';


const PromotionAnimation = () => {

    return (
        <div className="promotion_animation">
            <Zoom>
                <div className="left">
                    <span>Win A</span>
                    <span>Jersey </span>
                </div>
                <div className="right">
                    <div style={{ background: `url(${jersey})` }}  >
                    </div>
                </div>

            </Zoom>

        </div>
    )
}
    
export default PromotionAnimation