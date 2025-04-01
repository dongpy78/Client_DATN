import * as XLSX from "xlsx/xlsx.mjs";
import moment from "moment";

class CommonUtils {
  static getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  static removeSpace(str) {
    str = str.trim();
    return (str = str.replace(/\s+/g, " ").trim());
  }

  static formatDate(time) {
    let a = moment.unix(new Date().getTime() / 1000).format("DD/MM/YYYY");
    let b = moment.unix(time / 1000).format("DD/MM/YYYY");

    var start = moment(b, "DD/MM/YYYY");
    var end = moment(a, "DD/MM/YYYY");

    //Difference in number of days

    return moment.duration(start.diff(end)).asDays();
  }

  static exportExcel(data, nameSheet, nameFile) {
    return new Promise((resolve, reject) => {
      let wb = XLSX.utils.book_new();
      let ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, nameSheet);
      XLSX.writeFile(wb, `${nameFile}.xlsx`);
      resolve("oke");
    });
  }
}

export default CommonUtils;
