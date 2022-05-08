import { lazy, Suspense, useEffect, useRef } from 'react';
import './App.css';
import Input from './Components/Input/Input';
import Logo from './Components/Logo/Logo';
import { BiSearch } from 'react-icons/bi'
import BackgroundAnimation from './Components/LottieAnimation/BackgroundAnimation';
import Loader from './Components/Loader/Loader';
import Contacts from './Components/Contacts/Contacts';
const Gifssy = lazy(() => import('./Components/Gifssy/Gifssy'))

function App() {

  const GifssyRef = useRef(null);
  const isWrapperDivChanged = useRef(false);
  const logoRef = useRef(null);
  const placeholderDivRef = useRef(null);

  const callSearchGifs = (keyWord) => {
    if (GifssyRef && GifssyRef.current && GifssyRef.current.searchKeywordHandler) {
      GifssyRef.current.searchKeywordHandler(keyWord);
    }
  }

  const onScrollHandler = () => {

    const ele = document.getElementsByClassName('logo-search__wrapper-div')[0];

    if(window.scrollY >= 150){
      if(!isWrapperDivChanged.current){
        isWrapperDivChanged.current = true;
        ele.classList.add('float__wrapper-div')
        placeholderDivRef.current.style.display = 'block'
        if(logoRef && logoRef.current && logoRef.current.disableReflection){
          logoRef.current.disableReflection();
        }
      }
    }else if(isWrapperDivChanged.current){
      isWrapperDivChanged.current = false;
      ele.classList.remove('float__wrapper-div');
      placeholderDivRef.current.style.display = 'none'
      if(logoRef && logoRef.current && logoRef.current.enableReflection){
        logoRef.current.enableReflection();
      }
    }
  }

  useEffect(() => {

    window.addEventListener('scroll',onScrollHandler)

    return () => {
      window.removeEventListener('scroll',onScrollHandler)
    }

  },[])

  return (
    <div className="App">
      <Contacts/>
      <BackgroundAnimation />
      <div ref = {placeholderDivRef} style = {{height : '309px', width : '100%', display : 'none'}} className='placeholder__div'/>
      <div className='logo-search__wrapper-div'>
        <div className='upper__div'>
          <Logo ref = {logoRef}/>
        </div>
        <div className='search__div'>
          <Input
            callSearchGifs={callSearchGifs}
            onInputValueChange={() => {
              if (GifssyRef && GifssyRef.current && GifssyRef.current.clearSearchValueHandler) {
                GifssyRef.current.clearSearchValueHandler();
              }
            }}
            icon={<BiSearch
              style={{
                fontSize: '2rem',
                color : 'white'
              }}
            />}
          />
        </div>
      </div>
      <Suspense fallback = {
      <div>
        <Loader/>
      </div>}>
        <Gifssy ref={GifssyRef} />
      </Suspense>
    </div>
  );
}

export default App;
