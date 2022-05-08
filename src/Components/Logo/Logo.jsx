import { forwardRef, memo, useEffect, useImperativeHandle, useRef } from 'react'
import LottieAnimation from '../LottieAnimation/LottieAnimation'
import LogoLottie from '../../images/logoLottie.json'
import './Logo.css'

const Logo = ({}, ref) => {

    const colors = ['#9833FE', '#01FE99', '#FF6767', '#FFF35B']

    useImperativeHandle(ref, () => ({
        disableReflection: () => {
            let allAlphabetsArray = document.querySelectorAll(".logo__alphabets");

            allAlphabetsArray.forEach(element => {
                element.classList.add('no-reflection');
            });
            

            let logoLottie = document.getElementById('logo-lottie__div');
            logoLottie.style.height = '60px';
            logoLottie.style.transform = 'translateY(18px)';

            document.getElementById('logo__full-div_id').classList.add('visibility-hidden__logo')
        },
        enableReflection: () => {
            let allAlphabetsArray = document.querySelectorAll(".logo__alphabets");
            
            allAlphabetsArray.forEach(element => {
                element.classList.remove('no-reflection');
            });
            
            let logoLottie = document.getElementById('logo-lottie__div');
            logoLottie.style.height = '87px';
            logoLottie.style.transform = 'translateY(22px)';

            document.getElementById('logo__full-div_id').classList.remove('visibility-hidden__logo')
        },
    }))

    useEffect(() => {

        const allAlphabets = document.querySelectorAll('.logo__alphabets');
        allAlphabets.forEach(element => {
            setTimeout(() => {
                element.classList.add('logo-div-text__onhover')
                element.style.opacity = 1;
                setTimeout(() => {
                    element.classList.remove('logo-div-text__onhover')
                }, 1000)
            }, element.id[element.id.length - 1] * 200)
        });

    }, [])

    const onHoverHandler = (e) => {
        if (![...e.target.classList].includes('logo-div-text__onhover')) {
            e.target.classList.add("logo-div-text__onhover");

            setTimeout(() => {
                e.target.classList.remove("logo-div-text__onhover");
            }, 1000)
        }

    }

    return (
        <div id = 'logo__full-div_id' className='logo__div'>
            <LottieAnimation
                lotti={LogoLottie}
                id = 'logo-lottie__div'
            />
            <span style={{
                color: colors[(Math.floor((Math.random() * 10) % 4))]
            }} onMouseEnter={onHoverHandler} key={1} className="logo__alphabets" id="alphabet_1">G</span>
            <span style={{
                color: colors[(Math.floor((Math.random() * 10) % 4))]
            }} onMouseEnter={onHoverHandler} key={2} className="logo__alphabets" id="alphabet_2">I</span>
            <span style={{
                color: colors[(Math.floor((Math.random() * 10) % 4))]
            }} onMouseEnter={onHoverHandler} key={3} className="logo__alphabets" id="alphabet_3">F</span>
            <span style={{
                color: colors[(Math.floor((Math.random() * 10) % 4))]
            }} onMouseEnter={onHoverHandler} key={4} className="logo__alphabets" id="alphabet_4">s</span>
            <span style={{
                color: colors[(Math.floor((Math.random() * 10) % 4))]
            }} onMouseEnter={onHoverHandler} key={5} className="logo__alphabets" id="alphabet_5">s</span>
            <span style={{
                color: colors[(Math.floor((Math.random() * 10) % 4))],
            }} onMouseEnter={onHoverHandler} key={6} className="logo__alphabets" id="alphabet_6">Y</span>
        </div>
    )
}

export default memo(forwardRef(Logo))