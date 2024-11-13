import React, { useEffect, useState } from "react";
import FundList from "../fund-list/FundList";
import Loader from "../loader/Loader";
import SearchIcon from "../images/search.png";
import CloseIcon from "../images/close.png";
import Nodata from "../nodata/Nodata";

const Main = () => {
  const [title, setTitle] = useState<string>("Mutual Funds List");
  const [listdata, setListdata] = useState<any>();
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const [searchText, setSearchText] = useState<any>();
  const [mainListData, setMainListData] = useState<any>();

  const getListData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.mfapi.in/mf", {
        method: "GET",
      });
      const jsonlistdata = await response.json();
      setListdata(jsonlistdata);
      setMainListData(jsonlistdata);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getListData();
  }, []);

  useEffect(() => {
    console.log(listdata, "listdata");
  }, [listdata]);

  const onSearchClick = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    console.log(searchText, "searchText");
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
    <div className="min-w-full p-3">
      <div className="flex justify-center align-middle">
        <h2 className="p-5 text-4xl"> {title} </h2>
      </div>
      <hr></hr>
      <div className="flex items-center my-8 ml-3">
        <div className="relative flex items-center w-1/3">
          <input
            type="text"
            placeholder="Search"
            className="p-2 pl-3 pr-5 border-gray-500 border rounded rounded-r-none text-sm flex-1"
            value={searchText}
            onChange={(e: any) => setSearchText(e?.target?.value)}
          />
          <div className="absolute top-2 right-1 bg-no-repeat">
            <img
              src={CloseIcon}
              alt="close-icon"
              width={18}
              className="p-1 cursor-pointer"
              onClick={() => {
                setSearchText("");
                setListdata(mainListData);
              }}
            />
          </div>
        </div>
        <button
          onClick={(e) => onSearchClick(e)}
          className="border-gray-500 border rounded p-2 rounded-l-none border-l-0"
        >
          <img src={SearchIcon} alt="search-icon" width={20} />
        </button>
      </div>
      <div>
        {loading && listdata?.length == 0 ? <Loader /> : <FundList data={listdata} />}
      </div>
      {!loading && listdata?.length == 0 && <Nodata />}
    </div>
  );
};

export default Main;
