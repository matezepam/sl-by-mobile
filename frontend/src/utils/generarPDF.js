import jsPDF from "jspdf";

export function generarPDF(titulo, registros) {
  const pdf = new jsPDF();

  const logo =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAFUlEQVR4nO3BMQEAAADCoPVPbQ0PoAAAAAAAAAAAwG0B8gAAAW5JREFUAAAAAElFTkSuQmCC";

  pdf.addImage(logo, "PNG", 10, 8, 30, 30);

  pdf.setFontSize(16);
  pdf.text(titulo, 50, 20);

  pdf.setFontSize(10);
  pdf.text(`FECHA: ${new Date().toLocaleDateString()}`, 50, 28);

  pdf.line(10, 42, 200, 42);

  let y = 52;

  pdf.setFontSize(11);
  pdf.text("N°", 10, y);
  pdf.text("Datos", 25, y);

  pdf.line(10, y + 2, 200, y + 2);

  y += 10;

  registros.forEach((r, i) => {
    pdf.text(String(i + 1), 10, y);
    pdf.text(Object.values(r).join(" | "), 25, y);
    y += 8;

    if (y > 280) {
      pdf.addPage();
      y = 20;
    }
  });

  pdf.save(`${titulo}.pdf`);
}
