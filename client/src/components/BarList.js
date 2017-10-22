import React from 'react';
import BarListItem from './BarListItem';

const BarList = (props) =>
  <div className="row" >
   {props.barsToRender ?
     props.barsToRender.map((bar, index) => (
       <BarListItem key={bar.id} user={props.user} bar={bar} index={index} />
    ))
    : 'Loading'
    }
  </div>


export default BarList;
