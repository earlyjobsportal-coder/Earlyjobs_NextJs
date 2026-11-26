import fs from "node:fs";
import path from "node:path";
import { deflateRawSync } from "node:zlib";

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}

function zip(files) {
  const locals = [];
  const centrals = [];
  let offset = 0;
  for (const f of files) {
    const name = Buffer.from(f.name, "utf8");
    const data = Buffer.from(f.data, "utf8");
    const compressed = deflateRawSync(data);
    const crc = crc32(data);
    const local = Buffer.alloc(30 + name.length);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(8, 8);
    local.writeUInt16LE(0, 10);
    local.writeUInt16LE(0, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(compressed.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);
    name.copy(local, 30);
    const central = Buffer.alloc(46 + name.length);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4);
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(8, 10);
    central.writeUInt16LE(0, 12);
    central.writeUInt16LE(0, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(compressed.length, 20);
    central.writeUInt32LE(data.length, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE(0, 38);
    central.writeUInt32LE(offset, 42);
    name.copy(central, 46);
    locals.push(Buffer.concat([local, compressed]));
    centrals.push(central);
    offset += local.length + compressed.length;
  }
  const centralDir = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralDir.length, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);
  return Buffer.concat([...locals, centralDir, end]);
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function colName(n) {
  let s = "";
  while (n >= 0) {
    s = String.fromCharCode((n % 26) + 65) + s;
    n = Math.floor(n / 26) - 1;
  }
  return s;
}

function sheetXml(rows) {
  let sheetData = "";
  rows.forEach((row, r) => {
    sheetData += `<row r="${r + 1}">`;
    row.forEach((cell, c) => {
      const ref = `${colName(c)}${r + 1}`;
      sheetData += `<c r="${ref}" t="inlineStr"><is><t>${esc(cell)}</t></is></c>`;
    });
    sheetData += "</row>";
  });
  return sheetData;
}

const outDir = path.join(process.cwd(), "public", "resources");
fs.mkdirSync(outDir, { recursive: true });

const scorecardRows = [
  [
    "Criterion",
    "Weight (%)",
    "Provider A score (1-5)",
    "Provider B score (1-5)",
    "Provider C score (1-5)",
    "Notes / evidence",
  ],
  ["Relevant recruitment experience", "25", "", "", "", ""],
  ["Candidate sourcing approach", "20", "", "", "", ""],
  ["Recruitment process", "20", "", "", "", ""],
  ["Communication", "15", "", "", "", ""],
  ["Commercial terms", "10", "", "", "", ""],
  ["Reporting and compliance", "10", "", "", "", ""],
  ["TOTAL WEIGHT (must equal 100)", "100", "", "", "", ""],
  [],
  ["Provider names", "Provider A", "Provider B", "Provider C", "", ""],
  ["Weighted score formula", "Score × Weight ÷ 100, then sum across criteria", "", "", "", ""],
  [
    "Guidance",
    "A numerical score should not override serious contractual, compliance or trust concerns.",
    "",
    "",
    "",
    "",
  ],
];

const checklistRows = [
  ["Due diligence checklist", "Status", "Notes"],
  ["Hiring needs documented (roles, volume, locations, timelines)", "", ""],
  ["Evaluation criteria selected", "", ""],
  ["Weights assigned and total 100%", "", ""],
  ["Providers scored consistently", "", ""],
  ["Commercial terms compared", "", ""],
  ["References / evidence reviewed", "", ""],
  ["Contractual and compliance review completed", "", ""],
];

const xlsx = zip([
  {
    name: "[Content_Types].xml",
    data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>`,
  },
  {
    name: "_rels/.rels",
    data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>`,
  },
  {
    name: "xl/workbook.xml",
    data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Agency Scorecard" sheetId="1" r:id="rId1"/><sheet name="Due Diligence" sheetId="2" r:id="rId2"/></sheets></workbook>`,
  },
  {
    name: "xl/_rels/workbook.xml.rels",
    data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/></Relationships>`,
  },
  {
    name: "xl/worksheets/sheet1.xml",
    data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${sheetXml(scorecardRows)}</sheetData></worksheet>`,
  },
  {
    name: "xl/worksheets/sheet2.xml",
    data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${sheetXml(checklistRows)}</sheetData></worksheet>`,
  },
]);

fs.writeFileSync(path.join(outDir, "earlyjobs-recruitment-agency-evaluation-scorecard.xlsx"), xlsx);
console.log("Generated agency evaluation scorecard in", outDir);
