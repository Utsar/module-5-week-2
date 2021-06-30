import PdfPrinter from "pdfmake";

export const generatePDFReadableStream = (data) => {
  const fonts = {
    Roboto: {
      normal: "Helvetica",
      bold: "Helvetica-Bold",
      italics: "Helvetica-Oblique",
      bolditalics: "Helvetica-Oblique",
    },
  };

  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content: [
      {
        text: [
          { text: "Hello, Welcome to my PDF", fontSize: 15 },
          "it's not great",
        ],
      },
    ],
  };

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, {});
  pdfReadableStream.end();
  return pdfReadableStream;
};
