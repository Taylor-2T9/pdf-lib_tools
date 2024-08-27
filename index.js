const PDFLib = require(`pdf-lib`)
const fs = require(`fs`)

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

    const task = {
        name: `Solicitação`,
        init_date: new Date().toLocaleDateString(),
        process: {
            name: `Compras`,
            code: 20
        },
        assignee: {
            name: `Fulano`,
            signature: `fulano.fulano`
        }
    }
    const header_data = [
        [`LOGO`, `NOME_TAREFA`, `Processo: ${task.process.name}`],
        [`LOGO`, `NOME_TAREFA`, `Responsável: ${task.assignee.name}`],
        [`LOGO`, `NOME_TAREFA`, `Início: ${task.init_date}`]
    ]

    header_data.map((row, row_i) => {
        row.map((cell, cell_i) => page.drawText(cell, {
            x: x_position + (cell_i * (page_width / row.length)),
            y: y_position,
            size: 12
        }))
        y_position += 30
    })


    const pdfBytes = await pdfDoc.save()
    fs.writeFileSync(`teste.pdf`, pdfBytes)
    /* const blob = new Blob([pdfBytes], { type: 'application/pdf' })
     const link = document.getElementById('downloadPDF')
     link.href = URL.createObjectURL(blob)
     link.download = `document_test` */
}
createPDF()
