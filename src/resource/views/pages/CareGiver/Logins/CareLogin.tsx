import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { languageTranslation } from '../../../../../helpers';
class LoginLogs extends Component {
  render() {
    return (
      <>
        <div className='login-section'>
          <div>
            <h5 className='content-title'>
              {languageTranslation('LOGIN_HISTORY')}
            </h5>
            <Table bordered hover responsive>
              <thead className='thead-bg'>
                <tr>
                  <th>{languageTranslation('S_NO')}</th>
                  <th>{languageTranslation('DATE')}</th>
                  <th>{languageTranslation('IP_ADDRESS')}</th>
                  <th>{languageTranslation('BROWSER')}</th>
                </tr>
              </thead>
              <tbody>
                <tr className='table-success'>
                  <td>1</td>
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                </tr>
                <tr className='table-success'>
                  <td>2</td>
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                </tr>

                <tr className='table-success'>
                  <td>3</td>
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                </tr>
                <tr className='table-danger'>
                  <td>4</td>
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                </tr>
                <tr className='table-success'>
                  <td>5</td>
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                </tr>
                <tr className='table-danger'>
                  <td>6</td>
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                </tr>
                <tr className='table-success'>
                  <td>7</td>
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                </tr>
                <tr className='table-success'>
                  <td>8</td>
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                </tr>
                <tr className='table-danger'>
                  <td>9</td>
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                </tr>
                <tr className='table-success'>
                  <td>10</td>
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                </tr>
                <tr className='table-success'>
                  <td>11</td>
                  <td>20.08.2019 12:08:20</td>
                  <td>94.138.88.227</td>
                  <td>Mozila/5.0 (Windows NT 10.0; Win64; X64; rv68.0)</td>
                </tr>
                <tr className='table-danger'>
                  <td>13</td>
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
  }
}
export default LoginLogs;
