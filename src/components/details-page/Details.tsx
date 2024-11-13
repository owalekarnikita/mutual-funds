import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import Chart from "./Chart";

const Details = () => {
  const [loading, setLoading] = useState<boolean>();
  const [fundData, setFundData] = useState<any>();
  const [schemeCode, setSchemeCode] = useState<number>(100027);

  const getfundDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.mfapi.in/mf/${schemeCode}`, {
        method: "GET",
      });
      const jsonlistdata = await response.json();
      setFundData(jsonlistdata);
      console.log(jsonlistdata?.meta, "details data");
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
    <div>
      Details
      <div>
        <Link to={"/home"}>
          <button>Back to home</button>
        </Link>
      </div>
      <div>
        {fundData && !loading ? (
          <div className="fund-data">
              <h1 className="text-3xl font-bold">{fundData?.meta?.scheme_name}</h1>
              <p className="text-2xl font-semibold">{fundData?.meta?.fund_house}</p>
              <p className="text-lg">Scheme Type: {fundData?.meta?.scheme_type}</p>
              <p className="text-lg">Scheme Category: {fundData?.meta?.scheme_category}</p>
              <p className="text-lg">Scheme Code: {fundData?.meta?.scheme_code}</p>

            {/* <section>
              <h2>Historical NAV Data</h2>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>NAV</th>
                  </tr>
                </thead>
                <tbody>
                  {fundData.data.map((entry: any, index: number) => (
                    <tr key={index}>
                      <td>{entry.date}</td>
                      <td>{entry.nav}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section> */}
            <Chart />
          </div>
        ) : (
            <Loader />
        )}
      </div>
    </div>
  );
};

export default Details;
