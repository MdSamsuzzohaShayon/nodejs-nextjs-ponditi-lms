/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

function MakeStar(props) {
  // console.log(props.limit);

  const setStars = (see: React.SyntheticEvent, selectedStar: number)=>{
    if(props.setStars){
      props.setStars(see, selectedStar);
    }else{
      console.log("No event found");
    }
  }
  const makeStars = () => {
    const starList = [];
    for (let j = 0; j < 5; j += 1) {
      let starImg = '/icons/star-outline.svg';
      if (Number.isNaN(props.limit)) {
        starImg = '/icons/star-outline.svg';
      } else if (j + 1 > props.limit) {
        starImg = '/icons/star-outline.svg';
      } else {
        starImg = '/icons/star.svg';
      }
      const singleStar = (
        <li key={j} onClick={(sse) => setStars(sse, j + 1)} role="button" >
          <img width={20} src={starImg} alt="" />
        </li>
      );
      starList.push(singleStar);
    }
    return (
      <ul className="stars d-flex align-items-center justify-content-between list-unstyled w-fit">
        {starList}
      </ul>
    );
  };
  return <div className="stars">{makeStars()}</div>;
}

export default MakeStar;
