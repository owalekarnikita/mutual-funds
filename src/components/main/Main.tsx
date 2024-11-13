import React, { useEffect, useState } from "react";
import "./main.css";
import FundList from "../fund-list/FundList";
import Loader from "../loader/Loader";

const Main = () => {
  const [title, setTitle] = useState<string>("");
  const [listdata, setListdata] = useState<any>();
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const [searchText, setSearchText] = useState<any>();

  const getListData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.mfapi.in/mf", {
        method: "GET",
      });
      const jsonlistdata = await response.json();
      setListdata(jsonlistdata);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getListData();
  }, []);

  useEffect(()=> {
    console.log(listdata,"listdata")
  },[listdata])

  const onSearchClick = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log(searchText,"searchText")
    if (searchText) {
      setListdata([]);
      try {
        const response = await fetch(
          `https://api.mfapi.in/mf/search?q=${searchText}`,
          {
            method: "GET",
          }
        );
        const jsonData = await response.json();
        setListdata(jsonData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center align-middle">
        <h2 className="p-5 text-3xl"> Mutual Funds Data {title} </h2>
      </div>

      <div>
        <input
          type="search"
          placeholder="Search"
          className="p-3 border-gray-500"
          value={searchText}
          onChange={(e: any) => setSearchText(e?.target?.value)}
        />
        <button onClick={(e) => onSearchClick(e)}>search</button>
      </div>
      <div>
        {loading && !listdata ? <Loader /> : <FundList data={listdata} />}
      </div>
    </div>
  );
};

export default Main;
