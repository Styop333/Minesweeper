import './nums.css';
import { useState } from 'react';

export default function Nums() {
    const [newGame, setNewGame] = useState(false)

    const nums = [
        2, 'i', 3, 'i', 1, '', 2, 'i',
        'i', 3, 'i', 2, '', 2, 'i', 2,
        2, '',  1, 1, 1, 'i', 3, '',
        'i', 1, 2, 'i', 1, 2, 'i', 2,
        2, 1, 'i', 3, '', 1, 2, 'i',
        'i', 1, 3, 'i', 2, 'i', 1, 2,
        1, 2, 'i', 2, '', 2, 1, 'i',
        '', 'i', 2, '', 1, 'i', 1, 1
    ];
    let interval = null;

    return (
        <>
            <div className="top">
                <div className="timer">0</div>
                <div className="counter">0</div>
            </div>
            <div className="nums">
                {nums.map(num => num === 'i' ? <img src="https://repository-images.githubusercontent.com/184993715/ae0d1e80-6f46-11e9-96b3-b7757a65a1c7" /> : <p>{num}</p>)}
            </div>
            <div className="buttons" onClick={e => {
                e.target.style.visibility = 'hidden'

                const timer = document.querySelector('.timer');
                clearInterval(interval)
                interval = setInterval(() => +timer.innerText++, 1000);

                const nums = document.querySelector(".nums").querySelectorAll("p");
                for (let i = 0;i < nums.length;i++) {
                    nums[i].innerText == '1' ? nums[i].style.color = 'blue' : nums[i].innerText == '2' ? nums[i].style.color = 'green' : nums[i].innerText == '3' ? nums[i].style.color = 'red' : nums[i].style.visibility = 'hidden'
                }

                const bombs = document.querySelectorAll("img");
                document.querySelector('.counter').innerText = bombs.length;
                for (let i = 0;i < bombs.length;i++) {
                    let bx = Math.round(bombs[i].getBoundingClientRect().x);
                    let by = Math.round(bombs[i].getBoundingClientRect().y);
                    let ex = Math.round(e.target.getBoundingClientRect().x);
                    let ey = Math.round(e.target.getBoundingClientRect().y);

                    if (bx === ex && ey === by) {
                        setTimeout(() => document.querySelector(".gameOver").style.display = 'flex', 1600)
                        clearInterval(interval)
                        setNewGame(!newGame)
                        document.querySelector('.nums').style.filter = 'blur(7px)'
                        e.target.parentNode.style.filter = 'blur(7px)'
                    }
                }

            }}>
                {nums.map(item => <button></button>)}
            </div>
            {newGame ? <div className="gameOver">
                <p>Game Over</p>
                <button onClick={e => {
                    window.location.reload()
                }}>New Game</button>
            </div> : setNewGame(!newGame)}
        </>
    ) 
}