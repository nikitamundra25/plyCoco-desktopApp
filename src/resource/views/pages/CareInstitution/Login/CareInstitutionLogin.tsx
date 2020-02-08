import React, { FunctionComponent, useEffect } from "react";
import { Table } from "reactstrap";
import { languageTranslation } from "../../../../../helpers";
import { LoginHistoryQuery } from "../../../../../graphql/queries/LoginHistory";
import { useLazyQuery } from "@apollo/react-hooks";
import { useLocation } from "react-router-dom";
const [GET_LOGIN_HISTORY] = LoginHistoryQuery;

const Login: FunctionComponent = () => {
  const [fetchLoginList, { data, loading, refetch }] = useLazyQuery<any>(
    GET_LOGIN_HISTORY,
    {
      fetchPolicy: "no-cache"
    }
  );
  const path = useLocation();

  useEffect(() => {
    const queryPath = path.pathname;
    const res = queryPath.split("/");
    const id = parseInt(res[3]);
    fetchLoginList({
      variables: {
        userId: id ? id : ""
      }
    });
  }, []);

  return (
    <>
      <div className="login-section">
        <div>
          <h5 className="content-title">
            {languageTranslation("LOGIN_HISTORY")}
          </h5>
          <Table bordered hover responsive>
            <thead className="thead-bg">
              <tr>
                <th className={"sno-th-column text-center"}>
                  {languageTranslation("S_NO")}
                </th>
                <th className="date-th-column">
                  {languageTranslation("DATE")}
                </th>
                <th>{languageTranslation("IP_ADDRESS")}</th>
                <th>{languageTranslation("BROWSER")}</th>
              </tr>
            </thead>

            <tbody>
              <tr className="table-success">
                <td className={"sno-th-column text-center"}>1</td>
                <td>20.08.2019 12:08:20</td>
                <td>94.138.88.227</td>
                <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
              </tr>
              <tr className="table-success">
                <td className={"sno-th-column text-center"}>2</td>
                <td>20.08.2019 12:08:20</td>
                <td>94.138.88.227</td>
                <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
              </tr>

              <tr className="table-success">
                <td className={"sno-th-column text-center"}>3</td>
                <td>20.08.2019 12:08:20</td>
                <td>94.138.88.227</td>
                <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
              </tr>
              <tr className="table-danger">
                <td className={"sno-th-column text-center"}>4</td>
                <td>20.08.2019 12:08:20</td>
                <td>94.138.88.227</td>
                <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
              </tr>
              <tr className="table-success">
                <td className={"sno-th-column text-center"}>5</td>
                <td>20.08.2019 12:08:20</td>
                <td>94.138.88.227</td>
                <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
              </tr>
              <tr className="table-danger">
                <td className={"sno-th-column text-center"}>6</td>
                <td>20.08.2019 12:08:20</td>
                <td>94.138.88.227</td>
                <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
              </tr>
              <tr className="table-success">
                <td className={"sno-th-column text-center"}>7</td>
                <td>20.08.2019 12:08:20</td>
                <td>94.138.88.227</td>
                <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
              </tr>
              <tr className="table-success">
                <td className={"sno-th-column text-center"}>8</td>
                <td>20.08.2019 12:08:20</td>
                <td>94.138.88.227</td>
                <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
              </tr>
              <tr className="table-danger">
                <td className={"sno-th-column text-center"}>9</td>
                <td>20.08.2019 12:08:20</td>
                <td>94.138.88.227</td>
                <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
              </tr>
              <tr className="table-success">
                <td className={"sno-th-column text-center"}>10</td>
                <td>20.08.2019 12:08:20</td>
                <td>94.138.88.227</td>
                <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
              </tr>
              <tr className="table-success">
                <td className={"sno-th-column text-center"}>11</td>
                <td>20.08.2019 12:08:20</td>
                <td>94.138.88.227</td>
                <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
              </tr>
              <tr className="table-danger">
                <td className={"sno-th-column text-center"}>13</td>
                <td>20.08.2019 12:08:20</td>
                <td>94.138.88.227</td>
                <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Login;
