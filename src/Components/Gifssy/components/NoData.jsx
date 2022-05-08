import { forwardRef, memo } from 'react'
import LottieAnimation from '../../LottieAnimation/LottieAnimation'
import NoDataLottie from '../../../images/noData.json'
import './NoData.css'

const NoData = ({searchedKeyword}, ref) => {
    return (
        <div ref = {ref && ref} style = {{height : 'fit-content', width : '100%', display : 'none'}}>
            <LottieAnimation
                lotti={NoDataLottie}
                width='100vw'
                height='fit-content'
                maxWidth = '45rem'
                wrapperStyle = {{
                    maxWidth : '100vw'
                }}
            />
            <br/>
            <div className='no-data__toast-div'>
                <span>No data found based on your query : <u>{searchedKeyword}</u></span>
            </div>
        </div>
    )
}

export default memo(forwardRef(NoData))