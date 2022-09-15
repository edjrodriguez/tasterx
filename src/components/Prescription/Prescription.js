import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Prescription.css';
import rxLogo from '../../assets/RX-logo.svg';
import { getShowById, getPrescription } from '../../api-calls/api-calls';

const Prescription = () => {
  const [show, setShow] = useState({});
  const [prescription, setPrescription] = useState('');
  const { id }  = useParams();

  useEffect(() => {
    getPrescription(id)
      .then(data => {
        setPrescription(data.prescription);
        getShowById(data.prescription.showID)
          .then(data => {
            const { name, officialSite, image } = data;
            setShow({
              name: name,
              officialSite: officialSite,
              image: image.medium
            })
          })    
          .catch(error => console.log(error));      
        })
        .catch(error => console.log(error));
  },[])

  console.log(prescription.message)
  return (
    <div className='script-container'>
      <div className='top-container'> 
        <div className='logo-and-prompt'>
          <img className='script-logo' src={rxLogo} alt='rx logo' />
          <p className='to-be-prescribed'>Show to be prescribed:</p>
        </div>
        <p className='script-show-name'>{show.name}</p>
        <a href={show.officialSite}>Official TV show website</a>
      </div>
        <img className='script-show-poster' src={show.image} alt='show poster'/>
      <div className='bottom-container'>
          <p>Write a message for the prescription:</p>
          <p>{prescription.message}</p>
    
      </div>
    </div>
  );
}

export default Prescription;