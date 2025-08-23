import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/privacy.css'
import Privacy from '../components/Privacy';
import Terms from '../components/Terms';
import Disclaimer from '../components/Disclaimer';

const Condition = () => {
  return (
    <>
        <Privacy/>
        <Terms/>
        <Disclaimer/>
    </>
  );
};

export default Condition;
