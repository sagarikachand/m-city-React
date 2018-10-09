import React from 'react'
import Animate from 'react-move/Animate';
import { easePolyOut } from 'd3-ease';
import featured_player_img from '../../../../src/Resources/images/featured_player.png'


const Text = (props) => {


  const  renderNumber =() =>{
       return(
        <Animate
        
        show={true}
        start={{
             opacity: 0,
            rotate: 0,
          
        }}

        enter={{
           
            opacity: [1],
            rotate:[360],
            timing: { duration: 500, ease: easePolyOut },
        }} 
        >

         
         { ({ opacity,rotate }) =>{
             return <div className="featured_number" 
             style= {{ 
                 opacity , 
                 transform: `    translate(260px,170px) rotateY(${rotate}deg)   `
                }}> 
                3</div>
         }}
        </Animate>
        
       )
    }
    const  renderTextFirst =() =>{
        return(
         <Animate
         
         show={true}
         start={{
              opacity: 0,
              x: 550,
              y:450
           
         }}
 
         enter={{
            
             opacity: [1],
             x: [270],
             y:[450],
             timing: { duration: 500, ease: easePolyOut },
         }} 
         >
 
          
          { ({ opacity,rotate ,x,y}) =>{
              return <div className="featured_first" 
              style= {{ 
                  opacity,
                  transform: `translate(${x}px , ${y}px)`
                 }}> 
                 LEAGUE
                 </div>
          }}
         </Animate>
         
        )
     }

     const  renderTextSecond =() =>{
        return(
         <Animate
         
         show={true}
         start={{
              opacity: 0,
              x: 550,
              y:570
           
         }}
 
         enter={{
            
             opacity: [1],
             x: [270],
             y:[570],
             timing: { duration: 500, ease: easePolyOut,delay:300 },
         }} 
         >
 
          
          { ({ opacity,rotate ,x,y}) =>{
              return <div className="featured_second" 
              style= {{ 
                  opacity,
                  transform: `translate(${x}px , ${y}px)`
                 }}> 
                 Championships
                 </div>
          }}
         </Animate>
         
        )
     }

     const  renderPlayer =() =>{
        return(
         <Animate
         
         show={true}
         start={{
              opacity: 0,
              x: 550,
              y:120
           
         }}
 
         enter={{
            
             opacity: [1],
             x: [550],
             y:[120],
             timing: { duration: 500, ease: easePolyOut,delay:900 },
         }} 
         >
 
          
          { ({ opacity,rotate ,x,y}) =>{
              return <div className="featured_player" 
              style= {{ 
                  background: `url(${featured_player_img})`,
                transform: `translate(${x}px , ${y}px)`,
                  opacity
               
                 }}> 
                 
                 </div>
          }}
         </Animate>
         
        )
     }
//     The order of the below renders matters. The first one to be called will be the first element in the DOM. 
//Though the due to animation delay it may appear at the last.
    return (
        <div className="featured_text">
           {renderPlayer()}
           {renderNumber()}
           {renderTextFirst()}
           {renderTextSecond()}
           
          
          
        </div>

    )
}

export default Text;