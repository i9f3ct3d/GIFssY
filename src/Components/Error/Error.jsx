import { forwardRef, memo } from 'react'
import './Error.css'
import ErrorLottie from '../../images/errorLottie.json'
import LottieAnimation from '../LottieAnimation/LottieAnimation'

const Error = ({}, ref) => {
    return (
        <div ref = {ref} className='error__full-div'>
            <LottieAnimation
                className='error__lottie'
                lotti={ErrorLottie}
                width='100vw'
                height='fit-content'
                maxWidth='45rem'
                wrapperStyle={{
                    maxWidth: '100vw'
                }}
            />
            <br/>
            <div className='error__toast-div'>
                <span>Error ocurred. Please try again later !!</span>
            </div>
        </div>
    )
}

export default memo(forwardRef(Error))