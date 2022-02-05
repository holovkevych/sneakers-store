// import React, { useState, useEffect } from "react"
// import slide1 from "../assets/img/nike1.jpeg"
// import slide2 from "../assets/img/nike2.jpg"
// import slide3 from "../assets/img/nike3.jpg"

// const img = [
//     <img key={slide1} src={slide1} className="slider--img" />,
//     <img key={slide2} src={slide2} className="slider--img" />,
//     <img key={slide3} src={slide3} className="slider--img" />,
// ]

// const Slider = () => {
// 	const [activeIndex, setActiveIndex] = useState(0);
	
//     const handleNext = () => {
//         if (activeIndex !== img.length-1) {
//             setActiveIndex(prev => prev + 1)            
//         } else {
//             setActiveIndex(prev => 0)            
//         }
//         console.log(activeIndex)
//     }

//     const handlePrev = () => {
//         if (activeIndex !== 0) {
//             setActiveIndex(prev => prev - 1)            
//         } else {
//             setActiveIndex(prev => img.length-1)            
//         }
//         console.log(activeIndex)
//     }

// 	// useEffect(() => {
// 	//   const interval = setInterval(() => {
// 	//     setActiveIndex((current) => {
//  //        const res = current === img.length - 1 ? 0 : current + 1
        
//  //        return res
//  //    })
// 	//     }, 10000)
	    
// 	//     return () => clearInterval()
// 	// }, [])
	 
// 	// const prevImgIndex = activeIndex ? activeIndex - 1 : img.length - 1
// 	// const nextImgIndex = activeIndex === img.length - 1 ? 0 : activeIndex + 1


// 	return (
//             <div className="slider mt-45">
//                 <button className="button--prev" onClick={handlePrev}>
//                     <span>&lt;</span>
//                 </button>
//                 <div> 
//                     {img[activeIndex]} 
//                 </div>
//                 <button className="button--next" onClick={handleNext}>
//                     <span>&gt;</span>
//                 </button>
//             </div>
//         )
// }

// export default Slider