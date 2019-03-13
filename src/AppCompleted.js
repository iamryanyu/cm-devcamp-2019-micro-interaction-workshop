import React, { Component, useRef } from 'react';
import styled from 'styled-components';
import {TimelineLite, Power2} from 'gsap';
import axios from 'axios';

const StyledApp = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled.button`
  background: none;
  border: 5px solid transparent;
  font-size: 24px;
  position: relative;
  outline: none;
`;

const StyledSubmitButton = styled(StyledButton)`
  background-color: #232c57;
  border-color: #232c57;
  border-radius: 50px;
  color: #fff;
  padding: 20px 0;
  width: 250px;
  transition: width 0.5s cubic-bezier(0.86, 0, 0.07, 1);
`;

const StyledSpinner = styled.span`
  height: 78px;
  width: 78px;
  border-top: 5px solid #fff3eb;
  border-right: 5px solid #fff3eb;
  border-bottom: 5px solid #fff3eb;
  border-left: 5px solid #232c57;
  box-sizing: border-box;
  display: block;
  position: absolute;
  top: -5px;
  left: -5px;
  border-radius: 50%;
  animation: spinner 1.1s infinite linear;
  opacity: 0;
  z-index: -1;
  pointer-events: none;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

const StyledButtonText = styled.span`
  pointer-events: none;
`;

const Button = ({children}) => {
  const button = useRef(null);
  const buttonText = useRef(null);
  const spinner = useRef(null);

  const buttonTweenForward = new TimelineLite();
  const buttonTweenBackward = new TimelineLite();

  const handleSubmit = event => {
    event.preventDefault();

    const handleTweenBackward = status => {
      return buttonTweenBackward
        .to(spinner.current, 0.1, {
          opacity: 0,
          delay: 5,
        })
        .to(button.current, 0.3, {
          borderColor: status ? '#86ab50' : '#bd4146',
        })
        .to(button.current, 0.3, {
          width: button.current.offsetWidth,
          ease: Power2.easeOut,
        })
        .to(buttonText.current, 0.3, {
          opacity: 1,
          onComplete: () => {
            buttonText.current.innerHTML = status ? 'Successful!' : 'Error, submit again';
          }
        })
        .to(button.current, 0.3, {
          backgroundColor: status ? '#86ab50' : '#bd4146',
          onComplete: () => {
            !status && button.current.removeAttribute('disabled');
          }
        });
    }

    // document.querySelecotr('.class-name').style.width = '78px';
    // console.log(button);
    // button.current.style.width = '78px';
    buttonTweenForward
      .to(button.current, 0.3, {
        backgroundColor: 'transparent',
        onStart: () => {
          button.current.setAttribute('disabled', 'disabled');
        },
        onComplete: () => {
          buttonText.current.innerHTML = 'Submit';
        }
      })
      .to(buttonText.current, 0.3, {
        opacity: 0,
      })
      .to(button.current, 0.3, {
        width: '78px',
        ease: Power2.easeOut,
      }, '-=0.15')
      .to(button.current, 0.5, {
        borderColor: 'transparent',
      }, '+=0.3')
      .to(spinner.current, 0.5, {
        opacity: 1,
      }, '-=0.5');

    axios({
      method: 'POST',
      url: 'https://httpbin.org/post',
      data: {
        fname: 'Ryan',
      }
    }).then(response => {
      // display success message
      handleTweenBackward(1);
    }).catch(error => {
      // display error message
      handleTweenBackward(0);
    });
  };

  return (
    <StyledSubmitButton ref={button} onClick={handleSubmit}>
      <StyledSpinner ref={spinner} />
      <StyledButtonText ref={buttonText}>{children}</StyledButtonText>
    </StyledSubmitButton>
  );
};

class App extends Component {
  render() {
    return (
      <StyledApp>
        <Button>Submit</Button>
      </StyledApp>
    );
  }
}

export default App;
