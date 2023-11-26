import React, { Component } from 'react';
import Navber from '../Navber/Navber';
import { MDBContainer } from 'mdbreact';

import './About.css';
import Homeimage from '../Homeimage';
import Footer from '../Footer';

class About extends Component {
    
    render() { 
        return ( 
            <div className = "bg-dark">
                <Navber/>
                <Homeimage/>
                <br/>
                
                <br/>
                
                <h1 className="head text-white" align="center"> About Us </h1>
                <br/>
                <br/>
    

            <MDBContainer>  
            <blockquote className="blockquote">
            <p className="text-white"> The Ahmadu Bello University Teaching Hospital (ABUTH) is located in a town known as Shika along Zaria-Sokoto road in Zaria, Giwa Local Government Area of Kaduna State, North West Nigeria.
                It is a tertiary and a referral hospital where cases beyond the primary and secondary health facilities are being referred for proper management. The Hospital is a teaching hospital where the training of student medical doctors, pharmacists, nurses and laboratory technologists, laboratory technicians, pharmacy technicians, radiographers, opticians etc. are taken place.
                The hospital houses professors in all areas of medicine and medical practices which include medicine, paediatrics, obstetrics and gynaecology, orthopaedics, oncology and radiotherapy, maxillofacial, ear, nose and throat, ophthalmology, surgery, dermatology, haematology etc. the whole clinical services and department are strongly complemented with a well-established pharmaceutical services department.
                The pharmaceutical services department promotes accessibility, availability and affordability to all the necessary drugs needed by all the clinical service areas/departments. The pharmaceutical service department is also involved in the clinical training of undergraduate and postgraduate pharmacy students.
                The Pharmacist preceptors are staffs of the pharmaceutical services department with varying degrees such as B. Pharm, M. Pharm, MPH, Pharm. D, Ph.D., M.sc etc.
            </p>
            </blockquote>

           
            </MDBContainer> 
            
            <br>
            
            
            </br>
            <Footer/>
        
            </div>
         );
    }
}
 
export default About;