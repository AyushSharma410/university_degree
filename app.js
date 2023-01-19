// JavaScript for the interface

// Set up web3 and contract instance
import Web3 from 'web3';
const web3 = new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/6caa399caeb64f879661eec4f2555c7a")||("http://localhost:5501"));
const contract = new web3.eth.Contract([
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_fieldOfStudy",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_institution",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_yearAwarded",
				"type": "uint256"
			}
		],
		"name": "addDegree",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_degreeId",
				"type": "uint256"
			}
		],
		"name": "deleteDegree",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_degreeId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_fieldOfStudy",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_institution",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_yearAwarded",
				"type": "uint256"
			}
		],
		"name": "updateDegree",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "degreeCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "degrees",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "fieldOfStudy",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "institution",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "yearAwarded",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_degreeId",
				"type": "uint256"
			}
		],
		"name": "getDegree",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getNumDegrees",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nextId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
], "0xcD6a42782d230D7c13A74ddec5dD140e55499Df9");

// Set up event listeners for the buttons
document.getElementById("add-button").addEventListener("click", addDegree);
document.getElementById("update-button").addEventListener("click", updateDegree);
document.getElementById("delete-button").addEventListener("click", deleteDegree);

// Function to add a new degree
async function addDegree() {
  // Read the input fields
  const name = document.getElementById("degree-name").value;
  const fieldOfStudy = document.getElementById("degree-field-of-study").value;
  const institution = document.getElementById("degree-institution").value;
  const yearAwarded = document.getElementById("degree-year-awarded").value;

  // Call the addDegree function in the contract
  const result = await contract.methods.addDegree(name, fieldOfStudy, institution, yearAwarded).send({ from: "0xcD6a42782d230D7c13A74ddec5dD140e55499Df9" });

  // Update the UI
  getDegrees();
  clearInputs();
}

// Function to update an existing degree
async function updateDegree() {
  // Read the input fields
  const id = document.getElementById("degree-id").value;
  const name = document.getElementById("degree-name").value;
  const fieldOfStudy = document.getElementById("degree-field-of-study").value;
  const institution = document.getElementById("degree-institution").value;
  const yearAwarded = document.getElementById("degree-year-awarded").value;

  // Call the updateDegree function in the contract
  const result = await contract.methods.updateDegree(id, name, fieldOfStudy, institution, yearAwarded).send({ from: "0xcD6a42782d230D7c13A74ddec5dD140e55499Df9" });

  // Update the UI
  getDegrees();
  clearInputs();
}

// Function to delete an existing degree
async function deleteDegree() {
  // Read the input field
  const id = document.getElementById("degree-id").value;

  // Call the deleteDegree function in the contract
  const result = await contract.methods.deleteDegree(id).send({ from: "0xcD6a42782d230D7c13A74ddec5dD140e55499Df9"  });

  // Update the UI
  getDegrees();
  clearInputs();
}

// Function to retrieve all degree records and update the UI
async function getDegrees() {
  // Call the getAllDegrees function in the contract
  const result = await contract.methods.getAllDegrees().call();

  // Extract the data from the result
  const ids = result[0];
  const names = result[1];
  const fieldsOfStudy = result[2];
  const institutions = result[3];
  const yearsAwarded = result[4];

  // Clear the table
  const table = document.getElementById("degrees-table");
  table.innerHTML = "";

  // Add the table headings
  table.innerHTML = `
    <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Field of Study</th>
      <th>Institution</th>
      <th>Year Awarded</th>
      <th></th>
    </tr>
  `;

  // Add a row for each degree
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    const name = names[i];
    const fieldOfStudy = fieldsOfStudy[i];
    const institution = institutions[i];
    const yearAwarded = yearsAwarded[i];
    table.innerHTML += `
      <tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${fieldOfStudy}</td>
        <td>${institution}</td>
        <td>${yearAwarded}</td>
        <td>
          <button onclick="editDegree(${id})">Edit</button>
        </td>
      </tr>
    `;
  }
}

// Function to populate the input fields with the data for a specific degree
function editDegree(id) {
    // Call the getDegree function in the contract
    contract.methods.getDegree(id).call((error, result) => {
      if (error) {
        console.error(error);
      } else {
        // Extract the data from the result
        const name = result[1];
        const fieldOfStudy = result[2];
        const institution = result[3];
        const yearAwarded = result[4];
  
        // Update the input fields
        document.getElementById("degree-id").value = id;
        document.getElementById("degree-name").value = name;
        document.getElementById("degree-field-of-study").value = fieldOfStudy;
        document.getElementById("degree-institution").value = institution;
        document.getElementById("degree-year-awarded").value = yearAwarded;
      }
    });
  }
  
