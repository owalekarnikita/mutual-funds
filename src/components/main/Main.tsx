import React, { useEffect, useState } from "react";
import FundList from "../fund-list/FundList";
import Loader from "../loader/Loader";
import SearchIcon from "../images/search.png";
import CloseIcon from "../images/close.png";
import Nodata from "../nodata/Nodata";

const Main = () => {
  const [title, setTitle] = useState<string>("Mutual Funds List");
  const [listdata, setListdata] = useState<any>();
  const [loading, setLoading] = useState<boolean>();
  const [searchText, setSearchText] = useState<string>();
  const [mainListData, setMainListData] = useState<any>();
  const [sortValue, setSortValue] = useState<string>("schemeCode-asc");

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

  const handleSort = (sortValue: string) => {
    if (!sortValue) return;
    setSortValue(sortValue);
    const [key, direction] = sortValue.split("-");
    const sortedData = [...listdata].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    setListdata(sortedData);
  };

  const onSearchClose = (e: any) => {
    e.preventDefault();
    setSearchText("");
    setListdata(mainListData);
    setSortValue("schemeCode-asc");
  };

  return (
    <>
      {!loading ? (
        <div className="min-w-full p-3">
          <div className="flex justify-center align-middle">
            <h2 className="p-5 text-4xl font-bold"> {title} </h2>
          </div>
          <hr></hr>
          <div className="flex items-center justify-center sm:justify-between flex-col sm:flex-row align-middle">
            <div className="flex items-center my-8">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search"
                  className="p-2 pl-3 pr-5 border-gray-500 border rounded rounded-r-none text-sm"
                  value={searchText}
                  onChange={(e: any) => setSearchText(e?.target?.value)}
                  style={{ width: 250 }}
                />
                <div className="absolute top-2 right-1 bg-no-repeat">
                  <img
                    src={CloseIcon}
                    alt="close-icon"
                    width={18}
                    className="p-1 cursor-pointer"
                    onClick={(e) => {
                      onSearchClose(e);
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
            <div className="mb-4 sm:mb-0">
              <label htmlFor="sort" className="mr-2 font-semibold">
                Sort by :
              </label>
              <select
                id="sort"
                onChange={(e) => handleSort(e.target.value)}
                className="border border-gray-300 rounded p-1"
                value={sortValue}
              >
                <option value="schemeCode-asc">Scheme Code (Ascending)</option>
                <option value="schemeCode-desc">
                  Scheme Code (Descending)
                </option>
                <option value="schemeName-asc">Scheme Name (A-Z)</option>
                <option value="schemeName-desc">Scheme Name (Z-A)</option>
              </select>
            </div>
          </div>
          <div>{listdata?.length > 0 && <FundList data={listdata} />}</div>
          {!loading && listdata?.length == 0 && <Nodata />}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Main;
