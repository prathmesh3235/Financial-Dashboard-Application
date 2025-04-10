import React from 'react';
import whiteCardChipImg from '../images/whiteCardChip.png';
import blackCardChipImg from '../images/blackCardChip.png';

// Card brand logos
export const MastercardLogo = () => (
  <svg width="44" height="30" viewBox="0 0 44 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="15" fill="white" fillOpacity="0.5"/>
    <circle cx="29" cy="15" r="15" fill="white" fillOpacity="0.5"/>
  </svg>
);

export const VisaLogo = () => (
  <svg width="44" height="30" viewBox="0 0 44 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="15" cy="15" r="15" fill="#9199AF" fillOpacity="0.5"/>
    <circle cx="29" cy="15" r="15" fill="#9199AF" fillOpacity="0.5"/>
  </svg>
);

// Simplified implementation using img tags instead of SVG patterns
export const WhiteCardChip = () => (
  <img src={whiteCardChipImg} alt="Card chip" width="35" height="35" />
);

export const BlackCardChip = () => (
  <img src={blackCardChipImg} alt="Card chip" width="35" height="35" />
);