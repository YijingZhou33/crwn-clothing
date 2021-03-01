import React from "react";
import { withRouter } from "react-router-dom";

import CollectionItem from "../collection-item/collection-item.component";

import "./collection-preview.styles.scss";

/* 
    Performance concern:
      all anonymous functions inside of any component
      gets called again and re-rendered 
      whenever component gets re-rendered.

    instead of spreading the props of item, 
    we need to pass in the whole item

*/

const CollectionPreview = ({ title, items, history, match, routeName }) => (
  <div className='collection-preview'>
    <h1
      className='title'
      onClick={() => history.push(`${match.path}/${routeName}`)}>
      {title.toUpperCase()}
    </h1>
    <div className='preview'>
      {
        /* {items
        .filter((item, index) => index < 4)
        .map(({ id, ...otherItemProps }) => (
          <CollectionItem key={id} {...otherItemProps} />
        ))} */
        items
          .filter((item, index) => index < 4)
          .map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))
      }
    </div>
  </div>
);

export default withRouter(CollectionPreview);
