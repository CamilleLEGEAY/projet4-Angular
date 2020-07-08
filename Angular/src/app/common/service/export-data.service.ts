import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportDataService {

  constructor() { }

  /*(sheetNames = nameof the file)
  Excel.xls = XLSX.utils.book_new();
  feuille.excel = XLSX.utils.book_new(Array);
  XLSX.utils.book_append_sheet(Excel.xls, feuille, "namesheet")
  XLSX.writeFile(Excel.xls, "name")*/

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, this.toExportFileName(excelFileName));
    
  }

  private toExportFileName(FileName: string): string {
    return `${FileName}_export_${new Date().getTime()}.xlsx`;
  }
}
