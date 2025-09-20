// public/js/main.js

function download_table_as_csv(table_id, separator = ",") {
  const rows = document.querySelectorAll("table#" + table_id + " tr");
  const csv = [];

  for (let i = 0; i < rows.length; i++) {
    const row = [],
      cols = rows[i].querySelectorAll("td, th");

    for (let j = 0; j < cols.length; j++) {
      let data = cols[j].innerText
        .replace(/(\r\n|\n|\r)/gm, "")
        .replace(/(\s\s)/gm, " ");
      data = data.replace(/"/g, '""'); // Escape double quotes
      row.push('"' + data + '"');
    }
    csv.push(row.join(separator));
  }

  const csv_string = csv.join("\n");
  const filename =
    "export_" + table_id + "_" + new Date().toLocaleDateString() + ".csv";

  const link = document.createElement("a");
  link.style.display = "none";
  link.setAttribute("target", "_blank");
  link.setAttribute(
    "href",
    "data:text/csv;charset=utf-8," + encodeURIComponent(csv_string)
  );
  link.setAttribute("download", filename);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Add an event listener to the "Export Table" button
document.querySelector(".btn-warning").addEventListener("click", () => {
  download_table_as_csv("table");
});
