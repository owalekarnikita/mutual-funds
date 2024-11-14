import React, { useEffect, useState } from "react";
import FundList from "../fund-list/FundList";
import Loader from "../loader/Loader";
import SearchIcon from "../images/search.png";
import CloseIcon from "../images/close.png";
import Nodata from "../nodata/Nodata";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, setSortCriteria } from "../store/mutualFunds";

const Main = () => {
  const [title, setTitle] = useState<string>("Mutual Funds List");
  const [listdata, setListdata] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const searchQuery = useSelector(
    (state: any) => state.mutualFunds.searchQuery
  );
  const sortCriteria = useSelector(
    (state: any) => state.mutualFunds.sortCriteria
  );
  const [sortValue, setSortValue] = useState<string>(
    sortCriteria ? sortCriteria : "schemeCode-asc"
  );
  const dispatch = useDispatch();

  //show all mutual fund list api call
  const getListData = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api.mfapi.in/mf", {
        method: "GET",
      });
      const jsonlistdata = await response.json();
      setListdata(jsonlistdata);
    } catch (error) {
      setListdata([]);
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  //search list api call
  const onSearchClick = async () => {
    setLoading(true);
    if (searchText) {
      dispatch(setSearchQuery(searchText));
    } else if (searchQuery) {
      setSearchText(searchQuery);
    }
    if (searchText || searchQuery) {
      try {
        const response = await fetch(
          `https://api.mfapi.in/mf/search?q=${
            searchText ? searchText : searchQuery
          }`,
          {
            method: "GET",
          }
        );
        const jsonData = await response.json();
        setListdata(jsonData);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
    setLoading(false);
  };

  //sort list data filtering
  const handleSort = (sortValue: string) => {
    setLoading(true);
    if (sortValue) {
      setSortValue(sortValue);
      dispatch(setSortCriteria(sortValue));
    }
    console.log(sortValue, "sort value", sortCriteria);
    if (sortValue) {
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
      setLoading(false);
    }
  };

  //search delete
  const onSearchClose = (e: any) => {
    e.preventDefault();
    setSearchText("");
    setSortValue("schemeCode-asc");
    dispatch(setSearchQuery(""));
    getListData();
  };

  useEffect(() => {
    if (searchQuery == "") {
      getListData();
    }
  }, []);

  useEffect(() => {
    onSearchClick();
  }, [searchQuery]);

  return (
    <>
      {!loading ? (
        <div className="min-w-full p-3 pt-1 flex flex-col min-h-screen">
          <div className="sticky top-0 bg-white z-10 pt-5">
            <h2 className="text-4xl font-bold text-center pb-4"> {title} </h2>
            <hr className="border-gray-300 mt-4" />
          </div>

          <div className="flex-1 overflow-y-auto mt-4">
            <div className="flex items-center justify-center sm:justify-between flex-col sm:flex-row mb-6">
              <div className="flex items-center my-4">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Search"
                    className="p-2 pl-3 pr-5 border-gray-400 border rounded rounded-r-none text-sm"
                    value={searchText}
                    onChange={(e: any) => setSearchText(e?.target?.value)}
                    style={{ width: 250 }}
                  />
                  <div className="absolute top-2 right-1">
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
                  onClick={(e) => onSearchClick()}
                  className="border-gray-400 border rounded p-2 rounded-l-none border-l-0"
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
                  onChange={(e) => handleSort(e?.target?.value)}
                  className="border border-gray-400 rounded p-1"
                  value={sortValue}
                >
                  <option value="schemeCode-asc">
                    Scheme Code (Ascending)
                  </option>
                  <option value="schemeCode-desc">
                    Scheme Code (Descending)
                  </option>
                  <option value="schemeName-asc">Scheme Name (A-Z)</option>
                  <option value="schemeName-desc">Scheme Name (Z-A)</option>
                </select>
              </div>
            </div>

            <div>
              {listdata?.length > 0 ? <FundList data={listdata} /> : !loading && listdata?.length == 0 &&  <Nodata />}
            </div>
          </div>
        </div>
      ) : ( 
        <Loader />
      )}
    </>
  );
};

export default Main;
