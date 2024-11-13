import React from "react";
import LoaderGif from '../images/load-blue.gif'

const Loader = () => {
  return (
    <div className="flex justify-center p-5">
      <img src={LoaderGif} alt="image" width={150}/>
    </div>
  );
};

export default Loader;
