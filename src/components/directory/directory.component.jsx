import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectDirectorySections } from "../../redux/directory/directory.selectors";

import MenuItem from "../menu-item/menu-item.component";

import "./directory.styles.scss";

/* 
    Class componnet - Store state value to populate menu-item components
      sections(menu-item): an array of object - title, imageUrl

    Keep `section` in `this.state` --> Move into Redux store 
    because there're possibility to move these sections into 
    more than one component
*/
// class Directory extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       sections: [
//         {
//           title: "hats",
//           imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
//           id: 1,
//           linkUrl: "shop/hats",
//         },
//         {
//           title: "jackets",
//           imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
//           id: 2,
//           linkUrl: "shop/jackets",
//         },
//         {
//           title: "sneakers",
//           imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
//           id: 3,
//           linkUrl: "shop/sneakers",
//         },
//         {
//           title: "womens",
//           imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
//           size: "large",
//           id: 4,
//           linkUrl: "shop/womens",
//         },
//         {
//           title: "mens",
//           imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
//           size: "large",
//           id: 5,
//           linkUrl: "shop/mens",
//         },
//       ],
//     };
//   }

//   render() {
//     return (
//       <div className='directory-menu'>
//         {this.state.sections.map(({ id, ...otherSectionProps }) => (
//           <MenuItem key={id} {...otherSectionProps} />
//         ))}
//       </div>
//     );
//   }
// }

const Directory = ({ sections }) => (
  <div className='directory-menu'>
    {sections.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);
