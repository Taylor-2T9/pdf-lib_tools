async function createPDF() {
    const pdfDoc = await PDFLib.PDFDocument.create()
    const page = pdfDoc.addPage([600, 800])

    const {
        width: page_width,
        height: page_height
    } = page.getSize()

    let y_position = 700
    let x_position = 20

    const numbers = [
        { simbol: 1, label: 'one' },
        { simbol: 2, label: 'two' },
        { simbol: 3, label: 'three' },
        { simbol: 4, label: 'four' },
        { simbol: 5, label: 'five' },
    ]

    numbers.map((number, i) => {
        page.drawText(`${number.simbol}`, {
            x: x_position,
            y: y_position,
            size: 12
        })
        page.drawText(`${number.label}`, {
            x: x_position * 2,
            y: y_position,
            size: 12
        })
        y_position -= 30
    })


    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const link = document.getElementById('downloadPDF')
    link.href = URL.createObjectURL(blob)
    link.download = `document_test`
}
createPDF()
