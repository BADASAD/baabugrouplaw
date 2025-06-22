let finalList = [];
let currentTheme = 'dark';

function extractAndDisplay() {
  const text = document.getElementById("inputText").value;
  const label = document.getElementById("labelName").value || "Contact";
  const numbers = text.match(/(?:\+91[-\s]?|0)?[6-9]\d{9}\b/g);
  const unique = [...new Set(numbers?.map(n => n.replace(/\D/g, '').slice(-10)) || [])];

  finalList = [];
  let resultText = "";

  unique.forEach((num, index) => {
    finalList.push({ name: `${label} ${index + 1}`, phone: num });
    resultText += `${label} ${index + 1} – ${num}\n`;
  });

  document.getElementById("outputBox").innerText = resultText || "No valid numbers found.";
  document.getElementById("count").innerText = `Total Numbers: ${finalList.length}`;
}

function copyToClipboard() {
  const output = document.getElementById("outputBox").innerText;
  navigator.clipboard.writeText(output).then(() => alert("Copied!"));
}

function downloadCSV() {
  if (finalList.length === 0) return alert("No data to export.");
  let csv = "Name,Phone Number\n" + finalList.map(r => `${r.name},${r.phone}`).join("\n");
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "numbers.csv";
  link.click();
}

function downloadXLSX() {
  if (finalList.length === 0) return alert("No data to export.");
  const ws = XLSX.utils.json_to_sheet(finalList);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Numbers");
  XLSX.writeFile(wb, "numbers.xlsx");
}

function readFile(event) {
  const reader = new FileReader();
  reader.onload = function(e) {
    document.getElementById("inputText").value = e.target.result;
  }
  reader.readAsText(event.target.files[0]);
}

function toggleTheme() {
  const body = document.body;
  if (currentTheme === 'dark') {
    body.style.backgroundColor = '#ffffff';
    body.style.color = '#000000';
    currentTheme = 'light';
  } else {
    body.style.backgroundColor = '#1e1e1e';
    body.style.color = '#ffffff';
    currentTheme = 'dark';
  }
}
