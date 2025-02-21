import halfStar from "../assets/halfStar.png";
import fullStar from "../assets/fullStar.png";
import star from "../assets/star.png";
import profile from "../assets/account.png"
import { ReactNode } from "react";
import { useState,useEffect } from "react";
import { makeUnAuthorizedGetRequest } from "../services/unAuthorizedRequest";
import { makeAuthorizedPostRequest } from "../services/authorizedRequests";

function Review({productID,rating}:ratingProp) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<review[]|undefined>()
  const [reviewData, setReviewData] = useState({
    rating: 0,
    description: "",
  });

  const renderStars = (rating:number) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    const stars: ReactNode[] = [];

    // Add full star images
    for (let i = 0; i < fullStars; i++) {
      stars.push(<img key={`full-${i}`} src={fullStar} alt="Full Star" className="w-6 h-6" />);
    }

    // Add half star image if necessary
    if (halfStars > 0) {
      stars.push(<img key="half" src={halfStar} alt="Half Star" className="w-6 h-6" />);
    }

    // Add empty star images
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<img key={`empty-${i}`} src={star} alt="Empty Star" className="w-6 h-6" />);
    }

    return stars;
  };

  const fetchReviews=async(productID:number)=>{
    const response=await makeUnAuthorizedGetRequest(`/reviews/${productID}`)
    console.log(response);
    if(response?.data){
      setReviews(response.data);
    }
  }

  useEffect(()=>{
    fetchReviews(productID);
  },[productID]);

  const handleAddReview = async () => {
    try{
      const response=await makeAuthorizedPostRequest(`/reviews`,{productID,...reviewData})
      console.log(response)
      if(response?.data){
        alert(response.data.message);
        fetchReviews(productID);
      }
    }
    catch(error){
      console.log(error)
      alert(error);
    }
  }

  return (
    <div className='w-full'>
        <div className='border-b text-gray-500 w-4/5 mx-auto'></div>
        <div className={`w-full flex flex-col `}>
              <div className='text-2xl font-mono font-bold text-center p-4'>Ratings & Reviews</div>
              <div className="flex justify-between items-center px-10 py-6">
                <div className="flex gap-x-2">
                  {renderStars(rating)}
                </div>
                <div className="bg-blue-300 px-4 py-3 border hover:border-none rounded-lg hover:bg-blue-400 border-gray-400 shadow-lg cursor-pointer" onClick={() => setIsModalOpen(true)}>Rate Product</div>
              </div>
              {(reviews && reviews.length>0 )? reviews.map((review) => (
            <div key={review.reviewID} className="flex justify-between items-center py-4 shadow-lg p-6">
              <div className=" flex flex-col gap-y-4">
                <div className="flex items-center justify-center gap-x-2">
                  <div className="flex items-center justify-center gap-x-1 bg-blue-300 rounded-xl border border-gray-400  p-1 ">
                    <div className="text-lg font-medium">{review.rating}</div>
                    <img src={star} className="w-5 h-5 col-white"/>
                  </div>
                  <div className="flex">
                    <img src={profile} className="w-6 h-6"/>
                    <div>{review.name}</div>
                  </div>
                </div>
                <p>{review.description}</p>
              </div>
            </div>
          )):<div></div>}
        </div>
       
        {isModalOpen && (
        <div className="fixed inset-0  bg_color bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4">Add a Review</h2>
            <div className="flex">
              <input
                type="number"
                value={reviewData.rating}
                onChange={(e) =>
                  setReviewData({ ...reviewData, rating: Math.min(5, Math.max(0, parseInt(e.target.value))) })
                }
                className="w-full p-2 border rounded-md"
                placeholder="Rating (0-5)"
                min="0"
                max="5"
              />
            </div>
            <textarea
              value={reviewData.description}
              onChange={(e) => setReviewData({ ...reviewData, description: e.target.value })}
              className="w-full p-2 mt-4 border rounded-md"
              placeholder="Write your review here"
              rows={4}
            />
            <div className="flex justify-between mt-4">
             
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={()=>{
                  handleAddReview()}}
                className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Review
