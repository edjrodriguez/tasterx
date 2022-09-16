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

  return (
    <section className='script-container'>
      <div className='script-top-container'>
        <img className='script-rx-logo' src={rxLogo} alt='rx logo' />
        <div className='show-name-link-container'>
          <p className='to-be-prescribed'>Show to be prescribed:</p>
          <p className='script-show-name'>{show.name}</p>
          {show.officialSite && <a href={show.officialSite} target='_blank'>Official TV show website</a>}
          {!show.officialSite && <a href={`https://www.google.com/search?q=${show.name}`} target='_blank'>{`Search google for ${show.name}`}</a>}
          <img className='script-show-poster' src={show.image} alt='show poster'/>
        </div>
      </div>
        <p className='script-message'>{prescription.message}</p>
    </section>
  );
}

export default Prescription;
