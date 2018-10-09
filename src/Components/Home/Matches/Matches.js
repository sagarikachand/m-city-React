import React from 'react'
import {Tag} from '../../ui/misc'
import Blocks from './Blocks';

const MatchesHome =(props) =>{


    return(
          <div className="home_matches_wrapper">
             <div className="container">
               <Tag 
                 color= '#fff'
                 size ="50px"
                 bck = '#0e1731'
               >
                Matches
               </Tag>
               <Blocks />
               <Tag 
                 color= '#0e1731'
                 size ="22px"
                 bck = '#fff'
                 link= {true}
                 linkto = '/matches'
               >
                See more matches
               </Tag>
             </div>
          </div>
    )


}

export default MatchesHome