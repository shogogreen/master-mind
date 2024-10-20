import React from "react";

const ColorList = () => {
  const changeColor = (e) => {
    const index = e.target.selectedIndex;
    e.target.style.backgroundColor = e.target.options[index].style.backgroundColor;
    if (index % 2 === 0 && index !== 0) {
      e.target.style.color = 'white';
    } else {
      e.target.style.color = 'black';
    }
  };

  return (
    <select id='selector' onChange={changeColor}>
      <option style={{ backgroundColor: 'white', color: 'black' }}>指定なし</option>
      <option style={{ backgroundColor: 'red', color: 'black' }}>赤</option>
      <option style={{ backgroundColor: 'blue', color: 'white' }}>青</option>
      <option style={{ backgroundColor: 'yellow', color: 'black' }}>黄</option>
      <option style={{ backgroundColor: 'green', color: 'white' }}>緑</option>
      <option style={{ backgroundColor: 'white', color: 'black' }}>白</option>
      <option style={{ backgroundColor: 'black', color: 'white' }}>黒</option>
    </select>
  );
};

export default ColorList;