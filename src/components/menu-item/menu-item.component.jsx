import React from "react";

import "./menu-item.styles.scss";

/* 
    Destructure value of title from props
      {title} == props.title

    Style property takes an object that has props value == CSS
      style={{ backgroundImage: `url(${imageUrl})` }}
      - Dynamically make styles on the components 
      - JavaScript template string: `url${...}` 
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

    Also can pass in className using template string

    Transition
      - Create a <div> to hold the background image. 
      - The effect get bigger within the div when hovering over. 
      - But the size of content stays the same. 
*/

const MenuItem = ({ title, imageUrl, size }) => (
  <div className={`${size} menu-item`}>
    <div
      className='background-image'
      style={{ backgroundImage: `url(${imageUrl})` }}></div>
    <div className='content'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      <span className='subtitle'>SHOP NOW</span>
    </div>
  </div>
);

export default MenuItem;
