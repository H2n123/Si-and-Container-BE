import React, { useState, useEffect } from 'react';
import SiService from '../services/si.service';
import ContainerService from '../services/container.service';
import { Card, Col, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';
import { json } from 'react-router-dom';

const SiList = () => {
  const [siList, setSiList] = useState([]);
  const [containerList, setContainerList] = useState([]);
  const [selectedSi, setSelectedSi] = useState(null);
  const [containerNo, setContainerNo] = useState('');
  const [sealNo, setSealNo] = useState('');
  const [editableSiId, setEditableSiId] = useState(null);
  const [eSiNo, setESiNo] = useState('');
  const [eSiBatch, setESiBatch] = useState('');
  const [eSiDate, setESiDate] = useState('');
  const [eNumContainer, setENumContainer] = useState('');
  const [eSiDestination, setESiDestination] = useState('');

  const [siNo, setSiNo] = useState('');
  const [siBatch, setSiBatch] = useState('');
  const [siDate, setSiDate] = useState('');
  const [numContainer, setNumContainer] = useState('');
  const [siDestination, setSiDestination] = useState('');
  const [editableContainerId, setEditableContainerId] = useState(null);
  const [isAddContainerDisabled, setIsAddContainerDisabled] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertClassName, setAlertClassName] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [maxSiNo, setMaxSiNo] = useState(0);

  useEffect(() => {
    // Fetch Si List
    SiService.getSiList()
      .then((response) => {
        setSiList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Si list:', error);
      });

    // Fetch Container List
    ContainerService.getContainerList()
    
      .then((response) => {
        setContainerList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching Container list:', error);
      });
    
    const handleShowAlert = () => {
      setShowAlert(true);
      // Close the alert after 5 seconds
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    };
  
    const handleCloseAlert = () => {
      setShowAlert(false);
    };

  }, []);

  const handleNewSi = () => {
    const token = JSON.parse(localStorage.getItem('user')).accessToken;
    if (!token) {alert('Authentication token not found.');return;}
    const headers = {'x-access-token': `${token}`,'Content-Type': 'application/json',};

    const siNo = document.getElementById("newSiNo").value
    const siDate = document.getElementById("newSiDate").value
    const siBatch = document.getElementById("newSiBatch").value
    const siDestination = document.getElementById("newSiDestination").value
    const numContainer = document.getElementById("newNumContainer").value


    const data = {
      siNo: siNo,
      siDate: siDate,
      siBatch: siBatch,
      numContainer: numContainer,
      siDestination: siDestination,
    };
    console.log(data);
    // Make the API request using si Service .
    SiService.createDataSi(data,  {headers} )
      .then((response) => {
        setAlertClassName('alert alert-success'); // Success alert class
        setAlertMessage(`Your Si ${siNo} data has been recorded`);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
        window.location.reload();
      })
    .catch((error) => {
      // Handle error
        console.error('Error creating new Si:', error.response.data);
        setAlertClassName('alert alert-danger'); // Danger alert class
        setAlertMessage(`Your Si failed to save! ${error.response.data.message}`);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      });
  };

  const handleSaveEditSi = async (siId) => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).accessToken;
      const headers = { 'x-access-token': token };
      const selectedSi = siList.find((si) => si.id === siId);
      setSelectedSi(selectedSi);
      
      const siNoElement = document.getElementById('siNo' + selectedSi.id);
      const siDateElement = document.getElementById('siDate' + selectedSi.id);
      const siBatchElement = document.getElementById('siBatch' + selectedSi.id);
      const numContainerElement = document.getElementById('numContainer' + selectedSi.id);
      const siDestinationElement = document.getElementById('siDestination' + selectedSi.id);
      const eSiNo =  siNoElement.value;
      const eSiBatch = siBatchElement.value;
      const eSiDate = siDateElement.value;
      const eSiDestination = siDestinationElement.value
      const eNumContainer = numContainerElement.value
      // setESiNo(siNoElement.value);
      // setESiBatch(siBatchElement.value);
      // setESiDate(siDateElement.value);
      // setESiDestination(siDestinationElement.value);
      // setENumContainer(numContainerElement.value);
      console.log(eSiNo)
      const editedSi = {
        // data properties
        siNo: eSiNo,
        newSiBatch: eSiBatch,
        newSiDate: eSiDate,
        newSiDestination: eSiDestination,
        newNumContainer: eNumContainer,
      };

      console.log(editedSi);
      // Use await here to wait for the asynchronous operation to complete
      const response = await SiService.updateDataSi(editedSi, { headers });
        console.log(response.data); 
        setAlertClassName('alert alert-success'); // Success alert class
        setAlertMessage(`Your Si ${siNo} data succesfully edited`);
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
        window.location.reload();
        setEditableSiId(null)     
      } catch (error) {
        console.error('Error updating Si:', error.response.data);
      // alert('Si failed to update:' + error.response.data);
      }
    ; // Disable editing after saving
  };

  const handleEditSi = (siId) => {
    // Toggle the button caption
    setEditableSiId(siId);
  };

  const getButtonCaption = (siId) => {
    return editableSiId === siId ? '✔' : '🖊';
  };

  const getButtonHandler = (siId) => {
    return editableSiId === siId
      ? () => {
          handleSaveEditSi(siId);
        }
      : () => {
          handleEditSi(siId);  
        }
  };

  const getButtonClassName = (siId) => {
    return editableSiId === siId ? 'btn btn-primary' : 'btn btn-warning';
  };

  const handleDeleteSi = (siId) => { 
    const token = JSON.parse(localStorage.getItem('user')).accessToken;
    if (!token) {
      alert('Authentication token not found.');
      return;
    }
    const headers = {
      'x-access-token': `${token}`,
      'Content-Type': 'application/json',
    };
    
    const data = { siNo : s}
    ContainerService.deleteContainer( data , {headers})
    console.log(`Delete Si with ID: ${siId}`);
  };

  const handleAddContainer = () => {
    if (!selectedSi || !containerNo || !sealNo) {
      alert('Please select a Si and enter Container No and Seal No.');
      return;
    }
    const token = JSON.parse(localStorage.getItem('user'));
    if (!token) {
      alert('Authentication token not found.');
      return;
    }
    const decodedToken = token.accessToken;
    if (!decodedToken) {
      alert('Invalid or expired authentication token.');
      return;
    }
    console.log(`Token: ${decodedToken}`);
    // Set up headers
    const headers = {
      'x-access-token': `${decodedToken}`,
    };
    
    // Set up container data
    const data = {
      siNo: selectedSi.siNo,
      // siId: selectedSi.id,
      containerNo: containerNo,
      sealNo: sealNo,
    };
    // console.log(data);
    // Make the API request using ContainerService
    ContainerService.addContainer(data, headers)
      .then((response) => {
        // Handle success 
        console.log(data)
        setShowAlert(true);
      })
      .catch((error) => {
        // Handle error
        console.error('Error adding Container:', error);
      });
  };

  const handleSaveEditContainer = (containerId) => {
    const token = JSON.parse(localStorage.getItem('user')).accessToken;
    if (!token) {
      alert('Authentication token not found.');
      return;
    }
    const headers = {
      'x-access-token': token,
      'Content-Type': 'application/json',
    };
    const newContainerNo = document.getElementById('containerNo'+containerId).value; 
    const newSealNo = document.getElementById('sealNo'+containerId).value;
    // const data = {siNo: selectedSi.siNo}
    ContainerService.getContainerList()
      .then((response) => {
        let arr = response.data.find((container)=> container.id === containerId && containerId === editableContainerId)  
        const containerNo = arr.containerNo;
        console.log(containerNo);
        const data = {
          siNo: selectedSi.siNo,
          containerNo: containerNo,
          newContainerNo: newContainerNo,
          newSealNo: newSealNo,
        };

        console.log(data);
        setEditableContainerId(null);
        ContainerService.updateContainer(data, {headers})
        .then((response) => {
          console.log(response.data);
        }).catch((error) => {
          console.log(error);
        })
      }
    ).catch((error) => {
        console.log(error)
      })
  };

  const handleEditContainer = (containerId) => {
    // Toggle the button caption
    setEditableContainerId(containerId);
  };
  
  const getButtonCaptionContainer = (containerId) => {
    return editableContainerId === containerId ? '✔' : '🖊';
  };
  
  const getButtonHandlerContainer = (containerId) => {
    return editableContainerId === containerId
      ? () => {
        setEditableContainerId(null)
          handleSaveEditContainer(containerId);
          
        }
      : () => handleEditContainer(containerId);
  };
  
  const getButtonClassNameContainer = (containerId) => {
    return editableContainerId === containerId ? 'btn btn-primary' : 'btn btn-warning';
  };
  

  const handleSiBatchChange = (e, siId) => {
    const inputValue = e.target.value;

    // Check if the input value is valid (1 or 2)
    if (inputValue === '1' || inputValue === '2') {
      //  necessary action if Ok bro
      // setSiBatch(e.target.value), I've put the setSiBatch handler inside onChange
    } else {
      // Optionally, provide feedback to the user about the invalid input
      e.target.value = siList.find((si) => si.id === siId).siBatch;
      alert(`Invalid siBatch value. Please enter 1 or 2.`);
      console.log('Invalid siBatch value. Please enter 1 or 2.');
    }
  };

  const handleSiNumContainerChange = (e, siId) => {
    const inputValue = parseInt(e.target.value,  10); // change string to integer
    // Check if the input value is valid (1 to 20)
    if (inputValue >= 1 && inputValue <= 20) {
      //  necessary action
      // setNumContainer(e.target.value) I've put this setstate to onchange , please see
    } else {
      // Optionally, provide feedback to the user about the invalid input
      // Also Validate in Back End Model,  pls see in Back End
      e.target.value = siList.find((si) => si.id === siId).numContainer;
      alert(`Invalid numContainer value. Please enter between 1 and 20.`);
      console.log('Invalid numContainer value. Please between 1 and 20.');
    }
  };

  const handleViewContainer = (siNo) => {
    // Find the selected Si based on siNo
    const selectedSi = siList.find((si) => si.siNo === siNo);
    setSelectedSi(selectedSi);

    // Fetch Container List for the selected Si
    ContainerService.getContainerList(selectedSi.id)
      .then((response) => {
        setContainerList(response.data);
        // Check if numContainer is equal to the number of containers
        const mapLength = response.data.filter((container) => 
        container.siId === selectedSi.id).length
        const isDisabled = selectedSi.numContainer === mapLength
        // console.log(selectedSi.numContainer)
        // console.log(mapLength)
        setIsAddContainerDisabled(isDisabled); // kalau numContainer === data Container length, maka ngunci 
      })
      .catch((error) => {
        console.error('Error fetching Container list:', error);
      });
    // setViewModalShow(true);
  };
    
    // const calculateMaxSiNo = () => {
    //   const nsortedSiList = siList.slice().sort((a, b) => b.siNo - a.siNo);
    //   const maxSiNo = nsortedSiList.length > 0 ? sortedSiList[0].siNo : 0;
    //   setMaxSiNo(maxSiNo);
    // };

    // calculateMaxSiNo();
    const sortedSiList = siList.slice().sort((a, b) => b.siNo - a.siNo);
    var maxiNo=0;
    if (sortedSiList.length > 0) {
      maxiNo = sortedSiList[0].siNo;
      maxiNo = parseInt(maxiNo) + 1
      console.log('next si: ' + maxiNo);
      // maxiNo = maxiNo.siNo + 1;
      // setMaxSiNo(maxiNo);
    } else {
      console.log('The sortedSiList array is empty.');
    }
  return (
    <div className="container-lg">
      <br></br><br></br>
      <h2>Shipping Instruction List</h2>
        <table className="table-info">
          <thead>
            <tr>
              <th>ID</th>
              <th>Si No</th>
              <th>Shipment Date</th>
              <th>Batch</th>
              <th>Container Qty</th>
              <th>Destination</th>
              <th>Action
                <button 
                  type="button" 
                  className="btn btn-primary"
                  style={{fontSize:"16px",margin:"5px"}}
                  data-bs-toggle="modal"
                  data-bs-target="#addSiDataModal"
                >+New Si</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedSiList.map((si) => (
              <tr key={si.id}>
                <td>{si.id}</td>
                <td>
                  
                  {editableSiId === si.id ? (
                    <input
                      id={"siNo" + si.id}
                      className="form-control"
                      type="text"
                      style={{ width: '63px' }}
                      value={si.siNo}
                      readOnly={true}
                      // onChange={(e) => setESiNo(si.siNo= e.target.value)}
                    />
                  ) : (
                    <span style={{ width: '63px' }}>{si.siNo}</span>
                  )}
                </td>
                <td>
                  {editableSiId === si.id ? (
                    <input
                      id={"siDate" + si.id}
                      className="form-control"
                      type="date"
                      style={{ width: '140px' }}
                      value={new Date(si.siDate).toISOString().split('T')[0]}
                      onChange={(e) => setESiDate(si.siDate = e.target.value)}
                      readOnly={false}
                    />
                  ) : (
                    <span style={{ width: '140px' }}>
                      {new Date(si.siDate).toLocaleDateString()}
                    </span>
                  )}
                </td>
                <td>
                  {editableSiId === si.id ? (
                    <input
                      id={"siBatch"+si.id}
                      className="form-control"
                      type="number"
                      style={{ width: '50px' }}
                      value={si.siBatch}
                      readOnly={false}
                      max={2}
                      min={1}
                      onChange={(e) => 
                        {
                          handleSiBatchChange(e, si.id);
                          setESiBatch(si.siBatch=e.target.value);
                        }
                      }
                    />
                  ) : (
                    <span style={{ width: '50px' }}>{si.siBatch}</span>
                  )}
                </td>
                <td>
                  {editableSiId === si.id ? (
                    <input
                      id={"numContainer"+si.id}
                      className="form-control"
                      type="number"
                      style={{ width: '70px' }}
                      value={si.numContainer}
                      readOnly={false}
                      max={20}
                      min={0} 
                      onChange=
                        {(e) => 
                          {
                            setENumContainer(si.numContainer=e.target.value);
                            handleSiNumContainerChange(e, si.id);
                          }
                        }
                    />
                  ) : (
                    <span type="date" style={{ width: '120px' }}>
                      {si.numContainer}
                    </span>
                  )}
                </td>
                <td>
                  {editableSiId === si.id ? (
                    <select 
                      id= {"siDestination" + si.id}
                      className='form-control'
                      value={si.siDestination} 
                      key={si.id} 
                      onChange=
                      {(e) => 
                        {
                          setESiDestination(si.siDestination = e.target.value);
                        }
                      }>
                        <option value="Nagoya">Nagoya</option>
                        <option value="Hakata">Hakata</option>
                        <option value="Sendai">Sendai</option>
                    </select>
                  ) : (
                    <span>{si.siDestination}</span>
                  )}
                </td>
                <td>
                  <button
                    // id={getButtonCaption(si.id) + si.id}
                    className={getButtonClassName(si.id)}
                    style={{fontSize:"14px",margin:"5px"}}
                    onClick= {getButtonHandler(si.id)}
                  >
                    {getButtonCaption(si.id) }
                  </button>
                  <button
                    id={"btnViewContainer"}
                    className="btn btn-primary"
                    style={{fontSize:"14px",margin:"5px"}}
                    data-bs-toggle="modal"
                    data-bs-target="#viewContainerModal"
                    onClick={() => {handleViewContainer(si.siNo)}}
                  >
                    view container
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      {/* Add Si data Modal */}
      <div className="modal fade" 
        id="addSiDataModal" 
        tabIndex="-1" 
        aria-labelledby="exampleModalLabel" 
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 
                className="modal-title" 
                id="exampleModalLabel"
              >Create New Si Data</h5>
              <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
            Si No:<input id= "newSiNo" className="form-control" type='text' // defaultValue={maxSiNo}
               onChange={(e) => setSiNo(siNo=e.target.value)}/>
            Si Date:<input id= "newSiDate" className="form-control" type='date'
              onChange={(e) => setSiDate(siDate=e.target.value)} />
            Si Batch:
              <br></br>
                <select id="newSiBatch" className="form-control" type="text" defaultValue=' '
                 onChange={(e) => setSiBatch(siBatch=e.target.value)}>
                  <option value=" "> </option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              <br></br>
            Si Destination:
              <br></br>
                <select id="newSiDestination" className="form-control" type="text" defaultValue=' '
                 onChange={(e) => setSiDestination(siDestination=e.target.value)}>
                  <option value=" "> </option>
                  <option value="Nagoya">Nagoya</option>
                  <option value="Hakata">Hakata</option>
                  <option value="Sendai">Sendai</option>
                </select>
              <br></br>
            Container Qty:<input 
              id="newNumContainer" 
              className="form-control" 
              min={1} max={20} type='number'
              onChange={(e) => setNumContainer(numContainer=e.target.value)}/> 
            </div>
            <div className="modal-footer">
              
              <button 
                type="button" 
                className="btn btn-secondary" 
                data-bs-dismiss="modal"
              >Close</button>
              <button 
                type="button" 
                className="btn btn-primary" 
                // data-bs-toggle="modal" 
                // data-bs-target="#addContainerModal"
                onClick={ ()=> 
                  {
                    handleNewSi();
                  }
                }
              >Save Si</button>
              <div>
                {showAlert && (
                <div className={alertClassName} role="alert">
                {alertMessage}  
              </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Add Container */}
      <div className="modal fade" 
        id="addContainerModal" 
        tabIndex="-2" 
        aria-labelledby="exampleModalLabel" 
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add Container</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div>
                <label htmlFor="siDropdown" className="form-label">Select Si:</label>
                <select 
                  id="siDropdown" 
                  className="form-select" 
                  aria-label="Select Si"
                  value={selectedSi ? selectedSi.id : ''}
                  onChange={(e) => 
                    setSelectedSi(siList.find(si => si.id === parseInt(e.target.value)))}
                >
                  {/* <option value="" disabled>Select Si</option> */}
                  {siList.map((si) => (
                    <option key={si.id} value={si.id} disabled={true}>{si.siNo}</option>
                  ))}
                </select>
              </div>
              <div className="mt-3">
                <label htmlFor="containerNoInput" className="form-label">Container No:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="containerNoInput" 
                  value={containerNo}
                  onChange={(e) => setContainerNo(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <label htmlFor="sealNoInput" className="form-label">Seal No:</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="sealNoInput" 
                  value={sealNo}
                  onChange={(e) => setSealNo(e.target.value)}
                />
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                data-bs-dismiss="modal"
              >Close</button>
              <button 
                type="button" 
                className="btn btn-primary" 
                data-bs-toggle="modal"
                data-bs-target="#viewContainerModal" //gak berhasil lurr karena reload, jadi modal window ilang
                data-bs-dismiss="modal"
                onClick={() => {handleAddContainer();
                  window.alert(`Container berhasil ditambahkan di Si ${siNo}`) 
                  window.location.reload();
                }}
              >Save and reload</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* modal for view container */}
      {selectedSi && (
      <div className="modal fade" 
        id="viewContainerModal" 
        tabIndex="-1" 
        aria-labelledby="exampleModalLabel" 
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 
                className="modal-title" 
                id="exampleModalLabel"
              >View Container Si No: {selectedSi.siNo}</h5>
              <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <table className='table-info'>
            <thead>
              <tr>
                <th>Container No</th>
                <th>Seal No</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {siList.map((si) => (
              containerList.filter((container) => 
              container.siId === selectedSi.id && 
              container.siId === si.id).map((container) => (
              <tr key={container.id}>
                <td>
                  {editableContainerId === container.id ? (
                    <input
                      id={"containerNo" + container.id}
                      style={{
                        width:"140px", 
                        fontSize:"13px", 
                        textAlign:"center"}}
                      className="form-control"
                      type="text"
                      value={container.containerNo}
                      readOnly={false}
                      onChange={(e) => {
                        setContainerNo(container.containerNo = e.target.value);
                        // handleContainerNoChange(e, container.id);
                      }}
                    />
                  ) : (
                    <span style={{
                      width:"140px", 
                      fontSize:"13px", 
                      textAlign:"center"
                      }}
                    >{container.containerNo}</span>
                  )}
                </td>
                <td >
                  {editableContainerId === container.id ? (
                    <input
                      id={"sealNo" + container.id}
                      style={{
                        width:"110px", 
                        fontSize:"13px", 
                        textAlign:"center"
                      }}
                      className="form-control"
                      type="text"
                      value={container.sealNo}
                      readOnly={false}
                      onChange={(e) => {
                        setSealNo(container.sealNo = e.target.value);
                        // handleSealNoChange(e, container.id);                        
                      }}
                    />
                  ) : (
                    <span style={{width:"140px", fontSize:"13px", textAlign:"center"}}>{container.sealNo}</span>
                  )}
                </td>
                <td>
                  <button
                    className={getButtonClassNameContainer(container.id)}
                    style={{fontSize:"10px"}}
                    onClick={getButtonHandlerContainer(container.id)}
                  >
                    {getButtonCaptionContainer(container.id)}
                  </button>
                  <button
                    id="btnDeleteContainer"
                    className="btn btn-danger"
                    style={{fontSize:"11px",margin:"5px"}}
                    // onClick={() => handledeleteco(si.id)}
                  >x</button>
                </td>
              </tr>))))}
            </tbody>
            </table>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                data-bs-dismiss="modal"
              >Close</button>
              <button 
                type="button" 
                className="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#addContainerModal"
                disabled={isAddContainerDisabled} // Disable the button if needed
                // onClick={() => handleAddContainer(si.id)}
              >Add Container</button>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default SiList;