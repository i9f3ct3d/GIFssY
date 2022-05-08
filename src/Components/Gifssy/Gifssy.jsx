import {
  forwardRef,
  memo,
  Suspense,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./Gifssy.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import { IoTrendingUpOutline } from 'react-icons/io5'
import { BiSearch } from 'react-icons/bi'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import NoData from "./components/NoData";
import Error from "../Error/Error";

const colors = ["#9833FE", "#01FE99", "#FF6767", "#FFF35B"];

const Gifssy = ({}, ref) => {
  const [data, setData] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true);

  const errorRef = useRef(null);
  const noDataRef = useRef(null);
  const loaderRef = useRef(null);
  const searchedKeyword = useRef("");

  const lastDataIndex = useRef(0);
  const limit = useRef(12);

  const lastDivRef = useRef(null);

  const hideNoDataDiv = () => {
    if (noDataRef && noDataRef.current) {
      noDataRef.current.style.display = 'none'
    }
  }
  const showNoDataDiv = () => {
    if (noDataRef && noDataRef.current) {
      noDataRef.current.style.display = 'block'
    }
  }

  const hideErrorDiv = () => {
    if (errorRef && errorRef.current) {
      errorRef.current.style.display = 'none'
    }
  }

  const showErrorDiv = () => {
    if (errorRef && errorRef.current) {
      errorRef.current.style.display = 'block'
    }
  }

  useImperativeHandle(ref, () => ({
    searchKeywordHandler: async (searchKeyword) => {
      searchKeyword = searchKeyword.trim();
      if (!searchKeyword) return;

      hideNoDataDiv();
      hideErrorDiv();
      setData([]);
      loaderRef.current.showLoader();
      searchedKeyword.current = searchKeyword;
      lastDataIndex.current = 0;


      try {
        const res = await axios({
          url: "https://api.giphy.com/v1/gifs/search",
          params: {
            api_key: process.env.REACT_APP_GIPHY_API,
            q: searchKeyword,
            limit: limit.current,
            offset: lastDataIndex.current,
          },
        });

        if (res.status === 200) {
          lastDataIndex.current += limit.current;
          if (lastDataIndex.current > 4999) {
            setHasMoreData(false);
          }
          if (!res.data.data.length) {
            showNoDataDiv();
          }

          setData([...res.data.data]);
          loaderRef.current.hideLoader();
        }
      } catch (error) {
        showErrorDiv()
      }
    },
    clearSearchValueHandler: async () => {
      hideNoDataDiv()
      hideErrorDiv();
      searchedKeyword.current = "";
      setData([]);
      loaderRef.current.showLoader();
      setHasMoreData(true);
      lastDataIndex.current = 0;
      fetch().then(() => {
        loaderRef.current.hideLoader();
      });
    },
  }));

  const fetch = async () => {
    try {
      const res = await axios({
        url: "https://api.giphy.com/v1/gifs/trending",
        params: {
          api_key: process.env.REACT_APP_GIPHY_API,
          limit: limit.current,
          offset: lastDataIndex.current,
        },
      });

      if (res.status === 200) {
        lastDataIndex.current += limit.current;
        if (lastDataIndex.current > 4999) {
          setHasMoreData(false);
        }
        setData((prev) => [...prev, ...res.data.data]);
      }
    } catch (error) {
      showErrorDiv();
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const fetchSearchKeywordData = async (keyword) => {
    try {
      const res = await axios({
        url: "https://api.giphy.com/v1/gifs/search",
        params: {
          api_key: process.env.REACT_APP_GIPHY_API,
          q: keyword,
          limit: limit.current,
          offset: lastDataIndex.current,
        },
      });

      if (res.status === 200) {
        lastDataIndex.current += limit.current;
        if (lastDataIndex.current > 4999) {
          setHasMoreData(false);
        }
        setData((prev) => [...prev, ...res.data.data]);
      }
    } catch (error) {
      showErrorDiv()
    }
  };

  const observer = new IntersectionObserver(([entry]) => {
    // if (entry.isIntersecting) {
    if (hasMoreData && searchedKeyword) {
      searchedKeyword.current.length
        ? fetchSearchKeywordData(searchedKeyword.current)
        : fetch();
    }
    // }
  });

  useEffect(() => {
    observer.observe(lastDivRef.current);
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* <div className="modal"/>
      <div className="no-data__lottie-div">
        <div className='no-data__toast-div'>
          <span>No data found based on your query of <u>adafagagag</u></span>
        </div>
        <LottieAnimation
          lotti = {NoDataLottie}
          height = '100%'
          width = 'fit-content'
        />
        <VscRefresh
          className = 'no-data__refresh-icon'
        />
        <IoIosClose className = 'no-data__div-closer'/>
      </div> */}
      <div className="type-of-gifs__div">
        {(searchedKeyword && searchedKeyword.current && searchedKeyword.current.length) ? <BiSearch
          style={{
            color: '#9833FE',
            fontSize: '2rem',
            transform: 'translateY(3px)'
          }}
        />
          :
          <IoTrendingUpOutline
            style={{
              color: '#9833FE',
              fontSize: '2rem',
              transform: 'translateY(3px)'
            }}
          />}
        <span className="type-of-gifs__text">{(searchedKeyword && searchedKeyword.current && searchedKeyword.current.length) ? `Searched for : ${searchedKeyword.current}` : 'Trending GIFs'}</span>
      </div>
      <Loader
        ref={loaderRef}
        style={{
          opacity: '0'
        }}
      />
      <NoData
        ref={noDataRef}
        searchedKeyword={(searchedKeyword && searchedKeyword.current.length) ? searchedKeyword.current : ''}
      />
      <Error
        ref={errorRef}
      />
      <div className="gifs__full-div">
        <Suspense fallback={<></>}>
          {data &&
            data.length > 0 &&
            data.map((e, index) => {
              return (
                <div
                  key={index}
                  style={{
                    borderColor: colors[Math.floor((Math.random() * 100) % 4)],
                    background: `url(${e.images.original_still.url}) no-repeat`,

                  }}
                  className="gif__div"
                >
                  <div className="blurred__div"></div>
                  <LazyLoadImage
                    alt="gif"
                    width='100%'
                    className="images"
                    src={e.images.fixed_width.url}
                    effect='blur'
                  />
                </div>
              );
            })}
        </Suspense>
      </div>
      {hasMoreData ?
        <div ref={lastDivRef} className="end-of-page__div">
          {(data && data.length) ? <Loader /> : <></>}
        </div>
        : (
          <span
            style={{
              color: "white",
              fontSize: "2rem",
              fontWeight: "900",
            }}
          >
            You're all caught up
          </span>
        )}
    </>
  );
};

export default memo(forwardRef(Gifssy));
