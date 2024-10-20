import React from 'react';
import './App.css';
import ColorLists from './ColorLists';

const App = () => {
  const [answer, setAnswer] = React.useState([]);
  const [questionList, setQuestionList] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [isClear, setIsClear] = React.useState(false);

  const colors = ['赤', '青', '黄', '緑', '白', '黒'];

  const set = () => {
    const colorSet = document.querySelectorAll('#selector');
    const startButton = document.querySelector('#startButton');
    const decisionButton = document.querySelector('#decisionButton');
    let finalColorSet = [colorSet[0].value, colorSet[1].value, colorSet[2].value, colorSet[3].value];
    
    finalColorSet = finalColorSet.map((color) => {
      if (color === '指定なし') {
        const randomNumber = Math.floor(Math.random() * 6);
        return colors[randomNumber];
      } else {
        return color
      }
    });
    setAnswer([finalColorSet[0], finalColorSet[1], finalColorSet[2], finalColorSet[3]]);
    colorSet.forEach((color) => {
      color.selectedIndex = 0;
      color.style.backgroundColor = 'white'
      color.style.color = 'black';
    });
    startButton.style.display = 'none';
    decisionButton.style.display = 'inline-block';
  };

  const decision = () => {
    const colorSet = document.querySelectorAll('#selector');
    const decisionButton = document.querySelector('#decisionButton');
    const retryButton = document.querySelector('#retryButton');
    const finalColorSet = [colorSet[0].value, colorSet[1].value, colorSet[2].value, colorSet[3].value];
    let isClear = true;
    if (finalColorSet.find(color => color === '指定なし') !== undefined) {
      alert('色を指定してください。');
      return;
    }
    finalColorSet.forEach((color, index) => {
      if (answer[index] !== color) {
        isClear = false;
      }
    });
    if (isClear === true) {
      setIsClear(true);
      decisionButton.style.display = 'none';
      retryButton.style.display = 'inline-block';
    }
    const newQuestionList = [...questionList];
    newQuestionList.push(finalColorSet);
    setQuestionList(newQuestionList);
    setCount(count + 1);
  };

  const retry = () => {
    /* eslint-disable no-restricted-globals */
    location.reload();
    /* eslint-enable no-restricted-globals */
  };

  const questionListItems = questionList.map((question, i) => {
    const styleBackgroundColor = [];
    const styleColor = [];

    const questionCopy = [...question];
    const answerCopy = [...answer];
    const hint = {eat: 0, bite: 0};

    questionCopy.forEach((color, index) => {
      switch (color) {
        case '赤':
          styleBackgroundColor.push('red');
          styleColor.push('black');
          break;
        case '青':
          styleBackgroundColor.push('blue');
          styleColor.push('white');
          break;
        case '黄':
          styleBackgroundColor.push('yellow');
          styleColor.push('black');
        break;
        case '緑':
          styleBackgroundColor.push('green');
          styleColor.push('white');
        break;
        case '白':
          styleBackgroundColor.push('white');
          styleColor.push('black');
        break;
        case '黒':
          styleBackgroundColor.push('black');
          styleColor.push('white');
        break;
        default:
      }
      
      if (color === answerCopy[index]) {
        hint.eat++;
        questionCopy[index] = 0;
        answerCopy[index] = null;
      }
    });

    questionCopy.forEach((color) => {
      if (color !== 0) {
        answerCopy.forEach((answerColor, answerIndex) => {
          if (color === answerColor) {
            hint.bite++;
            color = 0;
            answerCopy[answerIndex] = null;
          }
        });
      }
    });

    if (isClear === true) {
      const clearComment = document.querySelector('#clear');
      clearComment.style.display = 'block';
    }


    return (
      <p key={i}>
        <span style={{ backgroundColor: styleBackgroundColor[0], color: styleColor[0] }}>{question[0]}</span>
        <span style={{ backgroundColor: styleBackgroundColor[1], color: styleColor[1] }}>{question[1]}</span>
        <span style={{ backgroundColor: styleBackgroundColor[2], color: styleColor[2] }}>{question[2]}</span>
        <span style={{ backgroundColor: styleBackgroundColor[3], color: styleColor[3] }}>{question[3]}</span>
        {`: ${hint.eat}eat ${hint.bite}bite`}
      </p>
    );
  });
  

  return (
    <div className="App">
      <header className="App-header">
        <h1>～マスターマインド（色ヌメロン）～</h1>
      </header>
      <p id='description'>
        並んだ4か所の色の種類と順番を当てるゲームです。<br/>
        色を指定せずにスタートボタンを押すと、その場所にはランダムに色が割り当てられます。1人で遊ぶ際は全て指定せずにスタートボタンを押しましょう。<br/>
        2人で遊ぶ際は、1人が相手に見られないように4か所の色を指定してからスタートボタンを押し、色を割り当てましょう。指定しなかった場所には色がランダムで割り当てられます。<br/>
        答える際は、4か所全てに色を割り当ててから、判定ボタンを押しましょう。<br/>
        &lt;正誤判定&gt;<br/>
        eat：色も場所も合っている<br/>
        bite：色は合っているが場所が間違っている
      </p>
      <h2 id='clear'>お見事！！{count}回で的中！</h2>
      <ColorLists />
      <button id='startButton' onClick={set}>スタート</button>
      <button id='decisionButton' onClick={decision}>判定</button>
      <button id='retryButton' onClick={retry}>リトライ</button>
      {questionListItems}
    </div>
  );
}

export default App;
