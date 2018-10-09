import React from 'react';
import Animate from 'react-move/Animate';
import { easePolyOut } from 'd3-ease';


const Strips = (props) => {

    const strips = [{
        background: '#98c5e9',
        x: 120,
        y: -230,
        rotate : 30,
        delay:0

    },
    {
        background: '#fff',
        x: 356,
        y: -460,
        rotate :30,
        delay:200
    },
    {
        background: '#98c5e9',
        x: 592,
        y: -600,
        rotate :30,
        delay:400
    }]

    return (

        <div className="featured_stripes">


            {strips.map((strip, i) => {
                return (
                    <Animate
                        key={i}
                        show={true}
                        start={{
                            background: '#fff',
                            opacity: 0,
                            rotate: 0,
                            x: 0,
                            y:0
                        }}

                        enter={{
                            background: [strip.background],
                            opacity: [1],
                            rotate: [strip.rotate],
                            x: [strip.x],
                            y:[strip.y],
                            timing: { duration: 500, ease: easePolyOut ,delay :[strip.delay    ]},
                        }}

                    >
                        {( {opacity, rotate, x, y, background} ) => {
                            return (

                                <div className="stripe"
                                    style={
                                        {
                                            background,
                                            opacity,
                                            transform: `rotate(${rotate}deg)  translate(${x}px,${y}px)`
                                        }
                                    }
                                > </div>
                            )
                        }}
                    </Animate>
                )

            })}

        </div>


    )
}

export default Strips;