/* package com.gestaodigital.rh.service;

import com.gestaodigital.rh.entity.FolhaPagamento;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;

@Service
public class PdfService {

    public byte[] gerar(FolhaPagamento folha) throws Exception {

        Document doc = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        PdfWriter.getInstance(doc, out);
        doc.open();

        doc.add(new Paragraph("HOLERITE"));
        doc.add(new Paragraph("Salário Líquido: " + folha.getSalarioLiquido()));

        doc.close();

        return out.toByteArray();
    }
} */
