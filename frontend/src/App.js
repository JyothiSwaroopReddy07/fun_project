import logo from './logo.svg';
import './App.css';
import React,{useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Bars } from 'react-loader-spinner';
import {Pagination} from 'react-bootstrap';

const Loader = () => {
  return (
    <div class="w-100 vh-100 d-flex flex-column align-items-center bg-white justify-content-center px-4">
        <Bars
        height="80"
        width="80"
        color="red"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
    </div>
  )
}

function App() {

  const page = useRef(1);
  const [totalPages, setTotalPages] = useState(0);
  const [category,setCategory] = useState('publishedAt');
  const [order, setOrder] = useState('desc');
  const [videos,setVideos] = useState(null);
  const [search,setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [count,setCount] = useState(0);

  const loadData = async(res) => {
    const p = Math.floor(res.count/10)+(res.count%10 > 0);
    setTotalPages(p)
    setVideos(res.results);
    setCount(res.count);
  }

  const formatCount = (count) => {
    if (count < 1000) {
      return count.toString();
    } else if (count < 1000000) {
      return (count / 1000).toFixed(1) + "K";
    } else {
      return (count / 1000000).toFixed(1) + "M";
    }
  };

  const fetchVideos = async() => {
    setLoading(true);
    try{
      const response = await axios.get(`http://localhost:8000/videos/?search=${search}`,{
        params: {
          order:order,
          category: category,
          page: page.current,
        }
      });
      await loadData(response.data.success);
    } catch(err) {
      console.log(err);
    }
    setLoading(false);
  }

  useEffect(()=> {
      fetchVideos();
  },[]);


  const handlePageClick = async(pageNumber) => {
    page.current=Number(pageNumber);
    await fetchVideos();
  };

  const handleNext = async() => {
    page.current = Number(page.current >= totalPages)?totalPages:page.current+1;
    await fetchVideos();
  };

  const handlePrevious = async() => {
    page.current = Number(page.current <= 1)?1: page.current-1;
    await fetchVideos();
  };

  const readable = (isoString) => {
    const readableDate = new Date(isoString).toLocaleDateString("en-US", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return readableDate;
  }

  return (
    <div className="App">
      <main role="main">
        <section class="jumbotron text-center">
          <div class="container">
            <h1 class="jumbotron-heading font-weight-bold">CeleryTube</h1>
            <p class="lead text-muted">Enjoy the Asynchronous search</p>
            <div class="input-group mb-2">
              <input type="text" class="form-control" aria-label="Username" placeholder="search" onChange={(e)=>{setSearch(e.target.value)}}/>
            </div>
            <p>
              <button type="submit" onClick={fetchVideos} class="btn btn-dark my-1">Search</button>
            </p>
          </div>
          <div class="container">
              <select class="form-select form-select-md m-2 fs-2 p-1" name="category" onChange={(e)=>{setCategory(e.target.value)}}>
                <option value="publishedAt" selected>Upload Date</option>
                <option value="likeCount">likes</option>
                <option value="favoriteCount">favorites</option>
                <option value="commentCount">comments</option>
                <option value="viewCount">views</option>
              </select>
              <select class="form-select form-select-md m-2 fs-2 p-1" name="order" onChange={(e)=>{setOrder(e.target.value)}}>
                <option value="desc" selected>Highest to Lowest</option>
                <option value="asc">Lowest to Highest</option>
              </select>
              <button onClick={fetchVideos} class="btn btn-success m-2 fs-2 p-1">Apply Filters</button>
          </div>
        </section>
        <div class="album py-2 bg-light">
          <div class="container">
            <div class="row">
              {loading && <Loader/>}
              { !loading && count === 0 && videos===null && <h3 class="text-center jumbotron-heading">No Videos Found !!!</h3>}
              { !loading && count>0 && videos!==null && 
                videos.map((video) =>(
                  <div class="col-md-4" >
                    <div class="card mb-4 shadow-sm">
                      <img class="bd-placeholder-img card-img-top" width="100%" height="225" src={video.thumbnail} preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"></img>
                      <div class="card-body">
                        <p class="card-text">{video.title}</p>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                          <small class="text-muted">
                              {readable(video.publishedAt)}
                          </small>
                          <small class="text-muted">
                              {video.duration>0?<p>{video.duration} mins</p>:<p>1 min</p>}
                          </small>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                          <small class="text-muted">
                              <b>Likes:</b> {formatCount(video.likeCount)}
                          </small>
                          <small class="text-muted">
                              <b>Views:</b> {formatCount(video.viewCount)}
                          </small>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mb-2">
                          <small class="text-muted">
                              <b>Comments:</b> {formatCount(video.commentCount)}
                          </small>
                          <small class="text-muted">
                              <b>favorites:</b> {formatCount(video.favoriteCount)}
                          </small>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                          <div class="btn-group">
                              <button type="button" class="btn btn-sm btn-danger"><a class="text-light" href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank">Watch</a></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>))
                  }
                </div>
              </div>
              {!loading && count>0 && totalPages>=1 && videos!==null &&
              <nav class="container">
                <div className="row min-vh-10">
                  <div className="col d-flex justify-content-center align-items-center">
         
                        <ul className="pagination">
                          <li className={`page-item ${page.current <= 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={handlePrevious}>
                              Previous
                            </button>
                          </li>
                          
                            {page.current-1>1 &&  <li
                              key={page.current - 1}
                              className="page-item"
                            >
                              <button className="page-link" onClick={() => handlePageClick(page.current - 1)}>
                                {page.current - 1}
                              </button>
                            </li>}

                            <li
                              key={page.current}
                              className="page-item active"
                            >
                              <button className="page-link" onClick={() => handlePageClick(page.current)}>
                                {page.current}
                              </button>
                            </li>
                            
                            {page.current+1 < totalPages &&  <li
                              key={page.current + 1}
                              className="page-item"
                            >
                              <button className="page-link" onClick={() => handlePageClick(page.current + 1)}>
                                {page.current + 1}
                              </button>
                            </li>}

                          
                          <li className={`page-item ${page.current === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={handleNext}>
                              Next
                            </button>
                          </li>
                        </ul>
                    </div>
                    </div>
              </nav>}
            </div>
        </main>
    </div>
  );
}

export default App;
