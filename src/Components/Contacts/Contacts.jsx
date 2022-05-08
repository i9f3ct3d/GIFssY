import { memo } from 'react'
import './Contacts.css'
import { BsLinkedin, BsTwitter, BsGithub, BsFacebook } from 'react-icons/bs'

const Contacts = () => {
  return (
    <div className='contact__full-div'>
        <BsFacebook
            onClick = {() => {
                window.open('https://www.facebook.com/sushanta.saren.73/');
            }}
            className='contact__icons'
        />
        <div style = {{backgroundColor : 'green', margin : '5px 0', filter : 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.5))', width : 'calc(100% + 10px)' , transform : 'translateX(-5px)'}} className='underline'/>
        <BsGithub
            onClick = {() => {
                window.open('https://github.com/i9f3ct3d');
            }}
            className = 'contact__icons'
        />
        <div style = {{backgroundColor : 'green', margin : '5px 0', filter : 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.5))', width : 'calc(100% + 10px)' , transform : 'translateX(-5px)'}} className='underline'/>
        <BsLinkedin
            onClick = {() => {
                window.open('https://www.linkedin.com/in/sushanta-saren/');
            }}
            className = 'contact__icons'
        />
        <div style = {{backgroundColor : 'green', margin : '5px 0', filter : 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.5))', width : 'calc(100% + 10px)' , transform : 'translateX(-5px)'}} className='underline'/>
        <BsTwitter
            onClick = {() => {
                window.open('https://twitter.com/SushantaSaren7');
            }}
            className = 'contact__icons'
        />
    </div>
  )
}

export default memo(Contacts)