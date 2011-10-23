enyo.kind({
  name: "Cerise.Holidays.Swedish",

  calculateDates: function (year) {
    if (!year) { year = new Date().getFullYear(); }

    this.year = year;
    this.calculator = new Cerise.DateCalculations(year);
    var dates = [];
    var datefmt = new enyo.g11n.DateFmt({"format": "EEEE dd MMMM"});

    for (var index in this.holidays) {
      var date = this.holidays[index].date.call(this);
      var day = {
        name: this.holidays[index].name,
        date: date,
        dateString: datefmt.format(date)
      };
      dates[index] = day;
    }

    return dates;
  },

  holidays: [
    {
      name: "New year's day (nyårsdagen)", 
      date: function () {
        return new Date(this.year, 0, 1);
      }
    },
    {
      name: "Twelfth Night (trettondsafton)", 
      date: function () {
        return new Date(this.year, 0, 5);
      }
    },
    {
      name: "Epiphany (trettondedag jul)", 
      date: function () {
        return new Date(this.year, 0, 6);
      }
    },
    {
      name: "Good Friday (långfredagen)", 
      date: function () {
        var e = this.calculator.easter();
        e.setDate(e.getDate() - 2); 
        return e;
      }
    },
    {
      name: "Holy Saturday (påskafton)", 
      date: function () {
        var e = this.calculator.easter(); 
        e.setDate(e.getDate() - 1); 
        return e;
      }
    },
    {
      name: "Easter Sunday (påskdagen)", 
      date: function () {
        return this.calculator.easter();
      }
    },
    {
      name: "Easter Monday (annandag påsk)", 
      date: function () {
        var e = this.calculator.easter(); 
        e.setDate(e.getDate() + 1); 
        return e;
      }
    },
    {
      name: "Walpurgis Night (valborgsmässoafton)", 
      date: function () {
        return new Date(this.year, 3, 30);
      }
    },
    {
      name: "International Workers Day (första maj)", 
      date: function () {
        return new Date(this.year, 4,1);
      }
    },
    {
      name: "Ascension Day (Kristi himmelsfärd)", 
      date: function () {
        var e = this.calculator.easter(); 
        e.setDate(e.getDate() + 39); 
        return e;
      }
    },
    {
      name: "National Day of Sweden (nationaldagen)", 
      date: function () {
        return new Date(this.year, 5,6);
      }
    },
    {
      name: "Whitsun Eve (pingstafton)", 
      date: function () {
        var e = this.calculator.easter(); 
        e.setDate(e.getDate() + 48); 
        return e;
      }
    },
    {
      name: "Pentecost (pingstdagen)", 
      date: function () {
        var e = this.calculator.easter(); 
        e.setDate(e.getDate() + 49); 
        return e;
      }
    },
    {
      name: "Midsummer's Day (midsommardagen)", 
      date: function () { 
        var d = new Date(this.year, 5, 20); 
        d.setDate(d.getDate() + 6 - d.getDay()); 
        return d;
      }
    },
    {
      name: "All Saints' Eve (alla helgons afton)", 
      date: function () { 
        var d = new Date(this.year, 9, 31); 
        d.setDate(d.getDate() + 5 - d.getDay()); 
        return d;
      }
    },
    {
      name: "All Saints' Day (alla helgons dag)", 
      date: function () { 
        var d = new Date(this.year, 9, 31); 
        d.setDate(d.getDate() + 6 - d.getDay()); 
        return d;
      }
    },
    {
      name: "Christmas Eve (julafton)", 
      date: function () {
        return new Date(this.year, 11,24);
      }
    },
    {
      name: "Christmas Day (juldagen)", 
      date: function () {
        return new Date(this.year, 11,25);
      }
    },
    {
      name: "Boxing Day (annandag jul)", 
      date: function () {
        return new Date(this.year, 11,26);
      }
    },
    {
      name: "New year's eve (nyårsafton)", 
      date: function () {
        return new Date(this.year, 11, 31);
      }
    }
  ]
});
