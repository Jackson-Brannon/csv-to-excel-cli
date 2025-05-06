# 📊 CSV to Excel CLI Tool — `generate-excel`

A powerful, zero-hassle CLI tool that converts **any CSV file** into a nicely formatted Excel `.xlsx` file.

---

## 🚀 Features

- ✅ Works from anywhere in your terminal (I use Bash)
- 🔍 Automatically finds CSVs in:
  - Current folder
  - Downloads
  - Desktop
- 📁 Always saves Excel files to **your own Documents folder** (cross-platform!)
- 🧠 Smart auto-detection of headers and column widths
- 🤯 Handles edge cases, emojis, mixed types, and more

---

## 📦 Installation (One-Time)

```bash
git clone https://github.com/yourusername/csv-to-excel-cli.git
cd csv-to-excel-cli
npm install
npm link


USAGE
generate-excel input.csv optional_output.xlsx

Will save to your "C:\Users\YourName\Documents" directory. If you would like to change this (as I did) then it's super easy!

1. Open the index.js file within the csv-excel-cli folder
2. Navigate to line 9 and add another string after 'Documents'
    2a. Example: const DOCUMENTS_DIR = path.join(os.homedir(), 'Documents', 'CSVtoEXCEL');
3. You can also use this with OneDrive utilizing a path.resolve statement! Remove line 9 and replace it with the below
    3a. const DOCUMENTS_DIR = path.resolve('C:/Users/YourName/OneDrive/Documents/CSVtoEXCEL');
        3b. You can of course modify where it's saved in your OneDrive by changing the filepath above (3a)


Included in this package will be an example CSV file. It showcases the capabilites of this tool and will allow you to easily test