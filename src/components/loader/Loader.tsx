import React from "react";
import LoaderGif from '../images/load-blue.gif'

const Loader = () => {
  return (
    <div>
      <img src={LoaderGif} alt="image" width={80}/>
    </div>
  );
};

export default Loader;
