import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../loader/Loader";
import Chart from "./Chart";
import BackIcon from "../images/back.png";

const Details = () => {
  const [loading, setLoading] = useState<boolean>();
  const [fundData, setFundData] = useState<any>();
  const [schemeCode, setSchemeCode] = useState<any>(useParams()?.schemeCode);

  const getfundDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.mfapi.in/mf/${schemeCode}`, {
        method: "GET",
      });
      const jsonlistdata = await response.json();
      setFundData(jsonlistdata);
      console.log(jsonlistdata, "details data");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getfundDetails();
  }, []);

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="flex justify-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800 pb-3">
          {fundData?.meta?.scheme_name}
        </h1>
      </div>
      <hr className="border-gray-300" />

      <div className="pt-6 pb-2 w-fit">
        <Link
          to="/home"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <img src={BackIcon} alt="back-icon" width={20} className="mr-2" />
          <span className="text-lg font-semibold">Back to home</span>
        </Link>
      </div>

      <div className="p-6 pt-3">
        {fundData && !loading ? (
          <div className="space-y-4 text-gray-700">
            {/* <h3 className="text-2xl font-semibold"> details </h3> */}
            <div className="">
              <p className="text-lg pb-3">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
              
              <p className="text-lg font-semibold">
                <span className="font-medium">Fund House :</span>{" "}
                {fundData?.meta?.fund_house}
              </p>
              <p className="text-lg">
                <span className="font-medium">Scheme Type :</span>{" "}
                {fundData?.meta?.scheme_type}
              </p>
              <p className="text-lg">
                <span className="font-medium">Scheme Category :</span>{" "}
                {fundData?.meta?.scheme_category}
              </p>
              <p className="text-lg">
                <span className="font-medium">Scheme Code :</span>{" "}
                <span className="text-blue-600 font-medium">
                  {fundData?.meta?.scheme_code}
                </span>
              </p>
            </div>
            <div className="mt-6 w-full">
              <Chart chartdata={fundData?.data} />
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-32">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
