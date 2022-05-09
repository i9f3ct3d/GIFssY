import { memo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { BsLink45Deg } from 'react-icons/bs'
import "./GIFCards.css";

const colors = ["#9833FE", "#01FE99", "#FF6767", "#FFF35B"];

const GIFCards = ({ gif, showToast }) => {

    return (
        <div
            style={{
                borderColor: colors[Math.floor((Math.random() * 100) % 4)],
                background: `url(${gif.images.original_still.url}) no-repeat`,
            }}
            className="gif__div"
        >
            <div className="blurred__div"></div>
            <LazyLoadImage
                alt="gif"
                width="100%"
                className="images"
                src={gif.images.fixed_width.url}
                effect="blur"
            />
            <div className="gif-user__avatar-div">
                {gif.user && gif.user.avatar_url && <LazyLoadImage
                    onClick={() => {
                        window.open(gif.user.profile_url)
                    }}
                    className="avatar__image"
                    effect="blur"
                    src={gif.user.avatar_url}
                />}
                {gif.user && gif.user.username && <span onClick={() => {
                    window.open(gif.user.profile_url)
                }} className="gif-user__username">{gif.user.username}</span>}
            </div>
            <div className="gif-link__div">
                <BsLink45Deg onClick={async() => {
                    await navigator.clipboard.writeText(gif.images.original.url);
                    showToast && showToast('Copied to clipboard')
                }} className='gif-link__icon' />
            </div>
            <div className="hover-blurred__div" />
        </div>
    );
};

export default memo(GIFCards);
