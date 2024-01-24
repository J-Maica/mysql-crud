import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function EmployeeTable() {
  const [dbDatas, setDbDatas] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [loading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      Axios.get("http://localhost:3001/read").then((res) => {
        setDbDatas(res.data);
        setSearchData(res.data); // Initialize search data
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteData = async (id) => {
    try {
      await Axios.delete(`http://localhost:3001/delete/${id}`).then((res) => {
        if (res.data) {
          setDbDatas((prevDbDatas) =>
            prevDbDatas.filter((data) => data.ID !== id)
          );
          setSearchData((prevFilteredDbDatas) =>
            prevFilteredDbDatas.filter((data) => data.ID !== id)
          );
        } else {
          console.log(res);
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateData = (data) => {
    navigate(`/update/${data.ID}`);
    console.log(data);
  };

  const addData = () => {
    navigate("/form");
  };

  const formatDate = (date) => {
    const dateHired = new Date(date);
    const formattedDate = dateHired.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    return formattedDate;
  };

  const search = () => {
    const filteredData = dbDatas.filter((data) =>
      Object.values(data).some((value) =>
        value.toString().toLowerCase().includes(searchVal.toLowerCase())
      )
    );
    setSearchData(filteredData);
    console.log(filteredData);
  };

  return (
    <div className="container mt-5">
      <h3>Employee List</h3>
      <div className="d-flex justify-content-between gap-4 my-4">
        <button className="btn btn-dark col-md-2" onClick={addData}>
          Add
        </button>
        <div className="d-flex gap-2 col-md-6">
          <input
            type="text"
            placeholder="Search"
            className="form-control"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <button className="btn btn-dark" onClick={search}>
            Search
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-striped table-bordered text-center">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Initial</th>
              <th scope="col">Last Name</th>
              <th scope="col">Position</th>
              <th scope="col">Department</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
              <th scope="col">Date Hired</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {searchData.map((data, key) => (
              <tr className="" key={key}>
                <td>{data.ID}</td>
                <td>{data.FirstName}</td>
                <td>{data.Initial}</td>
                <td>{data.LastName}</td>
                <td>{data.Position}</td>
                <td>{data.Department}</td>
                <td>{data.Email}</td>
                <td>{data.Contact}</td>
                <td>{formatDate(data.DateHired)}</td>
                <td>
                  <button
                    className="btn btn-warning me-2 mb-2 mb-lg-0"
                    onClick={() => updateData(data)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteData(data.ID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeTable;
