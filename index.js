#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const ExcelJS = require('exceljs');
const os = require('os');

const DOCUMENTS_DIR = path.join(os.homedir(), 'Documents');

const COMMON_FOLDERS = [
  process.cwd(),
  path.join(os.homedir(), 'Downloads'),
  path.join(os.homedir(), 'Desktop'),
];

function findCSVFile(filename) {
  for (const dir of COMMON_FOLDERS) {
    const candidate = path.join(dir, filename);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return null;
}

async function convertCSVtoExcel(inputFile, outputFileName) {
  const csvPath = findCSVFile(inputFile);
  if (!csvPath) {
    console.error(`CSV file "${inputFile}" not found in known folders.`);
    return;
  }

  console.log('CSV file found at:', csvPath);

  const rows = await new Promise((resolve, reject) => {
    const data = [];
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => data.push(row))
      .on('end', () => resolve(data))
      .on('error', reject);
  });

  if (rows.length === 0) {
    console.error('CSV is empty.');
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');

  const headers = Object.keys(rows[0]);
  worksheet.columns = headers.map((key) => ({
    header: key,
    key,
    width: Math.max(key.length + 5, 20),
  }));

  rows.forEach((row) => worksheet.addRow(row));

  const safeOutputName = outputFileName?.endsWith('.xlsx')
    ? outputFileName
    : `${path.parse(inputFile).name}.xlsx`;

  const finalOutputPath = path.join(DOCUMENTS_DIR, safeOutputName);
  await workbook.xlsx.writeFile(finalOutputPath);

  console.log(`✅ Excel file saved to:\n${finalOutputPath}`);
}

const inputArg = process.argv[2];
const outputArg = process.argv[3];

if (!inputArg) {
  console.log('\nUsage: generate-excel <input.csv> [output.xlsx]\n');
  process.exit(1);
}

convertCSVtoExcel(inputArg, outputArg).catch((err) =>
  console.error('Unexpected error:', err)
);
