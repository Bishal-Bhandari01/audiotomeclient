import React, { useEffect, useState } from "react";
import { getAudiobookByListen } from "../../environment/AudiobookService";

export default function DashTable() {
  const [tableData, setTableData] = useState([]);

  const GetDataByListen = async () => {
    const table = await getAudiobookByListen();
    const paginatedData = table.data;
    setTableData(paginatedData.response);
  };

  useEffect(() => {
    GetDataByListen();
    const timer = setInterval(() => GetDataByListen(), 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="card" style={{ border: "none" }}>
      <div className="card-body">
        <table className="table align-middle mb-0 bg-white table-hover">
          <thead className="bg-info text-light">
            <tr className="fw-bold">
              <th>S.N</th>
              <th>Title</th>
              <th>Author</th>
              <th>View</th>
              <th>Upload Date</th>
            </tr>
          </thead>
          <tbody>
            {tableData?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.abookName}</td>
                  <td>{item.abookAuthor}</td>
                  <td>{item.listen}</td>
                  <td>{item.auploadDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
