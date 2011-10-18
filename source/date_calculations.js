Cerise.DateCalculations = {
  selectedYear: new Date().getFullYear(),

  easter: function (year) {
    if (!year) {
      year = new Date().getFullYear();
      this.selectedYear = year;
    }

    var g = year % 19 + 1,
        c = Math.floor(year / 100) + 1,
        x = Math.floor((3 * c) / 4) - 12,
        z = Math.floor((8 * c + 5) / 25) - 5,
        d = Math.floor((5 * year) / 4) - x - 10,
        e = (11 * g + 20 + z - x) % 30;

    if (e == 24 || (e == 25 && g > 11)) {
      e += 1;
    }

    var n = 44 - e;

    if (n < 21) {
      n += 30;
    }

    n += 7 - (d + n) % 7;

    return new Date(year, Math.floor(3 + n / 31 - 1), n % 31);
  },

};
