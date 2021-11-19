import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
const About = () => {
    return (
        <div>
            <div className="text-center"><h2 className="text-capitalize">welcome to my website</h2></div>
            <div className=" my-5 d-flex justify-content-center" >
                <a type="button" href="https://www.facebook.com/adad.adasd.35110/" className="btn btn-outline-info" target="_blank">Facebook</a>

            </div>

            <a href="/dashboard"><BiArrowBack size={60} /></a>
        </div >
    )
}

export default About
