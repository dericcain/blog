import React from 'react';
import Spinner from 'react-spinkit';

const Loading = ({ isActive }) => isActive
  ? <Spinner name="pacman" color="goldenrod" />
  : null;

export default Loading;
