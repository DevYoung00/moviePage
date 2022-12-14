import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState,useEffect }from 'react';
import Rating from '@mui/material/Rating';
import {useNavigate,useLocation} from 'react-router-dom';
import { useCookies } from 'react-cookie'; // useCookies import
import axios from 'axios';


export default function MovieReviewAndStar({ isExist, setNotPatch, setIsExist, item }) {
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const [star, setStar] = useState(0)
    const [coment, setComent] = useState("")

  
    const handleInput = () => {
        setIsExist(true);
      }
  
      const handlePatch = () => {
        setNotPatch(true);
      }

    const InputReviewAndStar = () => {
      const headers = {
        'Content-Type' : 'application/json',
        'Authorization' : cookies.token ,
    }
        axios.post('http://localhost:9000/api/movies/starAndReview',{
            title : item.title,
            star: star,
            coment : coment 
            },{headers:headers}
            )
          .then((res) => {
            alert("별점과 리뷰가 추가 되었습니다.")
            setIsExist(true);
            console.log(res);
            window.location.reload();
          })
    
    }
    const patchReviewAndStar= () => {
      const headers = {
        'Content-Type' : 'application/json',
        'Authorization' : cookies.token ,
    }
        axios.patch('http://localhost:9000/api/movies/updateReview',{
            title : item.title,
            star: star,
            coment : coment 
            },{headers:headers}
            )
          .then((res) => {
            console.log(res)
            setNotPatch(true);
            alert("별점과 리뷰가 수정 되었습니다.")
            window.location.reload();
          })
    
    }
    const insertOrPatch = () => {
      if(isExist === false) {
        InputReviewAndStar()
      }
      else {
        patchReviewAndStar()
      }
    }


      return (
 
        <div className="movieReviewAndStar">
            <Form>
              <div className="ratingBox">
      <Form.Group className="mb-3" controlId="formBasicStar">
<div className="rateLabel">
        <Form.Label>별점</Form.Label>
        </div>
        <div className="ratestar">
        <Rating
        name="simple-controlled"
        value={star}
        onChange={e => setStar(e.target.value)} />
        </div>
      </Form.Group>
      </div>
      <Form.Group className="mb-3" controlId="formBasicReview">
        <Form.Label>리뷰</Form.Label>
        <Form.Control type="text" placeholder="한줄 리뷰를 작성해주세요!"
          value={coment}
          onChange={e => setComent(e.target.value)} />
      </Form.Group>
     
      <Button  
      variant="danger" type="submit" onClick={ () => {
        insertOrPatch()} }>
        완료
      </Button>
      
    </Form>
            </div>
      )

}