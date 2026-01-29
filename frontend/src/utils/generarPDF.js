import jsPDF from "jspdf";

export function generarPDF(titulo, registros) {
  const pdf = new jsPDF();
  pdf.text(titulo, 20, 20);

  let y = 20;
  registros.forEach((r, i) => {
    pdf.text(`${i + 1}. ${Object.values(r).join(" | ")}`, 10, y);
    y += 8;
  });

  pdf.save(`${titulo}.pdf`);
}
