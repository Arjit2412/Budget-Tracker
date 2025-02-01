/**
 * This script will be used to convert the downloaded csvs from open government portal.
 * Then the csvs will be run through the converter function to convert it to the schema used on our site
 * Then post requests will be made to the server to upload the data
 * 
 */






import fs from 'fs'
import { parse } from 'csv-parse';

// State ID mapping dictionary
const stateIdMapping = {
    "Andhra Pradesh": "ea7fd28f-bdbf-4e9e-be47-8cce2fc8c487",
    "Arunachal Pradesh": "edf72088-3cda-46ed-8f1b-32a72393b78e",
    "Assam": "9088713c-ee10-4b0f-b22c-2f79027aa346",
    "Bihar": "9cd896b7-6df1-4261-bf2d-c4816503b7a7",
    "Chhattisgarh": "56498eab-1714-4d86-b96f-9e73a7fa9474",
    "Goa": "e741b258-bc7f-444f-a6f4-09ce7443bf5f",
    "Gujarat": "ac4e2c59-b371-4b5c-9251-9bd965480026",
    "Haryana": "5e96318c-dd9f-4ada-a614-752c0811c23d",
    "Himachal Pradesh": "b080bb6d-78a8-42ed-8e2b-f26184f79837",
    "Jharkhand": "e8d74f2f-f4be-43a2-94b2-69cbf7bd9753",
    "Karnataka": "5ef7764e-83c7-4d20-8b88-2e5203ea94a2",
    "Kerala": "5e4924d6-f3aa-4543-9b07-b73276691bd5",
    "Madhya Pradesh": "fbea9f72-cb0b-4ebd-9225-fab09263e1a1",
    "Maharashtra": "45ad8658-4097-4f83-bc0a-de6806253f8f",
    "Manipur": "ddfc5961-bc8d-476d-a17b-b16aa66be48c",
    "Meghalaya": "fb2b88f3-edf6-4c2f-b316-e79d09d243ec",
    "Mizoram": "cdacbfc9-1e87-43b1-bd64-20a170dfa818",
    "Nagaland": "f11e80c5-1835-4203-a9f5-80b925539c65",
    "Odisha": "1d504ad3-f584-42c3-8da6-ebfc46291d55",
    "Punjab": "4bc601cf-2fec-4ca0-a1ad-e7d9fcf38fda",
    "Rajasthan": "d66c2764-bf8f-4fcd-bbcf-5a28d0d9ea4c",
    "Sikkim": "1dcbf9ce-d998-486c-8f16-2e08be66399a",
    "Tamil Nadu": "e5be24e5-9b68-435c-870d-1f7852d79662",
    "Telangana": "ed5a3b9c-598a-49e5-a974-fcf8d146e9c5",
    "Tripura": "192a82c7-de91-4669-a973-aa1fb0803ef5",
    "Uttar Pradesh": "986b70f1-907a-4cb3-9068-1bbee88c26db",
    "Uttarakhand": "973b6aea-3e76-49d5-a1f5-81b1b2514266",
    "West Bengal": "2f1de9d0-3c65-4069-a104-3e2b83439dee"
};

const years = [
    '2017-18',
    '2018-19',
    '2019-20',
    '2020-21',
    '2021-22',
    '2022-23 (till 10th March 2023)'
];

function processTaxData(csvData) {
    const result = [];
    
    // Skip header row
    const rows = csvData.slice(1);
    
    for (const row of rows) {
        const state = row[1]?.trim(); // Changed index to 1 for state column
        
        if (!stateIdMapping[state] || state === "Total") {
            continue;
        }
        
        years.forEach((year, index) => {
            const value = parseFloat(row[index + 2]?.replace(/,/g, '')); // Adjusted index (+2)
            if (!isNaN(value) && value !== 0) {
                result.push({
                    name: "tax_and_duties",
                    desc: `Tax and duties collection for ${state} in fiscal year ${year} amounted to Rs. ${value} crores`,
                    stateId: stateIdMapping[state],
                    date: `${year.split('-')[1].length === 2 ? '20' + year.split('-')[1] : year.split('-')[1]}-03-31`
                });
            }
        });
    }
    return result;
}

function saveToJson(data, outputFile) {
    fs.writeFileSync(outputFile, JSON.stringify(data, null, 2), 'utf8');
}

// Main execution using async/await for better error handling
async function main() {
    const inputFile = "Data1.csv";
    const outputFile = "tax_duties_data.json";
    
    try {
        // Read file
        const fileData = await fs.promises.readFile(inputFile, 'utf8');
        
        // Parse CSV
        parse(fileData, {
            delimiter: ',',
            relaxColumnCount: true,  // This helps handle inconsistent column counts
            skipEmptyLines: true     // Skip empty lines in the CSV
        }, (err, csvData) => {
            if (err) {
                console.error('Error parsing CSV:', err);
                return;
            }
            
            // Process data and save to JSON
            const taxData = processTaxData(csvData);
            saveToJson(taxData, outputFile);
            console.log(`Processed ${taxData.length} records and saved to ${outputFile}`);
        });
    } catch (err) {
        console.error('Error reading file:', err);
    }
}

// Run the script
main();