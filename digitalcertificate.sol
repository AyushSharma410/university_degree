// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Define a new contract named "DegreeTracker"
contract DegreeTracker {
    // Declare a mapping to store degree records,
    // with the key being the degree ID and the value being the degree data
    mapping(uint => Degree) public degrees;
    uint public nextId=1;

    // Define a struct to represent a degree
    struct Degree {
        uint id;
        string name;
        string fieldOfStudy;
        string institution;
        uint yearAwarded;
    }

    // Declare a counter to keep track of the next available degree ID
    uint public degreeCount;

    // Declare a function to add a new degree record to the mapping
    function addDegree(string memory _name, string memory _fieldOfStudy, string memory _institution, uint _yearAwarded) public {
    // Create a new degree record
    Degree storage degree = degrees[nextId];
    degree.id = nextId;
    degree.name = _name;
    degree.fieldOfStudy = _fieldOfStudy;
    degree.institution = _institution;
    degree.yearAwarded = _yearAwarded;

    // Increment the nextId variable
    nextId++;
}
    function getDegree(uint _degreeId) public view returns (uint, string memory, string memory, string memory, uint) {
    // Retrieve the degree record from the mapping
    Degree storage degree = degrees[_degreeId];

    // Return the fields of the degree record
    return (degree.id, degree.name, degree.fieldOfStudy, degree.institution, degree.yearAwarded);
}
// Function to update the details of a degree
function updateDegree(uint _degreeId, string memory _name, string memory _fieldOfStudy, string memory _institution, uint _yearAwarded) public {
    // Retrieve the degree record
    Degree storage degree = degrees[_degreeId];

    // Update the fields of the degree record
    degree.name = _name;
    degree.fieldOfStudy = _fieldOfStudy;
    degree.institution = _institution;
    degree.yearAwarded = _yearAwarded;
}

// Function to delete a degree
function deleteDegree(uint _degreeId) public {
    // Set the id of the degree to 0 to mark it as deleted
    degrees[_degreeId].id = 0;
}

// Function to get the number of degrees
function getNumDegrees() public view returns (uint) {
    return nextId;
}

// Function to get the details of all degrees

}
   