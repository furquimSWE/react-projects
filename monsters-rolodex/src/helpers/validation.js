import moment from "moment";

export const validations = {
  fullName: {
    pattern:
      /^[a-zA-Zçãáéêó]{4,}(?: [a-zA-Zçãáéêó]+)?(?: [a-zA-Zçãáéêó]+)?(?: [a-zA-Zçãáéêó]+)?(?: [a-zA-Zçãáéêó]+)$/,
    message: "Nome completo inválido",
  },
  cpf: {
    pattern: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    message: "CPF inválido",
    custom: (value) => {
      if (value === "" || value === undefined) return false;
      value = value.replaceAll(".", "");
      value = value.replaceAll("-", "");

      let firstDigit = -1;
      let secondDigit = -1;

      let split = value.split("");
      let count = 10;

      let sum = 0;
      for (let i = 0; i < split.length - 2; i++) sum += +split[i] * count--;

      let module = sum % 11;
      if (module < 2) firstDigit = 0;
      else firstDigit = 11 - module;

      if (firstDigit !== +split[split.length - 2]) return false;

      sum = 0;
      count = 11;
      for (let i = 0; i < split.length - 1; i++) {
        sum += +split[i] * count--;
      }

      module = sum % 11;
      if (module < 2) secondDigit = 0;
      else secondDigit = 11 - module;

      if (secondDigit !== +split[split.length - 1]) return false;
      return true;
    },
  },
  email: {
    pattern: /[^@]+@[^@]+\.[^@]+/,
    message: "Endereço de e-mail inválido",
  },
  birthDate: {
    message: "Data de nascimento inválida",
    custom: (value) => {
      if (!value || value.length !== 10) return false;

      moment.locale("pt-BR");
      value = value.split("/").reverse().join("-");

      let date = moment(value);
      let currentDate = moment(new Date());

      let diff = currentDate.diff(date, "years");
      return diff >= 18;
    },
  },
  phone: {
    message: "Telefone principal inválido",
    pattern: /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/,
  },
  carPrice: {
    message: "Preço está muito baixo",
    custom: (value) => {
      if (!value) return false;
      let numValue = parseFloat(value);
      console.log(numValue, "parsed", numValue > 1000.0);
      return numValue > 1000.0;
    },
  },
  installments: {
    message: "Seleção necessária",
    custom: (value) => {
      return value !== null && value !== undefined && value !== "";
    },
  },
  carUF: {
    message: "Seleção necessária",
    custom: (value) => {
      return value !== null && value !== undefined && value !== "";
    },
  },
  timeSpan: {
    message: "",
    custom: (value) => {
      return value !== null && value !== undefined && value !== "";
    },
  },
};
