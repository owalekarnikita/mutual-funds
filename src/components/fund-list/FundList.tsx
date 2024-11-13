import React, { useEffect, useState } from "react";
import Details from "../details-page/Details";
import { useNavigate } from "react-router-dom";

const FundList = (data: any) => {
  const [listData, setListData] = useState<any>(data?.data);
  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();
  const totalPages = Math.ceil((listData?.length || 0) / itemsPerPage);

  const currentData = listData?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleViewMore = (code: number) => {
    navigate(`/details/${code}`);
  };

  useEffect(() => {
    setListData(data?.data);
  }, [data]);

  return (
    <>{currentData?.length > 0 && (
    <div>
      <div className="overflow-x-auto hidden sm:block">
        <table className="min-w-full bg-white mb-3 border table-auto p-2">
          <thead>
            <tr>
              <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-gray-600">
                Scheme Name
              </th>
              <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-gray-600">
                Scheme Code
              </th>
              <th className="py-3 px-4 border-b border-gray-200 bg-gray-50 text-left text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData?.map((fund: any, index: number) => (
              <tr key={index} className="text-gray-700 hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200 hover:text-blue-600">
                  {fund?.schemeName}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {fund?.schemeCode}
                </td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <button
                    onClick={() => handleViewMore(fund?.schemeCode)}
                    className="bg-blue-500 hover:bg-blue-500 text-white text-sm px-3 font-bold py-1  rounded"
                  >
                    View More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap justify-center gap-4 p-4 sm:hidden">
        {currentData?.map((fund: any, index: number) => (
          <div
            key={index}
            className="w-full sm:w-1/2  p-4 bg-white rounded-lg shadow-md border border-gray-200 "
          >
            <div className="text-lg font-semibold mb-2">{fund?.schemeName}</div>
            <div className="text-gray-600 mb-4">
              Scheme Code: {fund?.schemeCode}
            </div>
            <div>
              <button
                onClick={() => handleViewMore(fund?.schemeCode)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
              >
                View More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {currentData?.length > 0 && (
        <div className="flex justify-end items-center space-x-4 mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gray-200 rounded ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300"
            }`}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-gray-200 rounded ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
    )}
    </>
  );
};

export default FundList;
